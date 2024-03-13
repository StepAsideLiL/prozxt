import { Button } from "@/components/ui/button";
import { getCurrentUserCard } from "@/lib/data/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import CardContentForm from "./card-content-form";
import { CardIcons, CardSocials } from "@/lib/types";
import UserCard from "./user-card";

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
        <UserCard
          username={user.username}
          name={user.card!.name}
          title={user.card!.title}
          socials={socials}
          icons={icons}
        />

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
