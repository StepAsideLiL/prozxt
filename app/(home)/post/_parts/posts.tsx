import { getHomePosts } from "@/lib/data/post";
import PostCard from "@/components/prozxt-ui/post-card";

export default async function Posts() {
  const homePosts = await getHomePosts();

  return (
    <section className="mx-auto max-w-3xl space-y-3">
      {homePosts.length !== 0 ? (
        <>
          {homePosts.map((post) => (
            <PostCard
              key={post.id}
              username={post.user.username}
              profileUrl={post.user.profilePicture?.url || ""}
              postTitle={post.title}
              postId={post.id}
              postCreatedAt={post.createdAt}
            />
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-20">
          <h1 className="text-center text-2xl text-muted-foreground">
            No Post Found
          </h1>
        </div>
      )}
    </section>
  );
}
