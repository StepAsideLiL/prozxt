"use client";

import LexicalEditor from "@/components/lexical-rte/lexical-editor";
import { NewPostInput, TagInput } from "@/components/prozxt-ui/input";
import { Button } from "@/components/ui/button";
import { EditorState } from "lexical";
import { Plus, RotateCw } from "lucide-react";
import { FormEvent, useState } from "react";
import { addNewProject } from "./actions";
import { Badge } from "@/components/ui/badge";
import { RemoveXBtn } from "@/components/prozxt-ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    setLoading(true);

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
        setLoading(false);
      }
    } else {
      toast.error("Write something First!");
      setLoading(false);
    }
  }

  function hangleTagSubmit(e: FormEvent) {
    e.preventDefault();
    if (formData.tags !== "" && tags.length < 5) {
      tags.push(formData.tags);
      setFormData({ tags: "" });
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      {loading ? (
        <Button variant={"outline"} disabled className="gap-1">
          <RotateCw className="mr-2 h-4 w-4 animate-spin" size={16} />
          Publishing...
        </Button>
      ) : (
        <Button
          variant={"outline"}
          onClick={() => handleClick()}
          className="gap-1"
        >
          <Plus size={16} /> Publish
        </Button>
      )}

      <div className="grid grid-cols-6 place-content-start">
        <section className="col-span-5 space-y-6">
          {/* Project Title */}
          <NewPostInput
            placeholder="Project Title..."
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Project Description */}
          <LexicalEditor
            placeholder="Project description..."
            setEditorState={setEditorState}
          />
        </section>

        {/* Project Tags */}
        <section className="col-span-1 flex flex-col items-start gap-4">
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

          {tags.length < 5 && (
            <form
              onSubmit={(e) => hangleTagSubmit(e)}
              className="w-full flex-1"
            >
              <TagInput
                name="tags"
                value={formData.tags}
                placeholder="Add tags..."
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full"
              />
              <Button type="submit" className="sr-only">
                Add Tag
              </Button>
            </form>
          )}
        </section>
      </div>
    </section>
  );
}
