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

function transformHtmlToPdf(html: string) {
  const doc = new jsPDF();

  const parser = new DOMParser();
  const parsedHtml = parser.parseFromString(html, "text/html");

  const elements = parsedHtml.body.children;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    const tagName = element.tagName.toLowerCase();
    const alignment = element.getAttribute("align");

    // If the element is a heading, we need to change the font size
    if (tagName in FONT_SIZE_MAPPING) {
      doc.setFontSize(
        FONT_SIZE_MAPPING[tagName as keyof typeof FONT_SIZE_MAPPING]
      );
    }

    //This is an example of a centered text
    //doc.text("This is centred text.", 105, 80, null, null, "center");

    //   switch (alignment) {
    //     case "center":
    //       doc.text(
    //         element.textContent!,
    //         105,
    //         doc.previous.finalY + 10,
    //         { align: "center" }
    //       );
    //       break;
    //     default:
    //       doc.text(element.textContent!, 10, doc.previous.finalY + 10);
    //       break;
    //   }
  }

  doc.save("output.pdf");
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
