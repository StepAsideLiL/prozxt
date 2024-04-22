import { Suspense } from "react";
import UserProject from "./_parts/user-project";

export default function Page({
  params,
}: {
  params: { username: string; projectId: string };
}) {
  return (
    <main className="container space-y-10 py-3">
      <Suspense fallback={"loading"}>
        <UserProject username={params.username} projectId={params.projectId} />
      </Suspense>
    </main>
  );
}