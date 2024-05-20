"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { theme } from "./config/theme";
import Editor from "./editor";
import { Nodes } from "./config/nodes";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";

export default function LexicalEditor({
  placeholder,
  content = '{"root":{"children":[{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
  setEditorState,
}: {
  placeholder?: string;
  content?: string;
  setEditorState: (editorState: EditorState) => void;
}) {
  const initialConfig: InitialConfigType = {
    editorState: content,
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
        <Editor placeholder={placeholder} />
        <OnChangePlugin
          onChange={(editorState: EditorState) => {
            setEditorState(editorState);
          }}
        />
      </LexicalComposer>
    </section>
  );
}
