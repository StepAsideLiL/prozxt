import { Suspense } from "react";
import Posts from "./_parts/posts";

export default function Page() {
  return (
    <main className="container py-3">
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
    </main>
  );
}

function PostsSkeleton() {
  return <section className="mx-auto max-w-3xl space-y-3">loading</section>;
}
