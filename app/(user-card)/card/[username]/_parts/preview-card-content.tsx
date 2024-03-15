import UserCard from "@/components/prozxt-ui/user-card";
import { getUserCard } from "@/lib/data/card";
import { CardIcons, CardSocials } from "@/lib/types";

export default async function PreviewCardContent({
  username,
}: {
  username: string;
}) {
  const user = await getUserCard(username);
  const socials: CardSocials = JSON.parse(user?.card?.socials || "[]");
  const icons: CardIcons = JSON.parse(user?.card?.icons || "[]");

  return (
    <>
      {user ? (
        <UserCard
          username={user.username}
          profilePicture={user.profilePicture?.url}
          name={user.card?.name}
          title={user.card?.title}
          socials={socials}
          icons={icons}
        />
      ) : (
        <h1 className="text-3xl font-medium text-muted-foreground">
          No User Found
        </h1>
      )}
    </>
  );
}
