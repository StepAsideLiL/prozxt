"use client";

import LexicalEditor from "@/components/lexical-rte/lexical-editor";
import { NewPostInput } from "@/components/prozxt-ui/input";
import { Button } from "@/components/ui/button";
import { EditorState } from "lexical";
import { Plus } from "lucide-react";
import { useState } from "react";
import { addNewPost } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewPostForm({
  username,
  userId,
}: {
  username: string;
  userId: string;
}) {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState<EditorState>();
  const router = useRouter();

  async function handleClick() {
    const data = {
      userId,
      title,
      editorState: editorState?.toJSON() || "",
    };

    if (
      title.length !== 0 &&
      !!editorState?.toJSON().root.children &&
      editorState?.toJSON().root.children.length >= 1 &&
      // @ts-ignore: Unreachable code error
      editorState?.toJSON().root.children[0].children.length > 0
    ) {
      console.log(data);
      const res = await addNewPost(data);

      if (res.success) {
        toast.success(res.message);
        router.push(`/${username}/posts/${res.postId}`);
      } else {
        toast.error(res.message);
      }
    } else {
      toast.error("Write something First!");
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <section className="flex items-center justify-between gap-5">
        <NewPostInput
          placeholder="Post Title..."
          value={title}
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
