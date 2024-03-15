import { Suspense } from "react";
import PreviewCardContent from "./_parts/preview-card-content";
import { CardContentSkeleton } from "@/components/prozxt-ui/skeletons";

export default function Page({ params }: { params: { username: string } }) {
  return (
    <main className="container grid min-h-screen place-content-center">
      <Suspense fallback={<CardContentSkeleton />}>
        <PreviewCardContent username={params.username} />
      </Suspense>
    </main>
  );
}
