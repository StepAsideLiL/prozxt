import { Suspense } from "react";
import CardContent from "./_parts/card-content";

export default function Page() {
  return (
    <main className="min-h-screen grid place-content-center">
      <Suspense fallback={"loading"}>
        <CardContent />
      </Suspense>
    </main>
  );
}
