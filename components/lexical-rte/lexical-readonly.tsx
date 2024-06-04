"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

import { theme } from "./config/theme";
import { Nodes } from "./config/nodes";
// import Editor from "./editor";

export default function LexicalReadonly({ content }: { content?: string }) {
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
        <ReadOnlyEditor />
      </LexicalComposer>
    </section>
  );
}

function ReadOnlyEditor() {
  return (
    <>
      {/* <Editor /> */}

      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<></>}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </>
  );
}
