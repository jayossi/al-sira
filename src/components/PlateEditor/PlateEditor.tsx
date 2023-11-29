"use client";

import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { Plate, PlateContent, Value } from "@udecode/plate-common";
import { createPlateUI } from "@/lib/create-plate-ui";
import {
  createPlugins,
  RenderAfterEditable,
  withProps,
  PlateElement,
  PlateLeaf,
} from "@udecode/plate-common";
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from "@udecode/plate-paragraph";
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate-heading";
import {
  createHorizontalRulePlugin,
  ELEMENT_HR,
} from "@udecode/plate-horizontal-rule";
import { createLinkPlugin, ELEMENT_LINK } from "@udecode/plate-link";
import {
  createListPlugin,
  ELEMENT_UL,
  ELEMENT_OL,
  ELEMENT_LI,
} from "@udecode/plate-list";
import { createCaptionPlugin } from "@udecode/plate-caption";
import {
  createBoldPlugin,
  MARK_BOLD,
  createItalicPlugin,
  MARK_ITALIC,
  createUnderlinePlugin,
  MARK_UNDERLINE,
  createStrikethroughPlugin,
  MARK_STRIKETHROUGH,
  createSubscriptPlugin,
  MARK_SUBSCRIPT,
  createSuperscriptPlugin,
  MARK_SUPERSCRIPT,
} from "@udecode/plate-basic-marks";
import {
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createFontSizePlugin,
} from "@udecode/plate-font";
import {
  createHighlightPlugin,
  MARK_HIGHLIGHT,
} from "@udecode/plate-highlight";
import { createKbdPlugin, MARK_KBD } from "@udecode/plate-kbd";
import { createAlignPlugin } from "@udecode/plate-alignment";
import { createIndentPlugin } from "@udecode/plate-indent";
import { createLineHeightPlugin } from "@udecode/plate-line-height";
import { createBlockSelectionPlugin } from "@udecode/plate-selection";
import { createComboboxPlugin } from "@udecode/plate-combobox";
import { createDndPlugin } from "@udecode/plate-dnd";
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from "@udecode/plate-break";
import { createNodeIdPlugin } from "@udecode/plate-node-id";
import { createResetNodePlugin } from "@udecode/plate-reset-node";
import {
  createSelectOnBackspacePlugin,
  createDeletePlugin,
} from "@udecode/plate-select";
import { createTabbablePlugin } from "@udecode/plate-tabbable";
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { createDeserializeDocxPlugin } from "@udecode/plate-serializer-docx";
import { createDeserializeCsvPlugin } from "@udecode/plate-serializer-csv";
import { createDeserializeMdPlugin } from "@udecode/plate-serializer-md";
import { createJuicePlugin } from "@udecode/plate-juice";
import { HrElement } from "@/components/plate-ui/hr-element";
import { LinkElement } from "@/components/plate-ui/link-element";
import { LinkFloatingToolbar } from "@/components/plate-ui/link-floating-toolbar";
import { HeadingElement } from "@/components/plate-ui/heading-element";
import { ListElement } from "@/components/plate-ui/list-element";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";
import { KbdLeaf } from "@/components/plate-ui/kbd-leaf";
import { withPlaceholders } from "@/components/plate-ui/placeholder";
import { useState } from "react";

const plugins = createPlugins(
  [
    createParagraphPlugin(),
    createHeadingPlugin(),
    createHorizontalRulePlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createListPlugin(),
    createCaptionPlugin({
      options: {
        pluginKeys: [
          // ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
        ],
      },
    }),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
    createKbdPlugin(),
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
        },
      },
    }),
    createIndentPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
          ],
        },
      },
    }),
    createLineHeightPlugin({
      inject: {
        props: {
          defaultNodeValue: 1.5,
          validNodeValues: [1, 1.2, 1.5, 2, 3],
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
          ],
        },
      },
    }),
    createBlockSelectionPlugin({
      options: {
        sizes: {
          top: 0,
          bottom: 0,
        },
      },
    }),
    createComboboxPlugin(),
    createDndPlugin({
      options: { enableScroller: true },
    }),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: "mod+enter",
          },
          {
            hotkey: "mod+shift+enter",
            before: true,
          },
          {
            hotkey: "enter",
            query: {
              start: true,
              end: true,
              // allow: KEYS_HEADING,
            },
            relative: true,
            level: 1,
          },
        ],
      },
    }),
    createNodeIdPlugin(),
    createResetNodePlugin({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/reset-node
        ],
      },
    }),
    createSelectOnBackspacePlugin({
      options: {
        query: {
          allow: [
            // ELEMENT_IMAGE, ELEMENT_HR
          ],
        },
      },
    }),
    createDeletePlugin(),
    createSoftBreakPlugin({
      options: {
        rules: [
          { hotkey: "shift+enter" },
          {
            hotkey: "enter",
            query: {
              allow: [
                // ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD
              ],
            },
          },
        ],
      },
    }),
    createTabbablePlugin(),
    createTrailingBlockPlugin({
      options: { type: ELEMENT_PARAGRAPH },
    }),
    createDeserializeDocxPlugin(),
    createDeserializeCsvPlugin(),
    createDeserializeMdPlugin(),
    createJuicePlugin(),
  ],
  {
    components: createPlateUI(),
  }
);

function PlateEditor() {
  const [debugValue, setDebugValue] = useState<Value>(initialResumeValue);

  return (
    <Plate
      plugins={plugins}
      initialValue={initialResumeValue}
      onChange={(newValue) => {
        setDebugValue(newValue);
        // save newValue...
      }}
    >
      <FixedToolbar>
        <FixedToolbarButtons />
      </FixedToolbar>

      <Editor />

      <FloatingToolbar>
        <FloatingToolbarButtons />
      </FloatingToolbar>
    </Plate>
  );
}

