import { FullLogo } from "@/components/prozxt-ui/logo";
import { CardIcons, CardSocials } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { monofett, vt323 } from "@/lib/fonts";
import { cardIcons, socialIcons } from "@/components/prozxt-ui/lists";
import Image from "next/image";

export default function UserCard({
  username,
  profilePicture,
  name,
  title,
  socials,
  icons,
}: {
  username: string;
  profilePicture: string;
  name: string;
  title: string;
  socials: CardSocials;
  icons: CardIcons;
}) {
  return (
    <>
      {/* <section className="hidden aspect-video w-[700px] select-none rounded-2xl border p-10 md:block">
        <div className="flex h-full w-full flex-col">
          <div className="flex flex-1 items-start gap-5">
            <div>
              <div className="aspect-square w-12 overflow-hidden rounded-full border">
                <Image
                  src={profilePicture}
                  alt={`Profile Picture of ${username}`}
                  width={50}
                  height={50}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-semibold">{name || "(no name)"}</h1>
              <p className="text-sm text-muted-foreground">
                {title || "(no title)"}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <FullLogo size={100} />
              <p className="text-right text-[10px] text-muted-foreground">
                Portfolio and Project
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between gap-5">
            <div>
              <h1
                className={cn(
                  "text-6xl uppercase text-muted-foreground",
                  vt323.className,
                )}
              >
                {username}
              </h1>
              <div className="flex gap-2">
                {icons.map((icon) => (
                  <span key={icon.id}>
                    {cardIcons.find((i) => i.id === icon.id)?.iconMd}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {socials.map((social) => (
                <Link
                  href={`${socialIcons.find((s) => s.id === social.id)?.profileHref}${social.username}`}
                  key={social.id}
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  {socialIcons.find((s) => s.id === social.id)?.icon}
                  {social.username}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      <section className="relative block aspect-[9/12] w-96 select-none overflow-hidden rounded-2xl border p-10 md:hidden">
        <div className="absolute -bottom-8 left-1/2 -z-20 -translate-x-1/2 blur-[1px]">
          <h1
            className={cn(
              "text-9xl uppercase text-muted-foreground",
              vt323.className,
            )}
          >
            {username}
          </h1>
        </div>

        <Link
          href={`/${username}`}
          className="flex h-full flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="aspect-square w-12 overflow-hidden rounded-full border">
              <Image
                src={profilePicture}
                alt={`Profile Picture of ${username}`}
                width={50}
                height={50}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <FullLogo size={100} />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-semibold">{name || "(no name)"}</h1>
            <p className="text-sm text-muted-foreground">
              {title || "(no title)"}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col">
              {socials.map((social) => (
                <Link
                  href={`${socialIcons.find((s) => s.id === social.id)?.profileHref}${social.username}`}
                  key={social.id}
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  {socialIcons.find((s) => s.id === social.id)?.icon}
                  {social.username}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {icons.map((icon) => (
              <span key={icon.id}>
                {cardIcons.find((i) => i.id === icon.id)?.iconMd}
              </span>
            ))}
          </div>
        </Link>
      </section>
    </>
  );
}
