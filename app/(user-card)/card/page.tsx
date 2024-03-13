import { Suspense } from "react";
import CardContent from "./_parts/card-content";

export default function Page() {
  return (
    <main className="container">
      <Suspense fallback={"loading"}>
        <CardContent />
      </Suspense>
    </main>
  );
}
