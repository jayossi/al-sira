import React from "react";
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import {
  MARK_COLOR,
  MARK_BG_COLOR,
  MARK_FONT_SIZE,
  MARK_FONT_FAMILY,
} from "@udecode/plate-font";
import { useEditorReadOnly } from "@udecode/plate-common";

import { Icons, iconVariants } from "@/components/icons";

import { InsertDropdownMenu } from "./insert-dropdown-menu";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { ModeDropdownMenu } from "./mode-dropdown-menu";
import { ToolbarButton, ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";
import { ColorDropdownMenu } from "./color-dropdown-menu";
import {
  ELEMENT_OL,
  ELEMENT_UL,
  useListToolbarButton,
  useListToolbarButtonState,
} from "@udecode/plate-list";

function saveHTML() {
  console.log("saveHTML");
}


export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          transform: "translateX(calc(-1px))",
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}>
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Italic (⌘+I)" nodeType={MARK_ITALIC}>
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                tooltip="Underline (⌘+U)"
                nodeType={MARK_UNDERLINE}
              >
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                tooltip="Strikethrough (⌘+⇧+M)"
                nodeType={MARK_STRIKETHROUGH}
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
              
            </ToolbarGroup>

            <ToolbarGroup>
              <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Text Color">
                <Icons.color className={iconVariants({ variant: "toolbar" })} />
              </ColorDropdownMenu>
              <ColorDropdownMenu
                nodeType={MARK_BG_COLOR}
                tooltip="Highlight Color"
              >
                <Icons.bg className={iconVariants({ variant: "toolbar" })} />
              </ColorDropdownMenu>
            </ToolbarGroup>
            <ToolbarGroup>
              <ListToolbarButton nodeType={ELEMENT_UL} />
              <ListToolbarButton nodeType={ELEMENT_OL} />
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

        <ToolbarGroup noSeparator>
          <ModeDropdownMenu />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarButton onClick={saveHTML} tooltip="Save file as HTML">
            <Icons.download />
          </ToolbarButton>
        </ToolbarGroup>
      </div>
    </div>
  );
}

export function ListToolbarButton({
  nodeType = ELEMENT_UL,
}: {
  nodeType?: string;
}) {
  const state = useListToolbarButtonState({ nodeType });
  const { props } = useListToolbarButton(state);

  return (
    <ToolbarButton
      tooltip={nodeType === ELEMENT_UL ? "Bulleted List" : "Numbered List"}
      {...props}
    >
      {nodeType === ELEMENT_UL ? <Icons.ul /> : <Icons.ol />}
    </ToolbarButton>
  );
}
