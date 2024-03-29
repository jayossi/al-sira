"use client";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TooltipProvider } from "@/components/plate-ui/tooltip";

import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { Plate, Value } from "@udecode/plate-common";
import { createPlateUI } from "@/lib/create-plate-ui";
import {
  createPlugins,
  RenderAfterEditable
} from "@udecode/plate-common";
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from "@udecode/plate-paragraph";
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3
} from "@udecode/plate-heading";
import {
  createHorizontalRulePlugin
} from "@udecode/plate-horizontal-rule";
import { createLinkPlugin } from "@udecode/plate-link";
import {
  createListPlugin
} from "@udecode/plate-list";
import { createCaptionPlugin } from "@udecode/plate-caption";
import {
  createBoldPlugin, createItalicPlugin, createUnderlinePlugin, createStrikethroughPlugin, createSubscriptPlugin, createSuperscriptPlugin
} from "@udecode/plate-basic-marks";
import {
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createFontSizePlugin,
} from "@udecode/plate-font";
import {
  createHighlightPlugin
} from "@udecode/plate-highlight";
import { createKbdPlugin } from "@udecode/plate-kbd";
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
  createDeletePlugin
} from "@udecode/plate-select";
import { createTabbablePlugin } from "@udecode/plate-tabbable";
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { createDeserializeDocxPlugin } from "@udecode/plate-serializer-docx";
import { createDeserializeCsvPlugin } from "@udecode/plate-serializer-csv";
import { createDeserializeMdPlugin } from "@udecode/plate-serializer-md";
import { createJuicePlugin } from "@udecode/plate-juice";
import { LinkFloatingToolbar } from "@/components/plate-ui/link-floating-toolbar";
import { useState } from "react";
import { DndProvider } from "react-dnd";

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

    createDeletePlugin(),
    createSoftBreakPlugin({
      options: {
        rules: [{ hotkey: "shift+enter" }],
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
    components: createPlateUI({}, { draggable: true }),
  }
);

function PlateEditor() {
  const [debugValue, setDebugValue] = useState<Value>(initialResumeValue);

  return (
    <TooltipProvider>
      <DndProvider backend={HTML5Backend}>
        <Plate
          plugins={plugins}
          initialValue={initialResumeValue}
          onChange={(newValue) => {
            setDebugValue(newValue);
            console.log(newValue);
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
      </DndProvider>
    </TooltipProvider>
  );
}

export default PlateEditor;

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
