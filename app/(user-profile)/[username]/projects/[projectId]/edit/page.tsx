import { getProjctById } from "@/lib/data/project";
import ProjectEditForm from "./_parts/project-edit-form";

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProjctById(params.projectId);

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
