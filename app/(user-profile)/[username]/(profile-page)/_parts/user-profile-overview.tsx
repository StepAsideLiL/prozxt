import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import {
  getUserByUsername,
  isCurrentUserFollowingProfileUser,
} from "@/lib/data/user";
import Link from "next/link";
import FollowUser from "./follow-user";

export default async function UserProfileOverview({
  username,
}: {
  username: string;
}) {
  const { user } = await validateRequest();
  const userProfile = await getUserByUsername(username);
  const isFollewing = await isCurrentUserFollowingProfileUser(
    userProfile!.id,
    user!.id,
  );

  return (
    <section className="mx-auto flex max-w-3xl gap-5 space-y-3">
      <Avatar className="h-32 w-32">
        <AvatarImage src={userProfile?.profilePicture?.url} />
        <AvatarFallback className="text-4xl">
          {username[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">{username}</h1>
        {user?.username === username ? (
          <Button variant={"outline"} asChild>
            <Link href={`${username}/edit`}>Edit Profile</Link>
          </Button>
        ) : (
          <FollowUser
            isFollewing={isFollewing}
            userId={userProfile!.id}
            username={username}
            currentUserId={user!.id}
          />
        )}
      </div>
    </section>
  );
}
