import { getProjctById } from "@/lib/data/project";
import ProjectEditForm from "./_parts/project-edit-form";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { username: string; projectId: string };
}) {
  const { user } = await validateRequest();
  const project = await getProjctById(params.projectId);

  if (user?.username !== params.username) {
    redirect("/auth/sign-in");
  }

  return (
    <main className="container space-y-10 py-3">
      {project ? (
        <ProjectEditForm
          projectId={project.id}
          projectTitle={project.title}
          projectBody={project.body}
          projectTags={project.tags}
        />
      ) : (
        <>
          <h1 className="text-center text-2xl text-muted-foreground">
            No Project Found
          </h1>
        </>
      )}
    </main>
  );
}
