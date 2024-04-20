"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { theme } from "./theme";
import { Nodes } from "./nodes";
import Editor from "./editor";

export default function LexicalReadonly({ content }: { content: string }) {
  const initialConfig: InitialConfigType = {
    editorState: content,
    namespace: "Prozxt Lexical Read-only Editor",
    theme: theme,
    nodes: [...Nodes],
    onError: (error: Error) => {
      throw error;
    },
    editable: false,
  };

  return (
    <section>
      <LexicalComposer initialConfig={initialConfig}>
        <Editor />
      </LexicalComposer>
    </section>
  );
}
