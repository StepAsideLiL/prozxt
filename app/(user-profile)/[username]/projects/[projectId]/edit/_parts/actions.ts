"use server";

import prisma from "@/lib/prismadb";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";

type UpdateProjectData = {
  projectId: string;
  projectTitle: string;
  projectTags: string[];
  projectBody: SerializedEditorState<SerializedLexicalNode> | undefined;
};

export async function updateProject(data: UpdateProjectData) {
  try {
    const project = await prisma.project.update({
      where: {
        id: data.projectId,
      },
      data: {
        title: data.projectTitle,
        body: JSON.stringify(data.projectBody),
        tags: JSON.stringify(data.projectTags),
      },
    });

    if (project) {
      return {
        success: true,
        message: "Successfully updated!",
      };
    } else {
      return {
        success: false,
        message: "Failed to updated!",
      };
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update project.");
  }
}
