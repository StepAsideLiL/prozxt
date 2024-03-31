"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { theme } from "./theme";
import Editor from "./editor";
import { Nodes } from "./nodes";

export default function LexicalEditor() {
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
      </LexicalComposer>
    </section>
  );
}
