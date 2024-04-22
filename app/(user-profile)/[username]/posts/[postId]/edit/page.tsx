import { getPostById } from "@/lib/data/post";
import PostEditForm from "./_parts/post-edit-form";

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await getPostById(params.postId);

  return (
    <main className="container space-y-10 py-3">
      {post ? (
        <PostEditForm
          postId={post.id}
          postTitle={post.title}
          postBody={post.body}
        />
      ) : (
        <>
          <h1 className="text-center text-2xl text-muted-foreground">
            No Post Found
          </h1>
        </>
      )}
    </main>
  );
}
