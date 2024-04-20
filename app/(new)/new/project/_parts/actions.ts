"use server";

import prisma from "@/lib/prismadb";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";

type NewProjectData = {
  userId: string;
  title: string;
  tags: string[];
  editorState: SerializedEditorState<SerializedLexicalNode> | undefined;
};

export async function addNewProject(data: NewProjectData) {
  const { userId, title, editorState, tags } = data;

  try {
    console.log(data);
    const project = await prisma.project.create({
      data: {
        title: title,
        body: JSON.stringify(editorState),
        tags: JSON.stringify(tags),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (project) {
      return {
        projectId: project.id,
        success: true,
        message: "Project is published!",
      };
    } else {
      return {
        success: false,
        message: "Failed to save!",
      };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
