import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { $isCodeHighlightNode } from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import { createPortal } from "react-dom";
import { Dispatch, useCallback, useEffect, useRef, useState } from "react";

import { getSelectedNode } from "../../utils/getSelectedNode";
import { getDOMRangeRect } from "../../utils/getDOMRangeRect";
import { setFloatingElemPosition } from "../../utils/setFloatingElemPosition";
import { LexicalToggle } from "../../ui/toggle";
import { Icon } from "../../config/icons";
import {
  LexicalDropdownMenu,
  LexicalDropdownMenuContent,
  LexicalDropdownMenuItem,
  LexicalDropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { LexicalButton } from "../../ui/button";
import { $setBlocksType } from "@lexical/selection";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
} from "@lexical/list";

const blockTypeToBlockName = {
  paragraph: "Normal",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  bullet: "Bulleted List",
  number: "Numbered List",
  check: "Check List",
  quote: "Quote",
  code: "Code Block",
};
type BlockType = keyof typeof blockTypeToBlockName;

function BlockTurnintoDropdown({
  editor,
  blockType,
}: {
  editor: LexicalEditor;
  blockType: BlockType;
}) {
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };
  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      });
    }
  };
  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };
  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };
  const formatCheckList = () => {
    if (blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };
  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createQuoteNode());
      });
    }
  };

  return (
    <LexicalDropdownMenu>
      <LexicalDropdownMenuTrigger>
        <LexicalButton variant={"ghost"}>
          {blockTypeToBlockName[blockType]}
        </LexicalButton>
      </LexicalDropdownMenuTrigger>

      <LexicalDropdownMenuContent>
        <LexicalDropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => formatParagraph()}
        >
          <Icon.paragraph size={16} />
          <span className="text">Normal</span>
        </LexicalDropdownMenuItem>

        <LexicalDropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => formatHeading("h1")}
        >
          <Icon.h1 size={16} />
          <span className="text">Heading 1</span>
        </LexicalDropdownMenuItem>

        <LexicalDropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => formatHeading("h2")}
        >
          <Icon.h2 size={16} />
          <span className="text">Heading 2</span>
        </LexicalDropdownMenuItem>

        <LexicalDropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => formatHeading("h3")}
        >
          <Icon.h3 size={16} />
          <span className="text">Heading 3</span>
        </LexicalDropdownMenuItem>

        <LexicalDropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => formatBulletList()}
        >
          <Icon.unorderedList size={16} />
          <span className="text">Bullet List</span>
        </LexicalDropdownMenuItem>

        <LexicalDropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => formatNumberedList()}
        >
          <Icon.orderedList size={16} />
          <span className="text">Number List</span>
        </LexicalDropdownMenuItem>

        <LexicalDropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => formatCheckList()}
        >
          <Icon.checkList size={16} />
          <span className="text">Check List</span>
        </LexicalDropdownMenuItem>

        <LexicalDropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => formatQuote()}
        >
          <Icon.quote size={16} />
          <span className="text">Quote</span>
        </LexicalDropdownMenuItem>
      </LexicalDropdownMenuContent>
    </LexicalDropdownMenu>
  );
}

function FloatingTextFormatToolbar({
  editor,
  anchorElem = document.body,
  blockType,
  isBold,
  isItalic,
  isUnderline,
  isLink,
  isCode,
  setIsLinkEditMode,
}: // isStrikethrough,
// isSubscript,
// isSuperscript,
{
  editor: LexicalEditor;
  anchorElem?: HTMLElement;
  blockType: BlockType;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isLink: boolean;
  isCode: boolean;
  setIsLinkEditMode: Dispatch<boolean>;
  // isStrikethrough: boolean;
  // isSubscript: boolean;
  // isSuperscript: boolean;
}) {
  const popupCharStylesEditorRef = useRef<HTMLDivElement>(null);

  const insertLink = useCallback(() => {
    if (!isLink) {
      setIsLinkEditMode(true);
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink, setIsLinkEditMode]);

  const updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection();

    const popupCharStylesEditorElem = popupCharStylesEditorRef.current;
    const nativeSelection = window.getSelection();

    if (popupCharStylesEditorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement);

      setFloatingElemPosition(
        rangeRect,
        popupCharStylesEditorElem,
        anchorElem,
        isLink,
      );
    }
  }, [editor, anchorElem, isLink]);

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement;

    const update = () => {
      editor.getEditorState().read(() => {
        updateTextFormatFloatingToolbar();
      });
    };

    window.addEventListener("resize", update);
    if (scrollerElem) {
      scrollerElem.addEventListener("scroll", update);
    }

    return () => {
      window.removeEventListener("resize", update);
      if (scrollerElem) {
        scrollerElem.removeEventListener("scroll", update);
      }
    };
  }, [editor, updateTextFormatFloatingToolbar, anchorElem]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateTextFormatFloatingToolbar();
    });
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateTextFormatFloatingToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateTextFormatFloatingToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, updateTextFormatFloatingToolbar]);

  return (
    <div
      ref={popupCharStylesEditorRef}
      className="absolute left-0 top-0 flex border bg-background"
    >
      <BlockTurnintoDropdown editor={editor} blockType={blockType} />

      <LexicalToggle
        pressed={isBold ? true : false}
        aria-label="Toggle Bold"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
      >
        <Icon.bold size={16} />
      </LexicalToggle>
      <LexicalToggle
        pressed={isItalic ? true : false}
        aria-label="Toggle Italic"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
      >
        <Icon.italic size={16} />
      </LexicalToggle>
      <LexicalToggle
        pressed={isUnderline ? true : false}
        aria-label="Toggle Underline"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
      >
        <Icon.underline size={16} />
      </LexicalToggle>
      <LexicalToggle
        pressed={isCode ? true : false}
        aria-label="Toggle Code"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        }}
      >
        <Icon.code size={16} />
      </LexicalToggle>
      <LexicalToggle
        pressed={isLink ? true : false}
        aria-label="Toggle italic"
        onClick={insertLink}
      >
        <Icon.link size={16} />
      </LexicalToggle>
    </div>
  );
}

