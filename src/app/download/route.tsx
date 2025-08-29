import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises"
 
export async function GET(request: Request) {
  const url = new URL(request.url);
  const file = url.searchParams.get("file");
  if (!file)
    return new NextResponse(
      "Davidou ou Hurio ou jsp, arrête de casser le site",
      { status: 400 }
    );

  const filePath = path.resolve(process.cwd(), "ytp-output", file);

    const buffer = await fs.readFile(filePath);

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Length": String(buffer.length),
      "Content-Disposition": `attachment; filename="${path.basename(file)}"`,
      "Cache-Control": "no-store",
    },
  });
}
