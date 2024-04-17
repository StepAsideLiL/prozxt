"use server";

import prisma from "@/lib/prismadb";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";

type NewPostData = {
  userId: string;
  title: string;
  editorState: SerializedEditorState<SerializedLexicalNode> | string;
};

export async function addNewPost(data: NewPostData) {
  try {
    console.log(data);

    const post = await prisma.post.create({
      data: {
        title: data.title,
        body: JSON.stringify(data.editorState),
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });

    if (post) {
      return {
        postId: post.id,
        success: true,
        message: "Post is saved!",
      };
    } else {
      return {
        success: false,
        message: "Failed to save post!",
      };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
