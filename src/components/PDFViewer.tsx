import React from "react";

type Props = { resume_url: string };

const PDFViewer = ({ resume_url }: Props) => {
  return (
    <iframe
      src={`https://docs.google.com/gview?url=${resume_url}&embedded=true`}
      className="w-full h-full"
    ></iframe>
  );
};

export default PDFViewer;
