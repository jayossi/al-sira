declare module 'html2pdf.js' {
    export default html2pdf;
  }
  
  declare function html2pdf(): Html2PdfWorkerRoot;
  declare function html2pdf(element: Html2PdfElement, opt?: Html2PdfWorkerOptions): void;
  
  declare type Html2PdfWorkerRoot = Html2PdfWorkerRoot;
  declare type Html2PdfElement = string | HTMLElement;
  
  declare interface Html2PdfWorkerRoot {
    from(element: Html2PdfElement, type?: 'string' | 'element' | 'canvas' | 'img'): Html2PdfWorkerFrom;
  }
  
  declare interface Html2PdfWorkerContainer extends Html2PdfWorkerSave, Html2PdfWorkerTarget {
    toCanvas(): Html2PdfWorkerCanvas;
  }
  
  declare interface Html2PdfWorkerFrom extends Html2PdfWorkerSave, Html2PdfWorkerTarget, Html2PdfworkerOptions {
    toContainer(): Html2PdfWorkerContainer;
  }
  
  declare interface Html2PdfWorkerCanvas extends Html2PdfWorkerSave, Html2PdfWorkerTarget {
    toImg(): Html2PdfWorkerSave;
  }
  
  declare interface Html2PdfworkerImage extends Html2PdfWorkerSave, Html2PdfWorkerTarget {
    toPdf(): Html2PdfWorkerSave;
  }
  
  declare interface Html2PdfWorkerTarget {
    to(target: 'container' | 'canvas' | 'img' | 'pdf'): Html2PdfWorkerSave;
  }
  
  declare interface Html2PdfWorkerSave {
    save(fileName?: string): PromiseLike<void>;
  }
  
  declare interface Html2PdfworkerOptions {
    set(opt: Html2PdfWorkerOptions): Html2PdfWorkerRoot;
  }
  
  declare interface Html2PdfWorkerOptions {
    margin?: number | number[2] | number[4];
    filename?: string;
    image?: { type?: string; quality?: number; [key: string]: string | number | undefined };
    html2canvas?: { scale?: number };
    jsPdf: { unit?: string; format?: string; orientation?: 'portrait' | 'landscape' };
    enableLinks?: boolean;
  }