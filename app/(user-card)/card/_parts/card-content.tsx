import { FullLogo } from "@/components/prozxt-ui/logo";
import { Button } from "@/components/ui/button";
import { getCurrentUserCard } from "@/lib/data/card";
import { monofett, vt323 } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import CardContentForm from "./card-content-form";
import { CardIcons, CardSocials } from "@/lib/types";
import { cardIcons, socialIcons } from "@/components/prozxt-ui/lists";

export default async function CardContent() {
  const user = await getCurrentUserCard();
  const socials: CardSocials = JSON.parse(user?.card?.socials || "[]");
  const icons: CardIcons = JSON.parse(user?.card?.icons || "[]");

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3">
        <section className="aspect-[96/45] w-[700px] select-none rounded-2xl border p-10">
          <div className="flex h-full w-full flex-col">
            <div className="flex flex-1 items-start gap-5">
              <div>
                <div className="aspect-square w-12 rounded-full border"></div>
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-semibold">
                  {user.card?.name || "(no name)"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {user.card?.title || "(no title)"}
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
                  {user.username}
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
        </section>

        <section>
          <Button variant={"outline"} asChild>
            <Link href={"#edit-card"}>Edit Your Card</Link>
          </Button>
        </section>
      </div>

      <section id="edit-card" className="flex justify-center py-10">
        <CardContentForm
          initialName={user.card!.name}
          initialTitle={user.card!.title}
          initialSocials={socials}
          initialIcons={icons}
        />
      </section>
    </>
  );
}
