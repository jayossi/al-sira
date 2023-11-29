// Import the `Node` helper interface from Slate.
import {  Element as SlateElement } from "slate";
import { Descendant } from "slate";
import { Text } from "slate";
import { jsx } from "slate-hyperscript";
import escapeHtml from "escape-html";
import { CustomElement } from "./types";

export const serializeHTML = (node: any) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) string = `<strong>${string}</strong>`;
    if (node.italic) string = `<em>${string}</em>`;
    if (node.underline) string = `<u>${string}</u>`;

    return string;
  }
  const children: string = node.children.map((n: any) => serializeHTML(n)).join("");
  switch (node.type) {
    case "paragraph":
      return `<p>${children}</p>`;
    case "heading":
      return `<h1>${children}</h1>`;
    case "subheading":
      return `<h2>${children}</h2>`;
    case "list":
      return `<ul>${children}</ul>`;
    case "bulletpoint":
      return `<li>${children}</li>`;
    case "title":
      return `<h1>${children}</h1>`;
    case "subtitle":
      return `<h2>${children}</h2>`;
    case "section":
      return `<div>${children}</div>`;
    case "section_title":
      return `<h3>${children}</h3>`;
    case "section_subtitle":
      return `<h4>${children}</h4>`;
    case "subsection_title":
      return `<h4>${children}</h4>`;
    case "subsection_subtitle":
      return `<h5>${children}</h5>`;
    default:
      return children;
  }
};

export const deserializeHTML = (el: any, markAttributes: any = {}): any => {
  if (el.nodeType === Node.TEXT_NODE) {
    return jsx("text", markAttributes, el.textContent);
  } else if (el.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const nodeAttributes = { ...markAttributes };

  // define attributes for text nodes
  switch (el.nodeName) {
    case "STRONG":
      nodeAttributes.bold = true;
  }

  const children = Array.from(el.childNodes)
    .map((node) => deserializeHTML(node, nodeAttributes))
    .flat();

  if (children.length === 0) {
    children.push(jsx("text", nodeAttributes, ""));
  }

  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return "\n";
    case "BLOCKQUOTE":
      return jsx("element", { type: "quote" }, children);
    case "P":
      return jsx("element", { type: "paragraph" }, children);
    case "A":
      return jsx(
        "element",
        { type: "link", url: el.getAttribute("href") },
        children
      );
    case "STRONG":
      return jsx("text", { bold: true }, children);
    case "EM":
      return jsx("text", { italic: true }, children);
    case "U":
      return jsx("text", { underline: true }, children);
    case "UL":
      return jsx("element", { type: "list" }, children);
    case "LI":
      return jsx("element", { type: "bulletpoint" }, children);
    case "H1":
      return jsx("element", { type: "title" }, children);
    case "H2":
      return jsx("element", { type: "subtitle" }, children);
    case "DIV":
      return jsx("element", { type: "section" }, children);
    case "H3":
      return jsx("element", { type: "section_title" }, children);
    case "H4":
      return jsx("element", { type: "section_subtitle" }, children);
    case "H4":
      return jsx("element", { type: "subsection_title" }, children);
    case "H5":
      return jsx("element", { type: "subsection_subtitle" }, children);
    default:
      return children;
  }
};
/* // Define a serializing function that takes a value and returns a string.
export const serializePlain = (value: any) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n: any) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join("\n")
  );
};

// Define a deserializing function that takes a string and returns a value.
export const deserializePlain = (string: string): any => {
  // Return a value array of children derived by splitting the string.
  return string.split("\n").map((line) => {
    return {
      children: [{ text: line }],
    };
  });
};
 */