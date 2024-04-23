import { Suspense } from "react";
import UserProjects from "./_parts/user-projects";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page({ params }: { params: { username: string } }) {
  return (
    <main className="container space-y-10 py-3">
      <Suspense fallback={<UserProjectsSkeleton />}>
        <UserProjects username={params.username} />
      </Suspense>
    </main>
  );
}

function UserProjectsSkeleton() {
  const arr = Array.from({ length: 5 }).map((_, i) => i + 1);

  return (
    <section className="mx-auto max-w-3xl space-y-3">
      {arr.map((list) => (
        <article key={list} className="space-y-3 rounded bg-muted/25 p-5">
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
      ))}
    </section>
  );
}
