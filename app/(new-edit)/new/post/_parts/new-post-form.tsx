"use client";

import LexicalEditor from "@/components/lexical-rte/lexical-editor";
import { NewPostInput } from "@/components/prozxt-ui/input";
import { Button } from "@/components/ui/button";
import { EditorState } from "lexical";
import { Plus } from "lucide-react";
import { useState } from "react";
import { addNewPost } from "./actions";

export default function NewPostForm() {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState<EditorState>();

  function handleClick() {
    const data = {
      title,
      editorState: editorState?.toJSON(),
    };
    addNewPost(data);
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <section className="flex items-center justify-between gap-5">
        <NewPostInput
          placeholder="Post Title..."
          onChange={(e) => setTitle(e.target.value)}
        />

        <Button variant={"outline"} onClick={() => handleClick()}>
          <Plus size={16} /> Add Post
        </Button>
      </section>

      <LexicalEditor setEditorState={setEditorState} />
    </section>
  );
}
