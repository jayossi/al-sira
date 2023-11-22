import { Flex, Divider } from "@aws-amplify/ui-react";
import { Editor, Transforms, Element } from "slate";
import { IconButton } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
  List,
  Link,
  LooksTwo,
  LooksOne,
  FormatSize,
  Undo,
  Redo,
} from "@mui/icons-material";
import { CustomEditor, HeadingElement, TEXT_ALIGN_TYPES } from "./types";

export function ToolBar(props: any) {
  return (
    <Flex direction="row" wrap="nowrap" gap="1rem" backgroundColor="#171718">
      {props.children}
    </Flex>
  );
}

export const onKeyDown = (event: any, editor: any) => {
  if (!event.ctrlKey) {
    return;
  }
  event.preventDefault();

  switch (event.key) {
    case "b": {
      CEditor.toggleBoldMark(editor);
      break;
    }

    case "i": {
      CEditor.toggleItalic(editor);
      break;
    }

    case "u": {
      CEditor.toggleUnderline(editor);
      break;
    }

    case "l": {
      CEditor.toggleList(editor);
      break;
    }
    case "z": {
      editor.undo();
      break;
    }
    case "y": {
      editor.redo();
      break;
    }
    default: {
      break;
    }
  }
};

export const CEditor = {
  isBoldMarkActive(editor: any) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },
  isItalicMarkActive(editor: any) {
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },
  isUnderlineMarkActive(editor: any) {
    const marks = Editor.marks(editor);
    return marks ? marks.underline === true : false;
  },
  isCodeBlockActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "code",
    });
    return !!match;
  },
  isListActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "list",
    });
    return !!match;
  },
  isH1BlockActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "heading",
    });
    return !!match;
  },
  isH2BlockActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "subheading",
    });
    return !!match;
  },
  getCurrentHeadingType(editor: any) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "list",
    });
    return !!match;
  },
  toggleBoldMark(editor: any) {
    const isActive = CEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },
  toggleUnderline(editor: any) {
    const isActive = CEditor.isUnderlineMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "underline");
    } else {
      Editor.addMark(editor, "underline", true);
    }
  },
  toggleItalic(editor: any) {
    const isActive = CEditor.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
  },
  toggleCodeBlock(editor: any) {
    const isActive = CEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : "code" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  },
  toggleList(editor: any) {
    const isActive = CEditor.isListActive(editor);

    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : "list" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  },
  toggleH1Block(editor: any) {
    const isActive = CEditor.isH1BlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : "heading", level: 1 },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  },
  toggleH2Block(editor: any) {
    const isActive = CEditor.isH2BlockActive(editor);
    Transforms.setNodes(
      editor,
      {
        type: isActive ? undefined : "subheading",
      },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  },
  alignToSide(editor: any, side: string = "right") {
    if (!TEXT_ALIGN_TYPES.includes(side)) {
      return;
    }
    let newproperties: Partial<Element>;
    newproperties = {
      align: side,
    };
    Transforms.setNodes<Element>(editor, newproperties, {
      match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
    });
  },
};

export const toolbarIcons = (editor: CustomEditor) => {
  return (
    <>
      <IconButton
        onPointerDown={(e) => {
          editor.undo();
        }}
        style={{ color: "grey" }}
      >
        <Undo />
      </IconButton>
      <IconButton
        onPointerDown={(e) => {
          editor.redo();
        }}
        style={{ color: "grey" }}
      >
        <Redo />
      </IconButton>
      <IconButton
        onPointerDown={(e) => {
          CEditor.toggleBoldMark(editor);
        }}
        style={{ color: "grey" }}
      >
        <FormatBold />
      </IconButton>
      <IconButton
        onPointerDown={(e) => {
          CEditor.toggleItalic(editor);
        }}
        style={{ color: "grey" }}
      >
        <FormatItalic />
      </IconButton>
      <IconButton
        onPointerDown={(e) => {
          CEditor.toggleUnderline(editor);
        }}
        style={{ color: "grey" }}
      >
        <FormatUnderlined />
      </IconButton>
      <IconButton
        onPointerDown={(e) => {
          CEditor.toggleList(editor);
        }}
        style={{ color: "grey" }}
      >
        <List />
      </IconButton>
      <IconButton
        onPointerDown={(e) => {
          CEditor.toggleH2Block(editor);
        }}
        style={{ color: "grey" }}
      >
        <LooksOne />
      </IconButton>
      <IconButton style={{ color: "grey" }}>
        <FormatSize />
      </IconButton>
      <IconButton
        onPointerDown={(e) => {
          CEditor.toggleH1Block(editor);
        }}
        style={{ color: "grey" }}
      >
        <LooksTwo />
      </IconButton>
      
    </>
  );
};
