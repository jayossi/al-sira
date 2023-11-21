// types.ts
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};
export type HeadingElement = {
  type: "heading";
  level: number;
  children: CustomText[];
};
export type CodeElement = {
  type: "code";
  children: CustomText[];
};

export type ListElement = {
  type: "list";
  children: CustomText[];
};
export type CustomElement = CodeElement | ParagraphElement | HeadingElement | ListElement;

export type FormattedText = { text: string; bold?: true, italic?: true, underline?: true};

export type CustomText = FormattedText;
export type CustomNode = CustomElement | CustomText;
