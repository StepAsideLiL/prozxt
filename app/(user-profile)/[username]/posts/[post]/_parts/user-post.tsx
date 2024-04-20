import LexicalReadonly from "@/components/lexical-rte/lexical-readonly";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPostById } from "@/lib/data/post";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";

export default async function UserPost({
  username,
  postId,
}: {
  username: string;
  postId: string;
}) {
  const post = await getPostById(postId);

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      {post ? (
        <>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{post?.title}</h1>

            <section className="flex items-start gap-5">
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
            </section>
          </div>

          <LexicalReadonly content={post!.body} />
        </>
      ) : (
        <>
          <h1 className="text-center text-2xl text-muted-foreground">
            No Post Found
          </h1>
        </>
      )}
    </section>
  );
}
