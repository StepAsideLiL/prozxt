"use client";

import LexicalEditor from "@/components/lexical-rte/lexical-editor";
import { NewPostInput, TagInput } from "@/components/prozxt-ui/input";
import { Button } from "@/components/ui/button";
import { EditorState } from "lexical";
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { addNewProject } from "./actions";
import { Badge } from "@/components/ui/badge";
import { RemoveXBtn } from "@/components/prozxt-ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type FormData = {
  tags: string;
};

export default function NewProjectForm({
  username,
  userId,
}: {
  username: string;
  userId: string;
}) {
  const [title, setTitle] = useState("");
  const [formData, setFormData] = useState<FormData>({ tags: "" });
  const [tags, setTags] = useState<string[]>([]);
  const [editorState, setEditorState] = useState<EditorState>();
  const router = useRouter();

  async function handleClick() {
    const data = {
      userId,
      title,
      tags,
      editorState: editorState?.toJSON(),
    };
    if (
      title.length !== 0 &&
      !!editorState?.toJSON().root.children &&
      editorState?.toJSON().root.children.length >= 1 &&
      // @ts-ignore: Unreachable code error
      editorState?.toJSON().root.children[0].children.length > 0
    ) {
      console.log(data);
      const res = await addNewProject(data);

      if (res.success) {
        toast.success(res.message);
        router.push(`/${username}/projects/${res.projectId}`);
      } else {
        toast.error(res.message);
      }
    } else {
      toast.error("Write something First!");
    }
  }

  function hangleTagSubmit(e: FormEvent) {
    e.preventDefault();
    if (formData.tags !== "") {
      tags.push(formData.tags);
      setFormData({ tags: "" });
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      {/* Project Title */}
      <Button
        variant={"outline"}
        onClick={() => handleClick()}
        className="gap-1"
      >
        <Plus size={16} /> Publish Project
      </Button>

      <NewPostInput
        placeholder="Project Title..."
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Project Description */}
      <ScrollArea className="h-96 w-full">
        <LexicalEditor
          placeholder="Project description..."
          setEditorState={setEditorState}
        />
      </ScrollArea>

      <Separator />

      {/* Project Tags */}
      <section className="relative flex flex-wrap items-center gap-4">
        {tags.length !== 0 &&
          tags.map((tag, i) => (
            <div key={i} className="relative">
              <Badge>{tag}</Badge>
              <RemoveXBtn
                variant={"close"}
                size={"close"}
                className="absolute -right-2 top-0"
                onClick={() => {
                  setTags(tags.filter((t) => t !== tag));
                }}
              />
            </div>
          ))}

        <form onSubmit={(e) => hangleTagSubmit(e)} className="w-full flex-1">
          <TagInput
            name="tags"
            value={formData.tags}
            placeholder="Add tags..."
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full"
          />
          <Button type="submit" className="sr-only">
            Add Tag
          </Button>
        </form>
      </section>
    </section>
  );
}
