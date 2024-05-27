import UserProfileOverview from "./_parts/user-profile-overview";
import { Suspense } from "react";
import UserActivities from "./_parts/user-activities";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserPins from "./_parts/user-pins";
import { Separator } from "@/components/ui/separator";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  return (
    <main className="container space-y-10 py-3">
      <Suspense fallback={<UserProfileOverviewSkeleton />}>
        <UserProfileOverview username={params.username} />
      </Suspense>

      <Suspense fallback={<UserActivitiesSkeleton />}>
        <UserActivities username={params.username} />
      </Suspense>

      <Separator className="mx-auto max-w-3xl" />

      <Suspense fallback={<UserPinsSkeleton />}>
        <UserPins username={params.username} />
      </Suspense>
    </main>
  );
}

function UserProfileOverviewSkeleton() {
  return (
    <section className="mx-auto flex max-w-3xl gap-5 space-y-3">
      <Skeleton className="h-32 w-32 rounded-full" />

      <div className="space-y-2">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-9 w-36" />
      </div>
    </section>
  );
}

function UserActivitiesSkeleton() {
  const arr = Array.from({ length: 2 }).map((_, i) => i + 1);

  return (
    <section className="mx-auto flex max-w-3xl gap-5">
      {arr.map((list) => (
        <Card key={list} className="w-full">
          <CardHeader>
            <Skeleton className="h-6 w-14" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-10" />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function UserPinsSkeleton() {
  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <Skeleton className="h-20 w-full" />

      <Skeleton className="h-20 w-full" />
    </section>
  );
}
