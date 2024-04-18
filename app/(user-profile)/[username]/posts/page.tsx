import { Suspense } from "react";
import UserPosts from "./_parts/user-posts";

export default function Page({ params }: { params: { username: string } }) {
  return (
    <main className="container space-y-10 py-3">
      <Suspense fallback={"loading"}>
        <UserPosts username={params.username} />
      </Suspense>
    </main>
  );
}
