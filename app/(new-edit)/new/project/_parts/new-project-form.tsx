"use client";

import LexicalEditor from "@/components/lexical-rte/lexical-editor";
import { NewPostInput, TagInput } from "@/components/prozxt-ui/input";
import { Button } from "@/components/ui/button";
import { EditorState } from "lexical";
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { addNewProject } from "./actions";
import { Badge } from "@/components/ui/badge";

type FormData = {
  tags: string;
};

export default function NewProjectForm() {
  const [title, setTitle] = useState("");
  const [formData, setFormData] = useState<FormData>({ tags: "" });
  const [tags, setTags] = useState<string[]>([]);
  const [editorState, setEditorState] = useState<EditorState>();

  function handleClick() {
    const data = {
      title,
      editorState: editorState?.toJSON(),
    };
    addNewProject(data);
  }

  function hangleTagSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(formData);
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

      <section className="relative">
        {tags.length !== 0 &&
          tags.map((tag, i) => <Badge key={i}>{tag}</Badge>)}

        {formData.tags === "" && tags.length === 0 && (
          <div className="absolute inset-0 -z-20 text-muted">Tags...</div>
        )}

        <form onSubmit={(e) => hangleTagSubmit(e)}>
          <TagInput
            name="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
          <Button type="submit" className="sr-only">
            Add Tag
          </Button>
        </form>
      </section>

      <LexicalEditor
        placeholder="Project description..."
        setEditorState={setEditorState}
      />
    </section>
  );
}
