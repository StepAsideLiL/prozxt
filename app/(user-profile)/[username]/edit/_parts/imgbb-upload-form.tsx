"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { modifyCurrentUserProfilePicture } from "./actions";
import { ImgbbImageRes, ProfilePicturePreview } from "@/lib/types";
import { RotateCw, Upload } from "lucide-react";
import { toast } from "sonner";

export default function ImgbbUploadForm({
  profilePicture,
}: {
  profilePicture: ProfilePicturePreview;
}) {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] =
    useState<ProfilePicturePreview | null>(profilePicture);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target &
      HTMLFormElement & {
        proPic: { value: EventTarget };
      };

    const form = new FormData(target);
    const profilePicture = form.get("proPic");

    if (profilePicture) {
      const data = new FormData();
      data.append("image", profilePicture);

      setLoading(true);

      fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: data,
        },
      )
        .then((res) => res.json())
        .then(async (res: ImgbbImageRes) => {
          if (res.success) {
            const formData = {
              imgbbId: res.data.id,
              title: res.data.title,
              url: res.data.url,
              imgbbUrl: res.data.url_viewer,
              deleteUrl: res.data.delete_url,
              width: res.data.width,
              height: res.data.height,
              mime: res.data.image.mime,
              size: res.data.size,
              time: res.data.time,
            };

            const dbRes = await modifyCurrentUserProfilePicture(formData);
            if (dbRes.status === "success") {
              setLoading(false);
              toast.success(dbRes.message);
            }
            if (dbRes.status === "error") {
              setLoading(false);
              toast.success(dbRes.message);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-3">
      <form onSubmit={handleSubmit} className="space-y-8">
        <Label htmlFor="profile">
          <div className="relative size-40 cursor-pointer overflow-hidden rounded-full">
            <Image
              src={selectedImage?.url || "/profile-picture-placeholder.jpeg"}
              alt="alt"
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
              <Upload size={20} className="text-white" />
            </div>
          </div>
        </Label>

        <Input
          id="profile"
          type="file"
          name="proPic"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files![0];

            if (!file) return;

            const reader = new FileReader();

            reader.onload = (event) => {
              setSelectedImage({
                name: file.name,
                mime: file.type,
                url: event.target!.result as string,
              });
            };

            reader.readAsDataURL(file);
          }}
          placeholder="Upload Profile Picture"
          className="sr-only w-fit"
        />

        {!loading ? (
          <Button type="submit" className="inline-block">
            Upload
          </Button>
        ) : (
          <Button disabled>
            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
            Uploading
          </Button>
        )}
      </form>
    </section>
  );
}
