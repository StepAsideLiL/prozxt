import { Suspense } from "react";
import CardContent from "./_parts/card-content";
import CardContentForm from "./_parts/card-content-form";

export default function Page() {
  return (
    <main className="container">
      <Suspense fallback={"loading"}>
        <CardContent />
      </Suspense>
    </main>
  );
}
