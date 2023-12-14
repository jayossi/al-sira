"use client";
import {
  createPlugins,
  Plate,
  PlateContent,
  useEditorState,
  useEditorRef,
} from "@udecode/plate-common";
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from "@udecode/plate-paragraph";

import { ParagraphElement } from "@/components/plate-ui/paragraph-element";

import { serializeHtml } from "@udecode/plate-serializer-html";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createNodeIdPlugin } from "@udecode/plate-node-id";
import { createDndPlugin } from "@udecode/plate-dnd";

export default function Editor() {
  const plugins = createPlugins(
    [createParagraphPlugin(), createNodeIdPlugin(), createDndPlugin()],
    {
      components: {
        [ELEMENT_PARAGRAPH]: ParagraphElement,
      },
    },
  );

  const initialValue = [
    {
      id: "1",
      type: "p",
      children: [{ text: "Hello, World!" }],
    },
  ];

  const EditorComponent = () => {
    const editor = useEditorRef();

    // function serialize() {
    const serialize = () => {
      // const html = serializeHtml(editor, { nodes: editor.children });
      const html = serializeHtml(editor, {
        nodes: editor.children,
        // if you use @udecode/plate-dnd
        dndWrapper: (props) => (
          <DndProvider backend={HTML5Backend} {...props} />
        ),
      });

      console.log("html content:", html);
    };

    return (
      <>
        <button onClick={serialize}>Click to Serialize to HTML</button>
      </>
    );
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Plate plugins={plugins} initialValue={initialValue}>
          <PlateContent />

          <EditorComponent />
        </Plate>
      </DndProvider>
    </>
  );
}
