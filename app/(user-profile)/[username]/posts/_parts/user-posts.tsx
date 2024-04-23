import { Button } from "@/components/ui/button";
import { getUserPostsByUsername } from "@/lib/data/post";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { validateRequest } from "@/lib/auth";
import { Plus } from "lucide-react";

export default async function UserPosts({ username }: { username: string }) {
  const { user } = await validateRequest();
  const posts = await getUserPostsByUsername(username);

  return (
    <section className="mx-auto max-w-3xl space-y-3">
      {user?.username === username && posts.length !== 0 && (
        <>
          <Button variant={"outline"} asChild>
            <Link href={`/new/post`} className="gap-1">
              <Plus size={16} /> New Post
            </Link>
          </Button>
        </>
      )}

      {posts.length !== 0 ? (
        <section className="space-y-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="space-y-3 rounded bg-muted/25 p-5"
            >
              <div className="flex items-start gap-5">
                <Link href={`/${post.user.username}`}>
                  <Avatar>
                    <AvatarImage src={post.user.profilePicture?.url} />
                    <AvatarFallback>
                      {post.user.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <div>
                  <h1>
                    <Link href={`/${post.user.username}`}>
                      {post.user.username}
                    </Link>
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(post.createdAt), `dd MMMM yyyy`)} (Posted{" "}
                    {formatDistanceToNow(new Date(post.createdAt))} ago)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10"></div>

                <div>
                  <h1 className="text-2xl font-semibold">
                    <Link
                      href={`/${post.user.username}/posts/${post.id}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h1>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-20">
          <h1 className="text-center text-2xl text-muted-foreground">
            No Post Found
          </h1>
          <Button variant={"outline"} asChild>
            <Link href="/new/post">New Post</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
