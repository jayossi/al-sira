// src/components/RichTextEditor/RichTextEditor.tsx
import React, { useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const RichTextEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ];

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable  onKeyDown={event => {
        console.log(event.key)
        if(event.key === '&'){
            event.preventDefault()
            editor.insertText('and')
        }
      }}/>
    </Slate>
  );
};

export default RichTextEditor;
