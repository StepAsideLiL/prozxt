"use server";

import prisma from "@/lib/prismadb";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";

type UpdatePostData = {
  postId: string;
  postTitle: string;
  postBody: SerializedEditorState<SerializedLexicalNode> | string;
};

export async function updatePost(data: UpdatePostData) {
  try {
    const post = await prisma.post.update({
      where: {
        id: data.postId,
      },
      data: {
        title: data.postTitle,
        body: JSON.stringify(data.postBody),
      },
    });

    if (post) {
      return {
        success: true,
        message: "Successfully updated.",
      };
    } else {
      return {
        success: false,
        message: "Failed to updat.",
      };
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update post.");
  }
}
