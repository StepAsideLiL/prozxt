import { FullLogo } from "@/components/prozxt-ui/logo";
import { Button } from "@/components/ui/button";
import { getCurrentUserCard } from "@/lib/data/user";
import { monofett, vt323 } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SiGithub, SiInstagram, SiX } from "react-icons/si";

export default async function CardContent() {
  const user = await getCurrentUserCard();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="space-y-3">
      <section className="aspect-[96/45] w-[700px] select-none rounded-2xl border p-10">
        <div className="flex h-full w-full flex-col">
          <div className="flex flex-1 items-start gap-5">
            <div>
              <div className="aspect-square w-12 rounded-full border"></div>
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-semibold">Rifat Khan</h1>
              <p className="text-sm text-muted-foreground">
                Full-stack Developer
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
            <div
              className={cn(
                "text-9xl uppercase text-muted-foreground",
                vt323.className,
              )}
            >
              {user.username}
            </div>

            <div>
              <p className="flex items-center gap-2">
                <SiX />
                <span>hello</span>
              </p>
              <p className="flex items-center gap-2">
                <SiGithub />
                <span>helloascas</span>
              </p>
              <p className="flex items-center gap-2">
                <SiInstagram />
                <span>helloascasc</span>
              </p>
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
  );
}