export default function FloatingTextFormatToolbarPlugin({
  anchorElem = document.body,
  isLinkEditMode,
  setIsLinkEditMode,
}: {
  anchorElem: HTMLElement;
  isLinkEditMode: boolean;
  setIsLinkEditMode: Dispatch<boolean>;
}) {
  const [editor] = useLexicalComposerContext();

  const [isText, setIsText] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  // const [isStrikethrough, setIsStrikethrough] = useState(false);
  // const [isSubscript, setIsSubscript] = useState(false);
  // const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const [blockType, setBlockType] = useState<BlockType>("paragraph");

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      if (editor.isComposing()) {
        return;
      }

      const selection = $getSelection();
      const nativeSelection = window.getSelection();
      const rootElement = editor.getRootElement();

      if (
        nativeSelection !== null &&
        (!$isRangeSelection(selection) ||
          rootElement === null ||
          !rootElement.contains(nativeSelection.anchorNode))
      ) {
        setIsText(false);
        return;
      }

      if (!$isRangeSelection(selection)) {
        return;
      }

      const node = getSelectedNode(selection);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      // setIsStrikethrough(selection.hasFormat("strikethrough"));
      // setIsSubscript(selection.hasFormat("subscript"));
      // setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));

      // Update links
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (
        !$isCodeHighlightNode(selection.anchor.getNode()) &&
        selection.getTextContent() !== ""
      ) {
        setIsText($isTextNode(node) || $isParagraphNode(node));
      } else {
        setIsText(false);
      }

      const rawTextContent = selection.getTextContent().replace(/\n/g, "");
      if (!selection.isCollapsed() && rawTextContent === "") {
        setIsText(false);
        return;
      }

      // Set block type
      if ($isRangeSelection(selection)) {
        const anchorNode = selection.anchor.getNode();
        let element =
          anchorNode.getKey() === "root"
            ? anchorNode
            : $findMatchingParent(anchorNode, (e) => {
                const parent = e.getParent();
                return parent !== null && $isRootOrShadowRoot(parent);
              });

        if (element === null) {
          element = anchorNode.getTopLevelElementOrThrow();
        }

        const elementKey = element.getKey();
        const elementDOM = editor.getElementByKey(elementKey);

        if (elementDOM !== null) {
          if ($isListNode(element)) {
            const parentList = $getNearestNodeOfType<ListNode>(
              anchorNode,
              ListNode,
            );
            const type = parentList
              ? parentList.getListType()
              : element.getListType();
            setBlockType(type);
          } else {
            const type = $isHeadingNode(element)
              ? element.getTag()
              : element.getType();
            if (type in blockTypeToBlockName) {
              setBlockType(type as keyof typeof blockTypeToBlockName);
            }
          }
        }
      }
    });
  }, [editor]);

  useEffect(() => {
    document.addEventListener("selectionchange", updatePopup);
    return () => {
      document.removeEventListener("selectionchange", updatePopup);
    };
  }, [updatePopup]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updatePopup();
      }),
      editor.registerRootListener(() => {
        if (editor.getRootElement() === null) {
          setIsText(false);
        }
      }),
    );
  }, [editor, updatePopup]);

  if (!isText || isLinkEditMode) {
    return null;
  }

  return createPortal(
    <FloatingTextFormatToolbar
      editor={editor}
      anchorElem={anchorElem}
      blockType={blockType}
      isBold={isBold}
      isItalic={isItalic}
      isUnderline={isUnderline}
      isLink={isLink}
      isCode={isCode}
      setIsLinkEditMode={setIsLinkEditMode}
      // isStrikethrough={isStrikethrough}
      // isSubscript={isSubscript}
      // isSuperscript={isSuperscript}
    />,
    anchorElem,
  );
}
