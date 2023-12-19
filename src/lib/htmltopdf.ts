import jsPDF from "jspdf";
import "jspdf-autotable";
import html2pdf from "html2pdf.js";

const FONT_SIZE_MAPPING = {
  h1: 20,
  h2: 16,
  h3: 14,
  h4: 12,
  h5: 11,
  h6: 10,
};

//This function uses window.print to print the html and then convert it to pdf using the browser's print dialog
function transformHtmlToPdf(html: string) {
  const parser = new DOMParser();
  const parsedHtml = parser.parseFromString(html, "text/html");
  const elements = parsedHtml.body;
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);
  iframe.contentDocument!.body.appendChild(elements);
  iframe.contentWindow!.focus();
  iframe.contentWindow!.print();
  
}

const transformHtmlToPdfwithHTMLAsCanvas = (html: string) => {
  var doc = new jsPDF();
  const parser = new DOMParser();
  const parsedHtml = parser.parseFromString(html, "text/html");

  const elements = parsedHtml.body;
  console.log("the input html is", elements);
  html2pdf(elements, {
    margin: 10,
    filename: "myResume_ar.pdf",
    jsPdf: {
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    },
  });
};

export { transformHtmlToPdfwithHTMLAsCanvas , transformHtmlToPdf };
