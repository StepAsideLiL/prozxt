import { besley, monofett, rubikMonoOne, vt323 } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <main className="grid place-content-center py-10">
      <h1 className={cn("text-3xl", monofett.className)}>Hello, World</h1>
      <h1 className={cn("text-3xl", vt323.className)}>Hello, World</h1>
      <h1 className={cn("text-3xl", rubikMonoOne.className)}>Hello, World</h1>
      <h1 className={cn("text-3xl", besley.className)}>Hello, World</h1>
      <h1 className={cn("text-3xl")}>Hello, World</h1>
    </main>
  );
}
