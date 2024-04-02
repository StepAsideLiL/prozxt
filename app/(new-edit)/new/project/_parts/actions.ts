"use server";

import { SerializedEditorState, SerializedLexicalNode } from "lexical";

type NewProjectData = {
  title: string;
  tags: string[];
  editorState: SerializedEditorState<SerializedLexicalNode> | undefined;
};

export async function addNewProject(data: NewProjectData) {
  try {
    console.log(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
