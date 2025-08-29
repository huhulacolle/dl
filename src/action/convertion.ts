"use server";

import path from "path";
import { create } from "youtube-dl-exec";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

export async function convert(state: any, formData: FormData) {
  console.log("slt");

  const url = formData.get("ytp") as string;
  const format = formData.get("format") as "audio" | "video";

  if (url == "" || (format != "video" && format != "audio")) {
    return { error: "il manque le lien de la vidéo" };
  }

  const binPath = path.resolve(process.cwd(), "youtube-dl-exec", "yt-dlp");

  const youtubedl = create(binPath);

  try {
    const name = `${uuidv4()}.mp3`;
    const filePath = path.resolve(process.cwd(), "ytp-output", name);

    await youtubedl(url, {
      output: filePath,
      noCheckCertificates: true,
      extractAudio: true,
      audioFormat: "mp3",
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    });

    return { url: `/download?file=${name}` };
  } catch (error: any) {
    console.error(error);
    return { error: error.stderr };
  }
}
