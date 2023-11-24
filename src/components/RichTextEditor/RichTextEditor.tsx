"use client";

import React, { useCallback, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
// TypeScript users only add this code
import { Descendant } from "slate";
import { Leaf, Element } from "./Elements";
import { ToolBar, toolbarIcons, onKeyDown, CEditor } from "./utils";
import { withHistory } from "slate-history";
import { initialResumeTemplate } from "./template";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
    align: "left",
  },
];

const RichTextEditor = () => {
  const [editor] = useState(() => withReact(withHistory(createEditor())));

  const renderElement = useCallback((props: any) => {
    return <Element {...props} />;
  }, []);
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);
  return (
    <Slate editor={editor} initialValue={initialResumeTemplate}>
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

