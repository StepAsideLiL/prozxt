import { PostProjectSkeleton } from "@/components/prozxt-ui/skeletons";
import { getHomeProjects } from "@/lib/data/project";
import { Suspense } from "react";
import PostCard from "@/components/prozxt-ui/post-card";

export default function Page() {
  return (
    <main className="container py-3">
      <Suspense fallback={<PostProjectSkeleton />}>
        <Projects />
      </Suspense>
    </main>
  );
}

async function Projects() {
  const projects = await getHomeProjects();

  return (
    <section className="mx-auto max-w-3xl space-y-3">
      {projects.length !== 0 ? (
        <section className="space-y-3">
          {projects.map((project) => (
            <PostCard
              key={project.id}
              username={project.user.username}
              profileUrl={project.user.profilePicture?.url || ""}
              postTitle={project.title}
              postId={project.id}
              postCreatedAt={project.createdAt}
              postType="project"
            />
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-20">
          <h1 className="text-center text-2xl text-muted-foreground">
            No Project Found
          </h1>
        </div>
      )}
    </section>
  );
}
