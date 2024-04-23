import { getPostById } from "@/lib/data/post";
import PostEditForm from "./_parts/post-edit-form";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { username: string; postId: string };
}) {
  const { user } = await validateRequest();
  const post = await getPostById(params.postId);

  if (user?.username !== params.username) {
    redirect("/auth/sign-in");
  }

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
