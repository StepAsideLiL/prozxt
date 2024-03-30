import LexicalEditor from "@/components/lexical-rte/lexical-editor";

export default function Page() {
  return (
    <main className="container space-y-10 py-10">
      <h1 className="text-xl font-semibold">Add Post</h1>

      <LexicalEditor />
    </main>
  );
}
