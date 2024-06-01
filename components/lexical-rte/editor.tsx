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

export default function Editor({ placeholder }: { placeholder?: string }) {
  return (
    <div className="relative">
      <RichTextPlugin
        contentEditable={
          <div>
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
    </div>
  );
}
