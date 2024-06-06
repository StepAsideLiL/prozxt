import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, formatDistanceToNow } from "date-fns";

export default function PostCard({
  username,
  profileUrl,
  postCreatedAt,
  postTitle,
  postId,
  postType = "post",
}: {
  username: string;
  profileUrl: string;
  postCreatedAt: Date;
  postTitle: string;
  postId: string;
  postType?: "post" | "project";
}) {
  return (
    <article className="space-y-3 rounded bg-muted/25 p-5">
      <div className="flex items-start gap-5">
        <Link href={`/${username}`}>
          <Avatar>
            <AvatarImage src={profileUrl} />
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>

        <div>
          <h1>
            <Link href={`/${username}`}>{username}</Link>
          </h1>
          <p className="text-xs text-muted-foreground">
            {format(new Date(postCreatedAt), `dd MMMM yyyy`)} (Posted{" "}
            {formatDistanceToNow(new Date(postCreatedAt))} ago)
          </p>
        </div>
      </div>

      <div className="flex items-start gap-5">
        <div className="w-10"></div>

        <div>
          <h1 className="text-2xl font-semibold">
            <Link
              href={`/${username}/${postType}s/${postId}`}
              className="hover:underline"
            >
              {postTitle}
            </Link>
          </h1>
        </div>
      </div>
    </article>
  );
}
