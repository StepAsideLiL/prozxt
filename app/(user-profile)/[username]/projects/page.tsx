import { Suspense } from "react";
import UserProjects from "./_parts/user-projects";

export default function Page({ params }: { params: { username: string } }) {
  return (
    <main className="container space-y-10 py-3">
      <Suspense fallback={"loading"}>
        <UserProjects username={params.username} />
      </Suspense>
    </main>
  );
}
