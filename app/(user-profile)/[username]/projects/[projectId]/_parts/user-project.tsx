import LexicalReadonly from "@/components/lexical-rte/lexical-readonly";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProjctById } from "@/lib/data/project";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { validateRequest } from "@/lib/auth";
import ProjectMenu from "./project-menu";

export default async function UserProject({
  username,
  projectId,
}: {
  username: string;
  projectId: string;
}) {
  const { user } = await validateRequest();
  const project = await getProjctById(projectId);

  return (
    <section className="mx-auto max-w-3xl">
      {project ? (
        <>
          <section className="space-y-6">
            {user?.username === username && (
              <>
                <ProjectMenu
                  pinned={project.pinProjectFor ? true : false}
                  username={user.username}
                  userId={user.id}
                  projectId={project.id}
                />
              </>
            )}

            <article className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold">{project.title}</h1>

                <section className="flex items-start gap-5">
                  <Link href={`/${project.user.username}`}>
                    <Avatar>
                      <AvatarImage src={project.user.profilePicture?.url} />
                      <AvatarFallback>
                        {project.user.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>

                  <div>
                    <h1>
                      <Link href={`/${project.user.username}`}>
                        {project.user.username}
                      </Link>
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(project.createdAt), `dd MMMM yyyy`)}{" "}
                      (Posted {formatDistanceToNow(new Date(project.createdAt))}{" "}
                      ago)
                    </p>
                  </div>
                </section>
              </div>

              <LexicalReadonly content={project.body} />
            </article>
          </section>
        </>
      ) : (
        <>
          <h1 className="text-center text-2xl text-muted-foreground">
            No Project Found
          </h1>
        </>
      )}
    </section>
  );
}
