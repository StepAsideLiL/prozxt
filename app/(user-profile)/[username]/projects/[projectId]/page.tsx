import { Suspense } from "react";
import UserProject from "./_parts/user-project";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page({
  params,
}: {
  params: { username: string; projectId: string };
}) {
  return (
    <main className="container space-y-10 py-3">
      <Suspense fallback={<UserProjectSkeleton />}>
        <UserProject username={params.username} projectId={params.projectId} />
      </Suspense>
    </main>
  );
}

function UserProjectSkeleton() {
  return (
    <article className="mx-auto max-w-3xl space-y-4">
      <Skeleton className="h-9 w-full" />

      <section className="flex items-start gap-5">
        <div className="flex items-start gap-5">
          <Skeleton className="h-10 w-10 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </section>

      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </article>
  );
}
