import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserPinsByUsername } from "@/lib/data/profile";
import { Pin } from "lucide-react";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import LexicalReadonly from "@/components/lexical-rte/lexical-readonly";

export default async function UserPins({ username }: { username: string }) {
  const userPins = await getUserPinsByUsername(username);

  if (!userPins?.profile?.pinPost && !userPins?.profile?.pinProject) {
    return null;
  }

  return (
    <section className="mx-auto max-w-3xl space-y-8">
      {userPins?.profile?.pinPost && (
        <section className="space-y-4">
          <p className="flex items-center gap-2 text-xl">
            <Pin size={20} /> Pinned Post
          </p>

          <article className="space-y-3 rounded bg-muted/25 p-5">
            <div className="flex items-start gap-5">
              <Link href={`/${userPins.profile.pinPost.user.username}`}>
                <Avatar>
                  <AvatarImage
                    src={userPins.profile.pinPost.user.profilePicture?.url}
                  />
                  <AvatarFallback>
                    {userPins.profile.pinPost.user.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>

              <div>
                <h1>
                  <Link href={`/${userPins.profile.pinPost.user.username}`}>
                    {userPins.profile.pinPost.user.username}
                  </Link>
                </h1>
                <p className="text-xs text-muted-foreground">
                  {format(
                    new Date(userPins.profile.pinPost.createdAt),
                    `dd MMMM yyyy`,
                  )}{" "}
                  (Posted{" "}
                  {formatDistanceToNow(
                    new Date(userPins.profile.pinPost.createdAt),
                  )}{" "}
                  ago)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-10"></div>

              <div>
                <h1 className="text-2xl font-semibold">
                  <Link
                    href={`/${userPins.profile.pinPost.user.username}/posts/${userPins.profile.pinPost.id}`}
                    className="hover:underline"
                  >
                    {userPins.profile.pinPost.title}
                  </Link>
                </h1>
              </div>
            </div>
          </article>
        </section>
      )}

      {userPins?.profile?.pinProject && (
        <section className="space-y-4">
          <p className="flex items-center gap-2 text-xl">
            <Pin size={20} /> Pinned Project
          </p>

          <article className="space-y-3 rounded bg-muted/25 p-5">
            <div className="flex items-start gap-5">
              <Link href={`/${userPins.profile.pinProject.user.username}`}>
                <Avatar>
                  <AvatarImage
                    src={userPins.profile.pinProject.user.profilePicture?.url}
                  />
                  <AvatarFallback>
                    {userPins.profile.pinProject.user.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>

              <div>
                <h1>
                  <Link href={`/${userPins.profile.pinProject.user.username}`}>
                    {userPins.profile.pinProject.user.username}
                  </Link>
                </h1>
                <p className="text-xs text-muted-foreground">
                  {format(
                    new Date(userPins.profile.pinProject.createdAt),
                    `dd MMMM yyyy`,
                  )}{" "}
                  (Posted{" "}
                  {formatDistanceToNow(
                    new Date(userPins.profile.pinProject.createdAt),
                  )}{" "}
                  ago)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-10"></div>

              <div>
                <h1 className="text-2xl font-semibold">
                  <Link
                    href={`/${userPins.profile.pinProject.user.username}/projects/${userPins.profile.pinProject.id}`}
                    className="hover:underline"
                  >
                    {userPins.profile.pinProject.title}
                  </Link>
                </h1>
              </div>
            </div>
          </article>
        </section>
      )}
    </section>
  );
}
