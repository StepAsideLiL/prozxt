"use client";

import LexicalEditor from "@/components/lexical-rte/lexical-editor";
import { NewPostInput } from "@/components/prozxt-ui/input";
import { Button } from "@/components/ui/button";
import { EditorState } from "lexical";
import { Plus } from "lucide-react";
import { useState } from "react";
import { addNewProject } from "./actions";

export default function NewProjectForm() {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState<EditorState>();

  function handleClick() {
    const data = {
      title,
      editorState: editorState?.toJSON(),
    };
    addNewProject(data);
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <section className="flex items-center justify-between gap-5">
        <NewPostInput
          placeholder="Project Title..."
          onChange={(e) => setTitle(e.target.value)}
        />

        <Button variant={"outline"} onClick={() => handleClick()}>
          <Plus size={16} /> Add Project
        </Button>
      </section>

      <LexicalEditor
        placeholder="Project description..."
        setEditorState={setEditorState}
      />
    </section>
  );
}
