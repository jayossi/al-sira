import { Editor, Transforms, Node, Element as SlateElement, Descendant } from "slate";
import { CustomEditor, ParagraphElement, TitleElement } from "./types";

export const simpleParagraph = () => {
  return {
    type: "paragraph",
    children: [{ text: "" }],
    align: "left",
  };
};

export const renderSectionPlaceholder = (
  editor: CustomEditor,
  sectionName: string = "job_experience"
) => {
  const section = resumeInfo[sectionName as keyof typeof resumeInfo];
  const { normalizeNode } = editor;
  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      if (editor.children.length <= 1 && Editor.string(editor, [0, 0]) === "") {
        const title: TitleElement = {
          type: "title",
          children: [{ text: section.title }],
        };
        Transforms.insertNodes(editor, title, {
          at: path.concat(0),
          select: true,
        });
      }
      if (editor.children.length < 2) {
        const paragraph: ParagraphElement = {
          type: "paragraph",
          children: [{ text: section.subtitle1 }],
        };
        Transforms.insertNodes(editor, paragraph, { at: path.concat(1) });
      }
      if (editor.children.length < 3) {
        const paragraph: ParagraphElement = {
          type: "paragraph",
          children: [{ text: section.subtitle2 }],
        };
        Transforms.insertNodes(editor, paragraph, { at: path.concat(2) });
      }
      for (const [child, childPath] of Node.children(editor, path)) {
        let type: string;
        const slateIndex = childPath[0];
        const enforceType = (type: any) => {
          if (SlateElement.isElement(child) && child.type !== type) {
            const newProperties: Partial<SlateElement> = { type };
            Transforms.setNodes<SlateElement>(editor, newProperties, {
              at: childPath,
            });
          }
        };

        switch (slateIndex) {
          case 0:
            type = "title";
            enforceType(type);
            break;
          case 1:
            type = "paragraph";
            enforceType(type);
          default:
            break;
        }
      }
    }

    return normalizeNode([node, path]);
  };
};

const resumeInfo = {
  job_experience: {
    title: "Job Experience",
    subtitle1: "Country",
    subtitle2: "Job Title",
  },
  project_experience: {
    title: "Project Experience",
    subtitle1: "Country",
    subtitle2: "Project Title",
  },
};


export const initialResumeTemplate: Descendant[] = [
    {
      type: "title",
      children: [{ text: "Firstname Lastname" }],
    },
    {
      type: "subtitle",
      children: [{ text: "City, Country | phone number | email | website link" }],
    },
    {
      type: "section",
      children: [
        {
          type: "section_title",
          children: [{ text: "Education" }],
        },
        {
          type: "section_subtitle",
          children: [{ text: "University, city, country" }],
        },
        {
          type: "section_subtitle",
          children: [{ text: "Degree, graduation date" }],
        },
      ],
    },
    {
      type: "section",
      children: [
        {
          type: "section_title",
          children: [{ text: "Work Experience" }],
        },
        {
          type: "subsection_title",
          children: [{ text: "Company, city, country" }],
        },
        {
          type: "subsection_subtitle",
          children: [{ text: "Job Title, Start - finish" }],
        },
        {
          type: "bulletpoint",
          children: [{ text: "bulletpoint_1" }],
        },
        {
          type: "bulletpoint",
          children: [{ text: "bulletpoint_2" }],
        },
        // Add more bulletpoints as needed
      ],
    },
    {
      type: "section",
      children: [
        {
          type: "section_title",
          children: [{ text: "Project Experience" }],
        },
        {
          type: "subsection_title",
          children: [{ text: "Organization, city, country" }],
        },
        {
          type: "subsection_subtitle",
          children: [{ text: "Job Title, start - finish" }],
        },
        {
          type: "bulletpoint",
          children: [{ text: "bulletpoint_1" }],
        },
        {
          type: "bulletpoint",
          children: [{ text: "bulletpoint_2" }],
        },
        // Add more bulletpoints as needed
      ],
    },
    {
      type: "section",
      children: [
        {
          type: "section_title",
          children: [{ text: "Skills and interests" }],
        },
        {
          type: "subsection_subtitle",
          children: [{ text: "Skills" }],
        },
        {
          type: "subsection_subtitle",
          children: [{ text: "Interests" }],
        },
      ],
    },
  ];
  