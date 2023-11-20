// src/components/RichTextEditor/RichTextEditor.tsx
import React, { useCallback, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Editor, Transforms, Element } from "slate";
import { CustomText, CustomNode, CustomElement, CustomEditor } from "./types";
// TypeScript users only add this code
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
    Node: CustomNode;
  }
}

const CEditor = {
  isBoldMarkActive(editor: any) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },
  isCodeBlockActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "code",
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

  toggleCodeBlock(editor: any) {
    const isActive = CEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : "code" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  },
};
const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

const RichTextEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <div>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CEditor.toggleBoldMark(editor)
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CEditor.toggleCodeBlock(editor)
          }}
        >
          Code Block
        </button>
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) return;
          switch (event.key) {
            case "8": {
              event.preventDefault();
              CEditor.toggleCodeBlock(editor);
            }
            case "b": {
              event.preventDefault();
              CEditor.toggleBoldMark(editor);
              break;
            }
            case "i": {
              event.preventDefault();
              Editor.addMark(editor, "italic", true);
              break;
            }
            case "u": {
              event.preventDefault();
              Editor.addMark(editor, "underline", true);
              break;
            }
          }
        }}
      />
    </Slate>
  );
};

export default RichTextEditor;

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
};

// Define a React component to render leaves with bold text.
const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration: props.leaf.underline ? "underline" : "none",
      }}
    >
      {props.children}
    </span>
  );
};