export default PlateEditor;

export const basicEditorValue = [
  {
    type: "h1",
    children: [
      {
        text: "🌳 Blocks",
      },
    ],
    id: "1",
  },
  {
    type: "p",
    children: [
      {
        text: "Easily create headings of various levels, from H1 to H6, to structure your content and make it more organized.",
      },
    ],
    id: "2",
  },
  {
    type: "blockquote",
    children: [
      {
        text: "Create blockquotes to emphasize important information or highlight quotes from external sources.",
      },
    ],
    id: "3",
  },
  {
    type: "code_block",
    lang: "javascript",
    children: [
      {
        type: "code_line",
        children: [
          {
            text: "// Use code blocks to showcase code snippets",
          },
        ],
      },
      {
        type: "code_line",
        children: [
          {
            text: "function greet() {",
          },
        ],
      },
      {
        type: "code_line",
        children: [
          {
            text: "  console.info('Hello World!');",
          },
        ],
      },
      {
        type: "code_line",
        children: [
          {
            text: "}",
          },
        ],
      },
    ],
    id: "4",
  },
  {
    type: "h1",
    children: [
      {
        text: "🌱 Marks",
      },
    ],
    id: "1",
  },
  {
    type: "p",
    children: [
      {
        text: "Add style and emphasis to your text using the mark plugins, which offers a variety of formatting options.",
      },
    ],
    id: "2",
  },
  {
    type: "p",
    children: [
      {
        text: "Make text ",
      },
      {
        text: "bold",
        bold: true,
      },
      {
        text: ", ",
      },
      {
        text: "italic",
        italic: true,
      },
      {
        text: ", ",
      },
      {
        text: "underlined",
        underline: true,
      },
      {
        text: ", or apply a ",
      },
      {
        text: "combination",
        bold: true,
        italic: true,
        underline: true,
      },
      {
        text: " of these styles for a visually striking effect.",
      },
    ],
    id: "3",
  },
  {
    type: "p",
    children: [
      {
        text: "Add ",
      },
      {
        text: "strikethrough",
        strikethrough: true,
      },
      {
        text: " to indicate deleted or outdated content.",
      },
    ],
    id: "4",
  },
  {
    type: "p",
    children: [
      {
        text: "Write code snippets with inline ",
      },
      {
        text: "code",
        code: true,
      },
      {
        text: " formatting for easy readability.",
      },
    ],
    id: "5",
  },
  {
    type: "p",
    children: [
      {
        text: "Press ",
      },
      {
        text: "⌘+B",
        kbd: true,
      },
      {
        text: " to apply bold mark or ",
      },
      {
        text: "⌘+I",
        kbd: true,
      },
      {
        text: " for italic mark.",
      },
    ],
    id: "6",
  },
];

export const initialResumeValue = [
  {
    type: "h1",
    children: [
      {
        text: "Firstname Lastname",
      },
    ],
    id: "1",
    align: "center",
  },
  {
    type: "p",
    children: [
      {
        text: "City, Country | phone number | email | website link",
      },
    ],
    id: "2",
    align: "center",
  },
  {
    type: "h2",
    children: [
      {
        text: "Education",
      },
    ],
    id: "3",
    align: "left",
  },
  {
    type: "hr",
    children: [{ text: "" }],
    id: "4",
  },
  {
    type: "p",
    children: [
      {
        text: "University: The University of Life",
      },
    ],
    id: "5",
  },
  {
    type: "p",
    children: [
      {
        text: "Degree: Bachelor of Science in Life",
      },
    ],
    id: "6",
  },
  {
    type: "h2",
    children: [
      {
        text: "Experience",
      },
    ],
    id: "7",
  },
  {
    type: "hr",
    children: [{ text: "" }],
  },
  {
    type: "p",
    children: [
      {
        text: "Company: Life Inc.",
      },
    ],
    id: "8",
  },
  {
    type: "p",
    children: [
      {
        text: "Role: Life Coach",
      },
    ],
    id: "9",
  },
  {
    type: "ul",
    children: [
      { type: "li", children: [{ text: "Item 1" }] },
      { type: "li", children: [{ text: "Item 2" }] },
    ],
    id: "10",
  },
  {
    type: "p",
    children: [
      {
        text: "  ",
      },
    ],
  },
  {
    type: "p",
    children: [
      {
        text: "Company: Death Inc.",
      },
    ],
    id: "11",
  },
  {
    type: "p",
    children: [
      {
        text: "Role: Death Coach",
      },
    ],
    id: "12",
  },
  {
    type: "h2",
    children: [
      {
        text: "Project Experience",
      },
    ],
    id: "13",
  },
  {
    type: "hr",
    children: [{ text: "" }],
  },
  {
    type: "p",
    children: [
      {
        text: "Organization: Life Inc.",
      },
    ],
    id: "14",
  },
  {
    type: "p",
    children: [
      {
        text: "Title: Founder",
      },
    ],
    id: "15",
  },
  {
    type: "p",
    children: [
      {
        text: "  ",
        height: "2px",
      },
    ],
    id: "16",
  },
  {
    type: "p",
    children: [
      {
        text: "Organization: Death Inc.",
      },
    ],
    id: "17",
  },
  {
    type: "p",
    children: [
      {
        text: "Title: Reaper",
      },
    ],
    id: "18",
  },
  { type: "h3", children: [{ text: "Skills & Interests" }], id: "19" },
  { type: "hr", children: [{ text: "" }] },
  { type: "p", children: [{ text: "Skill: Life Coaching" }], id: "20" },
  {
    type: "p",
    children: [{ text: "Interests: Death Coaching", bold: true }],
    id: "21",
  },
];
