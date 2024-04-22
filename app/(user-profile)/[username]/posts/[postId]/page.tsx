import { Suspense } from "react";
import UserPost from "./_parts/user-post";

export default function Page({
  params,
}: {
  params: { username: string; postId: string };
}) {
  return (
    <main className="container space-y-10 py-3">
      <Suspense fallback={"loading"}>
        <UserPost username={params.username} postId={params.postId} />
      </Suspense>
    </main>
  );
}