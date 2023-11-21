// src/components/RichTextEditor/RichTextEditor.tsx
import React, { useCallback, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { CustomText, CustomNode, CustomElement, CustomEditor } from "./types";
// TypeScript users only add this code
import { Descendant } from "slate";
import {
  HeadingElement,
  SubHeadingElement,
  ListElement,
  CodeElement,
  Leaf,
  DefaultElement,
  SubSubHeadingElement,
} from "./Elements";
import { ToolBar, toolbarIcons, onKeyDown, CEditor } from "./utils";

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
    Node: CustomNode;
  }
}

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
      case "list":
        return <ListElement {...props} />;
      case "heading":
        return <HeadingElement {...props} />;
      case "subheading":
        return <SubHeadingElement {...props} />;
      case "subsubheading":
        return <SubSubHeadingElement {...props} />;
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
        <ToolBar>{toolbarIcons(editor)}</ToolBar>
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => onKeyDown(event, editor)}
      />
    </Slate>
  );
};

export default RichTextEditor;
