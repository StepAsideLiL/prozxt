"use client";

import LexicalEditor from "@/components/lexical-rte/lexical-editor";
import { Button } from "@/components/ui/button";
import { updatePortfolio } from "@/lib/data/portfolio";
import { EditorState } from "lexical";
import { RotateCw, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function EditPortfolioForm({
  userId,
  content,
}: {
  userId: string;
  content?: string;
}) {
  const [editorState, setEditorState] = useState<EditorState>();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);

    const data = {
      userId: userId,
      portfolioBody: editorState!.toJSON(),
    };

    if (
      !!editorState?.toJSON().root.children &&
      editorState?.toJSON().root.children.length >= 1 &&
      // @ts-ignore: Unreachable code error
      editorState?.toJSON().root.children[0].children.length > 0
    ) {
      console.log(data);
      const res = await updatePortfolio(data);

      if (res.success) {
        toast.success(res.message);
        setLoading(false);
      } else {
        toast.error(res.message);
        setLoading(false);
      }
    } else {
      toast.error("Write something First!");
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      {loading ? (
        <Button variant={"outline"} disabled className="gap-1">
          <RotateCw className="mr-2 h-4 w-4 animate-spin" size={16} /> Saving...
        </Button>
      ) : (
        <Button
          variant={"outline"}
          onClick={() => handleClick()}
          className="gap-1"
        >
          <Save size={16} /> Save
        </Button>
      )}

      <LexicalEditor
        setEditorState={setEditorState}
        content={content}
        placeholder="Brag About You and Your Accomplishments..."
      />
    </section>
  );
}
