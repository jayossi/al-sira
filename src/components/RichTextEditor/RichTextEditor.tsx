"use client";

import React, { useCallback, useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
// TypeScript users only add this code
import { Descendant } from "slate";
import { Leaf, Element } from "./Elements";
import { ToolBar, toolbarIcons, onKeyDown, CEditor } from "./utils";
import { withHistory } from "slate-history";
import "./richtexteditor.css";
import { serialize } from "./serializer";

const RichTextEditor = () => {
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const storedContent = localStorage.getItem("content");
  const initialResumeTemplate: Descendant[] = useMemo(
    () => (storedContent ? JSON.parse(storedContent) : initialResumeTemplate),
    []
  );

  const renderElement = useCallback((props: any) => {
    return <Element {...props} />;
  }, []);
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);
  return (
    <div className="editable-container">
      <Slate editor={editor} initialValue={initialResumeTemplate}>
        <div className="toolbar-container">
          <ToolBar>{toolbarIcons(editor)}</ToolBar>
        </div>
        <Editable
          className="editor-container"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => onKeyDown(event, editor)}
          onChange={(value) => {
            const isAstChange = editor.operations.some(
              (op) => "set_selection" !== op.type
            );
            if (isAstChange) {
              // Save the value to Local Storage.
              const content = serialize(value);
              localStorage.setItem("content", content);
            }
          }}
        />
      </Slate>
    </div>
  );
};

export default RichTextEditor;
