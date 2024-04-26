import { validateRequest } from "@/lib/auth";
import { getUserByUsername } from "@/lib/data/user";
import UserProfileOverview from "./_parts/user-profile-overview";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const userInfo = await getUserByUsername(params.username);
  const { user } = await validateRequest();

  return (
    <main className="container space-y-10 py-3">
      <Suspense fallback={<UserProfileOverviewSkeleton />}>
        <UserProfileOverview username={params.username} />
      </Suspense>
    </main>
  );
}

function UserProfileOverviewSkeleton() {
  return (
    <section className="mx-auto flex max-w-3xl gap-5 space-y-3">
      loading
    </section>
  );
}
