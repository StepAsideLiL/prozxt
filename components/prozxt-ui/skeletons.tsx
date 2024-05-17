import { Skeleton } from "@/components/ui/skeleton";
import { FullLogo } from "@/components/prozxt-ui/logo";

export function CardContentSkeleton() {
  return (
    <>
      <section className="hidden aspect-video w-[700px] select-none overflow-hidden rounded-2xl border p-10 md:block">
        <div className="flex h-full w-full flex-col">
          <div className="flex flex-1 items-start gap-5">
            <div>
              <Skeleton className="aspect-square size-12 rounded-full border" />
            </div>

            <div className="flex-1 space-y-2">
              <Skeleton className="h-7 w-28" />
              <Skeleton className="h-2 w-10" />
            </div>

            <div className="flex flex-col items-end gap-2">
              <FullLogo size={100} />
            </div>
          </div>

          <div className="flex items-end justify-between gap-5">
            <div className="space-y-2">
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    <Skeleton className="size-12" />
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="size-4" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative block aspect-[9/12] w-96 select-none overflow-hidden rounded-2xl border p-10 md:hidden">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <Skeleton className="aspect-square size-12 rounded-full border" />

            <div>
              <FullLogo size={100} />
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-2 w-10" />
          </div>

          <div className="flex flex-col items-center gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="size-4" />
                <Skeleton className="h-4 w-40" />
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                  <Skeleton className="size-12" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function UserAvatarSkeleton() {
  return <Skeleton className="h-10 w-10 rounded-full" />;
}

export function UserProfileAvatarSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-7 w-7 rounded-full" />

      <Skeleton className="h-4 w-10" />
    </div>
  );
}

export function PostProjectSkeleton() {
  const arr = Array.from({ length: 5 }).map((_, i) => i + 1);

  return (
    <section className="mx-auto max-w-3xl space-y-3">
      {arr.map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </section>
  );
}
