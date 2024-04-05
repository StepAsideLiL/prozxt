"use server";

import { SerializedEditorState, SerializedLexicalNode } from "lexical";

type NewPostData = {
  title: string;
  editorState: string;
};

export async function addNewPost(data: NewPostData) {
  try {
    console.log(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
