// types.ts
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
  type: "paragraph";
  align: string;
  children: CustomText[];
};
export type HeadingElement = {
  type: "heading";
  level: number;
  align: string;

  children: CustomText[];
};
export type SubHeadingElement = {
  type: "subheading";
  align: string;

  children: CustomText[];
};

export type CodeElement = {
  type: "code";
  align: string;

  children: CustomText[];
};

export type ListElement = {
  type: "list";
  align: string;

  children: CustomText[];
};
export type CustomElement =
  | CodeElement
  | ParagraphElement
  | HeadingElement
  | SubHeadingElement
  | ListElement;

export type FormattedText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
};

export type CustomText = FormattedText;
export type CustomNode = CustomElement | CustomText;

export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
