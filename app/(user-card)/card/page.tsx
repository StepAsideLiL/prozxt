import { Suspense } from "react";
import CardContent from "./_parts/card-content";
import { CardContentSkeleton } from "@/components/prozxt-ui/skeletons";

export default function Page() {
  return (
    <main className="container grid min-h-screen place-content-center">
      <Suspense fallback={<CardContentSkeleton />}>
        <CardContent />
      </Suspense>
    </main>
  );
}
