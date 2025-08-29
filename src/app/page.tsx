"use client";

import { convert } from "@/action/convertion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const [state, action, pending] = useActionState(convert, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.url) {
      window.open(state.url, "_blank");
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center h-screen gap-5">
      <form action={action}>
        <div className="flex flex-col gap-10">
          <div className="flex gap-5 items-center">
            <div>
              <Input
                type="text"
                name="ytp"
                placeholder="Lien youtube"
                className="w-96"
              />
            </div>
            <div>
              <RadioGroup name="format" className="flex" defaultValue="audio">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="audio" id="audio" />
                  <Label htmlFor="audio">Audio</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem disabled value="video" id="video" />
                  <Label htmlFor="video">Vidéo</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div>
            <Button disabled={pending} className="w-full">
              Convertir{" "}
              {pending ? <Loader2Icon className="animate-spin" /> : <></>}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
