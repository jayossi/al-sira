// types.ts
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
  type: "paragraph";
  align?: string;
  children: Descendant[];
};
export type HeadingElement = {
  type: "heading";
  align: string;

  children: Descendant[];
};
export type SubHeadingElement = {
  type: "subheading";
  align: string;

  children: Descendant[];
};

export type CodeElement = {
  type: "code";
  align: string;

  children: CustomText[];
};

export type ListElement = {
  type: "list";
  align: string;

  children: Descendant[];
};
export type SectionElement = {
  type: "section";
  children: CustomNode[];
};

export type SectionTitleElement = {
  type: "section_title";
  children: CustomNode[];
};

export type SectionSubtitleElement = {
  type: "section_subtitle";
  children: CustomNode[];
};

export type SubsectionTitleElement = {
  type: "subsection_title";
  children: CustomNode[];
};

export type SubsectionSubtitleElement = {
  type: "subsection_subtitle";
  children: CustomNode[];
};

export type BulletpointElement = {
  type: "bulletpoint";
  children: CustomNode[];
};

export type TitleElement = { type: 'title'; children: Descendant[] }
export type subtitleElement = { type: 'subtitle'; children: Descendant[] }
export type CustomElement =
  | CodeElement
  | ParagraphElement
  | HeadingElement
  | SubHeadingElement
  | ListElement
  | TitleElement
  | subtitleElement
  | SectionElement
  | SectionTitleElement
  | SectionSubtitleElement
  | SubsectionTitleElement
  | SubsectionSubtitleElement
  | BulletpointElement;

export type FormattedText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
};



export type CustomText = FormattedText;
export type CustomNode = CustomElement | CustomText;

export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];


declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
    Node: CustomNode;
  }
}