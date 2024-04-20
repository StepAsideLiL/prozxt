import { validateRequest } from "@/lib/auth";
import NewPostForm from "./_parts/new-post-form";

export default async function Page() {
  const { user } = await validateRequest();

  return (
    <main className="container space-y-10 py-3">
      <NewPostForm username={user!.username} userId={user!.id} />
    </main>
  );
}
