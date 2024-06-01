import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  TextNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { LucideIcon } from "lucide-react";
import { icon } from "../../config/icons";
import { $createHeadingNode } from "@lexical/rich-text";
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

class BlockPickerOption extends MenuOption {
  title: string;
  icon: LucideIcon;
  keywords: Array<string>;
  keyboardShortcut?: string;
  onSelect: (queryString: string) => void;

  constructor(
    title: string,
    options: {
      icon: LucideIcon;
      keywords: Array<string>;
      keyboardShortcut?: string;
      onSelect: (queryString: string) => void;
    },
  ) {
    super(title);
    this.title = title;
    this.icon = options.icon;
    this.keywords = options.keywords || [];
    this.keyboardShortcut = options.keyboardShortcut;
    this.onSelect = options.onSelect.bind(this);
  }
}

function getBaseOptions(editor: LexicalEditor) {
  return [
    new BlockPickerOption("Paragraph", {
      icon: icon.paragraph,
      keywords: ["paragraph", "normal", "p", "text"],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createParagraphNode());
          }
        }),
    }),
    new BlockPickerOption("Heading 1", {
      icon: icon.h1,
      keywords: ["heading 1", "h1", "title", "h"],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode("h1"));
          }
        }),
    }),
    new BlockPickerOption("Heading", {
      icon: icon.h2,
      keywords: ["heading", "h2", "subtitle", "subtitle", "h"],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode("h2"));
          }
        }),
    }),
    new BlockPickerOption("Heading 3", {
      icon: icon.h3,
      keywords: ["heading 3", "h3", "subtitle", "h"],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode("h3"));
          }
        }),
    }),
    new BlockPickerOption("Bullet List", {
      icon: icon.unorderedList,
      keywords: ["bulleted", "list", "ul", "unordered"],
      onSelect: () =>
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined),
    }),
    new BlockPickerOption("Numbered List", {
      icon: icon.orderedList,
      keywords: ["numbered list", "ordered list", "ol", "list"],
      onSelect: () =>
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined),
    }),
    new BlockPickerOption("Check List", {
      icon: icon.checkList,
      keywords: ["check list", "todo list", "list"],
      onSelect: () =>
        editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined),
    }),
  ];
}

export default function BlockPickerPlugin() {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>(null);

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0,
  });

  const options = useMemo(() => {
    const baseOptions = getBaseOptions(editor);

    if (!queryString) {
      return baseOptions;
    }

    const regex = new RegExp(queryString, "i");

    return [
      ...baseOptions.filter(
        (option) =>
          regex.test(option.title) ||
          option.keywords.some((keyword) => regex.test(keyword)),
      ),
    ];
  }, [editor, queryString]);

  const onSelectOption = useCallback(
    (
      selectedOption: BlockPickerOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void,
      matchingString: string,
    ) => {
      editor.update(() => {
        nodeToRemove?.remove();
        selectedOption.onSelect(matchingString);
        closeMenu();
      });
    },
    [editor],
  );

  return (
    <>
      <LexicalTypeaheadMenuPlugin<BlockPickerOption>
        onQueryChange={setQueryString}
        onSelectOption={onSelectOption}
        triggerFn={checkForTriggerMatch}
        options={options}
        menuRenderFn={(
          anchorElementRef,
          { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
        ) =>
          anchorElementRef.current && options.length
            ? createPortal(
                <ScrollArea className="h-60 w-40 rounded border bg-background p-0.5">
                  {options.map((option, i) => (
                    <Button
                      variant={"ghost"}
                      tabIndex={-1}
                      key={i}
                      className={cn(
                        "flex w-full items-center justify-start gap-3 rounded p-2",
                        selectedIndex === i && "bg-muted",
                      )}
                      onClick={() => {
                        setHighlightedIndex(i);
                        selectOptionAndCleanUp(option);
                      }}
                      onMouseEnter={() => {
                        setHighlightedIndex(i);
                      }}
                    >
                      <option.icon size={20} /> <span>{option.title}</span>
                    </Button>
                  ))}
                </ScrollArea>,
                anchorElementRef.current,
              )
            : null
        }
      />
    </>
  );
}
