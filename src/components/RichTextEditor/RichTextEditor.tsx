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
import { initialResumeTemplate } from "./template";
import { serializeHTML, deserializeHTML } from "./serializer";

const RichTextEditor = () => {
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const initialValue: Descendant[] = useMemo(() => {
    const storedContent = localStorage.getItem("content");
    const content = storedContent
      ? deserializeHTML(storedContent)
      : initialResumeTemplate;
  
    return content;
  }, []);
  
  const renderElement = useCallback((props: any) => {
    return <Element {...props} />;
  }, []);
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);
  1;
  return (
    <div className="editable-container">
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          //meaning that the user has changed the content of editor except for the selection
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (isAstChange) {
            const content = serializeHTML(value);
            localStorage.setItem("content", content);
          }
        }}
      >
        <div className="toolbar-container">
          <ToolBar>{toolbarIcons(editor)}</ToolBar>
        </div>
        <Editable
          className="editor-container"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => onKeyDown(event, editor)}
        />
      </Slate>
    </div>
  );
};

export default RichTextEditor;
