import React from "react";

//CHANGES Align
const alignment = "left";

export const HeadingElement = (props: any) => {
  return (
    <h1
      style={{ textAlign: "center" }}
      {...props.attributes}
      fontWeight="bolder"
    >
      {props.children}
    </h1>
  );
};

export const SubHeadingElement = (props: any) => {
  return (
    <h2
      style={{ textAlign: alignment }}
      {...props.attributes}
      fontWeight="bolder"
    >
      {props.children}
    </h2>
  );
};
export const SubSubHeadingElement = (props: any) => {
  return (
    <h3
      style={{ textAlign: alignment }}
      {...props.attributes}
      fontWeight="bold"
    >
      {props.children}
    </h3>
  );
};

export const ListElement = (props: any) => {
  return (
    <ul style={{ textAlign: alignment }} {...props.attributes}>
      <li>{props.children}</li>
    </ul>
  );
};

export const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};
// Custom elements
const TitleElement = ({ attributes, children }: any) => (
  <h1 {...attributes} style={{ textAlign: "center" }}>
    {children}
  </h1>
);

const SubtitleElement = ({ attributes, children }: any) => (
  <h2 {...attributes} style={{ textAlign: "center" }}>
    {children}
  </h2>
);

const SectionElement = ({ attributes, children }: any) => (
  <div {...attributes}>{children}</div>
);

const SectionTitleElement = ({ attributes, children }: any) => (
  <h3 {...attributes}>{children}</h3>
);

const SectionSubtitleElement = ({ attributes, children }: any) => (
  <h4 {...attributes}>{children}</h4>
);

const SubsectionTitleElement = ({ attributes, children }: any) => (
  <h4 {...attributes}>{children}</h4>
);

const SubsectionSubtitleElement = ({ attributes, children }: any) => (
  <h5 {...attributes}>{children}</h5>
);

const BulletpointElement = ({ attributes, children }: any) => (
  <li {...attributes}>{children}</li>
);

export const DefaultElement = (props: any) => {
  return (
    <p style={{ textAlign: alignment }} {...props.attributes}>
      {props.children}
    </p>
  );
};

// Define a React component to render leaves with bold text.
export const Leaf = (props: any) => {
  let { attributes, children, leaf } = props;
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.h1) {
    children = <h1>{children}</h1>;
  }
  if (leaf.h2) {
    children = <h2>{children}</h2>;
  }
  if (leaf.h3) {
    children = <h3>{children}</h3>;
  }

  return <span {...attributes}>{children}</span>;
};

export const Element = (props: any) => {
  let { attributes, children } = props;
  switch (props.element.type) {
    case "code":
      return <CodeElement {...props} />;
    case "list":
      return <ListElement {...props} />;
    case "heading":
      return <HeadingElement {...props} />;
    case "subheading":
      return <SubHeadingElement {...props} />;
    case "subsubheading":
      return <SubSubHeadingElement {...props} />;
    case "title":
      return <TitleElement {...props} />;
    case "subtitle":
      return <SubtitleElement {...props} />;
    case "section":
      return <SectionElement {...attributes}>{children}</SectionElement>;
    case "section_title":
      return <SectionTitleElement {...props} />;
    case "section_subtitle":
      return <SectionSubtitleElement {...props} />;
    case "subsection_title":
      return <SubsectionTitleElement {...props} />;
    case "subsection_subtitle":
      return <SubsectionSubtitleElement {...props} />;
    case "bulletpoint":
      return <BulletpointElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};
