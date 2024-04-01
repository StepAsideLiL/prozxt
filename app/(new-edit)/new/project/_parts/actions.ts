"use server";

import { SerializedEditorState, SerializedLexicalNode } from "lexical";

type NewPostData = {
  title: string;
  editorState: SerializedEditorState<SerializedLexicalNode> | undefined;
};

export function addNewProject(data: NewPostData) {
  try {
    console.log(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
