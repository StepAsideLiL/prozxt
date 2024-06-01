import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import MarkdownPlugin from "./plugins/MarkdownPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import BlockPickerPlugin from "./plugins/BlockPickerPlugin";

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
      <BlockPickerPlugin />
      <MarkdownPlugin />
      <TabIndentationPlugin />
    </div>
  );
}
