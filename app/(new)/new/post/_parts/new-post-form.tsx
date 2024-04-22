"use client";

import LexicalEditor from "@/components/lexical-rte/lexical-editor";
import { NewPostInput } from "@/components/prozxt-ui/input";
import { Button } from "@/components/ui/button";
import { EditorState } from "lexical";
import { Plus, RotateCw } from "lucide-react";
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    setLoading(true);

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
          <RotateCw className="mr-2 h-4 w-4 animate-spin" size={16} />{" "}
          Posting...
        </Button>
      ) : (
        <Button
          variant={"outline"}
          onClick={() => handleClick()}
          className="gap-1"
        >
          <Plus size={16} /> Post
        </Button>
      )}

      <section className="space-y-6">
        {/* Post Title */}
        <NewPostInput
          placeholder="Post Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Post Body */}
        <LexicalEditor setEditorState={setEditorState} />
      </section>
    </section>
  );
}
