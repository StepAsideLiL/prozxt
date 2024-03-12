import { Suspense } from "react";
import CardContent from "./_parts/card-content";
import CardContentForm from "./_parts/card-content-form";

export default function Page() {
  return (
    <main className="container">
      <section className="flex min-h-screen w-full items-center justify-center">
        <Suspense fallback={"loading"}>
          <CardContent />
        </Suspense>
      </section>

      <section id="edit-card" className="flex justify-center py-10">
        <CardContentForm />
      </section>
    </main>
  );
}
