import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import { getUserProjectsByUsername } from "@/lib/data/project";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";

export default async function UserProjects({ username }: { username: string }) {
  const { user } = await validateRequest();
  const projects = await getUserProjectsByUsername(username);

  return (
    <section className="mx-auto max-w-3xl">
      {projects.length !== 0 ? (
        <section className="space-y-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="space-y-3 rounded bg-muted/25 p-5"
            >
              <div className="flex items-start gap-5">
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
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10"></div>

                <div>
                  <h1 className="text-2xl font-semibold">
                    <Link
                      href={`/${project.user.username}/projects/${project.id}`}
                      className="hover:underline"
                    >
                      {project.title}
                    </Link>
                  </h1>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="py-20">
          <h1 className="text-center text-2xl text-muted-foreground">
            No Project Found
          </h1>
          <Button variant={"outline"} asChild>
            <Link href="/new/project">New Project</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
