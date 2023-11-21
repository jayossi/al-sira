import React from "react";

export const HeadingElement = (props: any) => {
  return (
    <h1 {...props.attributes} fontWeight="bolder">
      {props.children}
    </h1>
  );
};

export const SubHeadingElement = (props: any) => {
  return (
    <h2 {...props.attributes} fontWeight="bolder">
      {props.children}
    </h2>
  );
};
export const SubSubHeadingElement = (props: any) => {
  return (
    <h3 {...props.attributes} fontWeight="bold">
      {props.children}
    </h3>
  );
}

export const ListElement = (props: any) => {
  return (
    <ul {...props.attributes}>
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

export const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
};

// Define a React component to render leaves with bold text.
export const Leaf = (props:any) => {
  let { attributes, children, leaf } = props
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if (leaf.h1) {
    children = <h1>{children}</h1>
  }
  if (leaf.h2) {
    children = <h2>{children}</h2>
  }
  if (leaf.h3) {
    children = <h3>{children}</h3>
  }
  
  

  return <span {...attributes}>{children}</span>
};
