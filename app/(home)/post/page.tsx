import { Suspense } from "react";
import Posts from "./_parts/posts";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post",
};

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
  return (
    <section className="mx-auto max-w-3xl space-y-3">
      <article className="space-y-3 rounded bg-muted/25 p-5">
        <div className="flex items-start gap-5">
          <Skeleton className="h-10 w-10 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        <div className="flex items-start gap-5">
          <div className="w-10"></div>

          <div>
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </article>
    </section>
  );
}
