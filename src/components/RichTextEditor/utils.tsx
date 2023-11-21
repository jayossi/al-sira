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
  Add,
  Remove,
  FormatSize,
} from "@mui/icons-material";
import { CustomEditor, HeadingElement } from "./types";
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

    // case "l": {
    //   formatList();
    //   break;
    // }

    // case "h": {
    //   formatTitle();
    //   break;
    // }

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
  increaseHeadingLevel(editor: any) {
    const currentHeading = CEditor.getCurrentHeadingType(editor);
    console.log(currentHeading)
    
  },
  decreaseHeadingLevel(editor: any) {
    const currentHeading = CEditor.getCurrentHeadingType(editor);
    console.log(currentHeading)
    
  }
};

export const toolbarIcons = (editor: CustomEditor) => {
  return (
    <>
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
          CEditor.decreaseHeadingLevel(editor);
        }}
        style={{ color: "grey" }}
      >
        <Remove />
      </IconButton>

      <IconButton
        onPointerDown={(e) => {
          CEditor.toggleList(editor);
        }}
        style={{ color: "grey" }}
      >
        <FormatSize />
      </IconButton>

      <IconButton
        onPointerDown={(e) => {
          CEditor.increaseHeadingLevel(editor);
        }}
        style={{ color: "grey" }}
      >
        <Add />
      </IconButton>
    </>
  );
};

