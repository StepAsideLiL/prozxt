import { useState } from "react";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import MarkdownPlugin from "./plugins/MarkdownPlugin";
import BlockPickerPlugin from "./plugins/BlockPickerPlugin";
import LinkPlugin from "./plugins/LinkPlugin";
import LexicalAutoLinkPlugin from "./plugins/AutoLinkPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";
import LinkShortcutWithCtrlK from "./plugins/LinkShortcutWithCtrlK";
import {
  SharedHistoryContext,
  useSharedHistoryContext,
} from "./contexts/SharedHistoryContext";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

export default function Editor({ placeholder }: { placeholder?: string }) {
  const { historyState } = useSharedHistoryContext();

  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative">
      <SharedHistoryContext>
        <RichTextPlugin
          contentEditable={
            <div ref={onRef}>
              <ContentEditable className="h-96 focus-visible:outline-none" />
            </div>
          }
          placeholder={
            <div className="absolute top-0 -z-50 text-muted-foreground/50">
              {placeholder || "Write..."}
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        {/* Undo and Redo plugin */}
        <HistoryPlugin externalHistoryState={historyState} />

        {/* "/" dropdown block picker menu */}
        <BlockPickerPlugin />

        {/* Enable markdown shortcuts */}
        <MarkdownPlugin />

        {/* Enable tab press indentation */}
        <TabIndentationPlugin />

        {/* List and Check list plugings */}
        <ListPlugin />
        <CheckListPlugin />

        {/* Link plugins */}
        <LinkPlugin />
        <LexicalAutoLinkPlugin />
        <LinkShortcutWithCtrlK setIsLinkEditMode={setIsLinkEditMode} />

        {/* Floating toolbar and floating link editor field */}
        {floatingAnchorElem && (
          <>
            <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
            <FloatingLinkEditorPlugin
              anchorElem={floatingAnchorElem}
              isLinkEditMode={isLinkEditMode}
              setIsLinkEditMode={setIsLinkEditMode}
            />
          </>
        )}
      </SharedHistoryContext>
    </div>
  );
}
