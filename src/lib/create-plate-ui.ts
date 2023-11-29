import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";

import {
  PlateElement,
  PlateLeaf,
  PlatePluginComponent,
  withProps,
} from "@udecode/plate-common";
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate-heading";
import { MARK_HIGHLIGHT } from "@udecode/plate-highlight";
import { ELEMENT_HR } from "@udecode/plate-horizontal-rule";
import { MARK_KBD } from "@udecode/plate-kbd";
import { ELEMENT_LINK } from "@udecode/plate-link";
import {
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_UL,
} from "@udecode/plate-list";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";


import { HeadingElement } from "@/components/plate-ui/heading-element";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";
import { HrElement } from "@/components/plate-ui/hr-element";
import { KbdLeaf } from "@/components/plate-ui/kbd-leaf";
import { LinkElement } from "@/components/plate-ui/link-element";
import { ListElement } from "@/components/plate-ui/list-element";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";
import { withPlaceholders } from "@/components/plate-ui/placeholder";
import { withDraggables } from "@/components/plate-ui/with-draggables";

export const createPlateUI = (
  overrideByKey?: Partial<Record<string, PlatePluginComponent>>,
  {
    draggable,
    placeholder,
  }: { placeholder?: boolean; draggable?: boolean } = {}
) => {
  let components: Record<string, PlatePluginComponent> = {
    [ELEMENT_HR]: HrElement,
    [ELEMENT_H1]: withProps(HeadingElement, { variant: "h1" }),
    [ELEMENT_H2]: withProps(HeadingElement, { variant: "h2" }),
    [ELEMENT_H3]: withProps(HeadingElement, { variant: "h3" }),
    [ELEMENT_H4]: withProps(HeadingElement, { variant: "h4" }),
    [ELEMENT_H5]: withProps(HeadingElement, { variant: "h5" }),
    [ELEMENT_H6]: withProps(HeadingElement, { variant: "h6" }),
    [ELEMENT_LI]: withProps(PlateElement, { as: "li" }),
    [ELEMENT_LINK]: LinkElement,
    [ELEMENT_UL]: withProps(ListElement, { variant: "ul" }),
    [ELEMENT_OL]: withProps(ListElement, { variant: "ol" }),
    [ELEMENT_PARAGRAPH]: ParagraphElement,
    [MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
    [MARK_HIGHLIGHT]: HighlightLeaf,
    [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
    [MARK_KBD]: KbdLeaf,
    [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
    [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: "sub" }),
    [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: "sup" }),
    [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
  };

  if (overrideByKey) {
    Object.keys(overrideByKey).forEach((key) => {
      (components as any)[key] = (overrideByKey as any)[key];
    });
  }

  if (placeholder) {
    components = withPlaceholders(components);
  }
  if (draggable) {
    components = withDraggables(components);
  }

  return components;
};
