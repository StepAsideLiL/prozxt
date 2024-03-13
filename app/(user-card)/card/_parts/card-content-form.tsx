"use client";

import { cardIcons, socialIcons } from "@/components/prozxt-ui/lists";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Plus, RotateCw, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { addCardData } from "./actions";
import { toast } from "sonner";

type Socials = {
  id: string;
  socialTitle: string;
  username: string;
}[];

type Icons = {
  id: string;
  title: string;
}[];

export default function CardContentForm() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [socials, setSocials] = useState<Socials>([]);
  const [icons, setIcons] = useState<Icons>([]);

  async function handleSubmit() {
    const formData = {
      name: name,
      title: title,
      socials: JSON.stringify(socials),
      icons: JSON.stringify(icons),
    };
    setLoading(true);

    const res = await addCardData(formData);

    if (res.status === "success") {
      setLoading(false);
      toast.success(res.message);
    }
    if (res.status === "error") {
      setLoading(false);
      toast.error(res.message);
    }
  }

  return (
    <section className="w-96 space-y-3">
      <Input
        type="text"
        autoComplete="off"
        placeholder="Name. Ex: John Doe"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />

      <Input
        type="text"
        autoComplete="off"
        placeholder="Title. Ex: Software Developer"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />

      {/* Add Profile Links Section */}
      <section className="flex w-full gap-3">
        <section>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={"icon"}>
                <Plus />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {socialIcons.map((list) => (
                <DropdownMenuItem
                  key={list.id}
                  className="gap-3"
                  onClick={() => {
                    if (!socials.some((s) => s.id === list.id)) {
                      setSocials((socials) => [
                        ...socials,
                        {
                          id: list.id,
                          socialTitle: list.socialTitle,
                          username: "",
                        },
                      ]);
                    }
                  }}
                >
                  {list.icon} {list.socialTitle}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        <section className="flex-1 space-y-2">
          {socials.length === 0 && (
            <span className="text-muted-foreground">
              Add Your Profile Links (4 links)
            </span>
          )}
          {socials.map((social, i) => {
            if (i <= 3) {
              return (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    placeholder={`Add ${social.socialTitle} username`}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const allSocials = socials.filter(
                        (s) => s.id !== social.id,
                      );
                      setSocials([
                        ...allSocials,
                        {
                          id: social.id,
                          socialTitle: social.socialTitle,
                          username: e.target.value,
                        },
                      ]);
                    }}
                  />

                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => {
                      setSocials((socials) =>
                        socials.filter((s) => s.id !== social.id),
                      );
                    }}
                  >
                    <X />
                  </Button>
                </div>
              );
            }

            return null;
          })}
        </section>
      </section>
      {/* Add Profile Links Section End */}

      {/* Add Icons Section */}
      <section className="flex w-full gap-3">
        <section>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={"icon"}>
                <Plus />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {cardIcons.map((list) => (
                <DropdownMenuItem
                  key={list.id}
                  className="gap-3"
                  onClick={() => {
                    if (!icons.some((s) => s.id === list.id)) {
                      setIcons((icons) => [
                        ...icons,
                        {
                          id: list.id,
                          title: list.title,
                        },
                      ]);
                    }
                  }}
                >
                  {list.icon} {list.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        <section className="flex-1 space-y-2">
          {icons.length === 0 && (
            <span className="text-muted-foreground">Add 5 Important Icons</span>
          )}
          {icons.map((icon, i) => {
            if (i <= 4) {
              return (
                <div key={i} className="flex items-center gap-2">
                  <div>
                    {cardIcons.find((list) => list.id == icon.id)?.icon}
                  </div>

                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => {
                      setIcons((icons) =>
                        icons.filter((s) => s.id !== icon.id),
                      );
                    }}
                  >
                    <X />
                  </Button>
                </div>
              );
            }

            return null;
          })}
        </section>
      </section>
      {/* Add Icons Section End */}

      <section>
        {!loading ? (
          <Button onClick={() => handleSubmit()}>Save</Button>
        ) : (
          <Button disabled>
            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
            Saving
          </Button>
        )}
      </section>
    </section>
  );
}
