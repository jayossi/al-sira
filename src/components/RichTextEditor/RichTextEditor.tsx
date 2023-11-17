// src/components/RichTextEditor/RichTextEditor.tsx
import React, { useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Editor, Transforms, Element } from "slate";

// TypeScript users only add this code
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

type ParagraphElement = { type: "paragraph"; children: CustomText[] };
type CodeElement = { type: "code"; children: CustomText[] };
type CustomElement = ParagraphElement | CodeElement;
type CustomText = { text: string };
type CustomNode = CustomElement | CustomText;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
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

  const renderElement = (props: any) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  };
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (event.key === "8" && event.ctrlKey) {
            event.preventDefault();
            const [match] = Editor.nodes(editor, {
              match: (n) => Element.isElement(n) && n.type === 'code',
            });
            Transforms.setNodes(
              editor,
              { type: match ? "paragraph" : "code" },
              {
                match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
              }
            );
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
