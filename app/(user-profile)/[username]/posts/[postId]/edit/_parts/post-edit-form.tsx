"use client";

import LexicalEditor from "@/components/lexical-rte/lexical-editor";
import { NewPostInput } from "@/components/prozxt-ui/input";
import { Button } from "@/components/ui/button";
import { EditorState } from "lexical";
import { Plus, RotateCw, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { updatePost } from "./actions";

export default function PostEditForm({
  postId,
  postTitle,
  postBody,
}: {
  postId: string;
  postTitle: string;
  postBody: string;
}) {
  const [title, setTitle] = useState(postTitle);
  const [editorState, setEditorState] = useState<EditorState>();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);

    const data = {
      postId,
      postTitle: title,
      postBody: editorState!.toJSON(),
    };

    if (
      title.length !== 0 &&
      !!editorState?.toJSON().root.children &&
      editorState?.toJSON().root.children.length >= 1 &&
      // @ts-ignore: Unreachable code error
      editorState?.toJSON().root.children[0].children.length > 0
    ) {
      console.log(data);
      const res = await updatePost(data);

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

      <NewPostInput
        placeholder="Post Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <LexicalEditor setEditorState={setEditorState} content={postBody} />
    </section>
  );
}
