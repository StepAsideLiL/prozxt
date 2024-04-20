import { validateRequest } from "@/lib/auth";
import NewProjectForm from "./_parts/new-project-form";

export default async function Page() {
  const { user } = await validateRequest();

  return (
    <main className="container space-y-10 py-3">
      <NewProjectForm username={user!.username} userId={user!.id} />
    </main>
  );
}
