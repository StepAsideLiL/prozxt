"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { theme } from "./theme";
import Editor from "./editor";
import { Nodes } from "./nodes";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";

export default function LexicalEditor({
  setEditorState,
}: {
  setEditorState: (editorState: EditorState) => void;
}) {
  const initialConfig: InitialConfigType = {
    namespace: "Prozxt Lexical Editor",
    theme: theme,
    nodes: [...Nodes],
    onError: (error: Error) => {
      throw error;
    },
  };

  return (
    <section>
      <LexicalComposer initialConfig={initialConfig}>
        <Editor />
        <OnChangePlugin
          onChange={(editorState: EditorState) => {
            setEditorState(editorState);
          }}
        />
      </LexicalComposer>
    </section>
  );
}
