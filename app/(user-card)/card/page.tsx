import { Suspense } from "react";
import CardContent from "./_parts/card-content";
import { Skeleton } from "@/components/ui/skeleton";
import { FullLogo } from "@/components/prozxt-ui/logo";

export default function Page() {
  return (
    <main className="container grid min-h-screen place-content-center">
      <Suspense fallback={<CardContentSkeleton />}>
        <CardContent />
      </Suspense>
    </main>
  );
}

function CardContentSkeleton() {
  return (
    <section className="aspect-video w-[700px] select-none rounded-2xl border p-10">
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
            <p className="text-right text-[10px] text-muted-foreground">
              Portfolio and Project
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-5">
          <div className="space-y-2">
            <Skeleton className="h-10 w-28" />
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
  );
}
