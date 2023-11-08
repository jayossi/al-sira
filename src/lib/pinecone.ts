import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { DownloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
import { convertToAscii } from "./utils";

export const getPineconeClient = () => {
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!,
  });
};

type PDFResume = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  // 1. Obtain the pdf resume from S3 (download + read pdf)
  console.log("downloading file from s3");
  const file_name = await DownloadFromS3(fileKey);
  if (!file_name) {
    throw new Error("File not found");
  }
  console.log("loading pdf into memory: " + file_name);
  const loader = new PDFLoader(file_name);
  const pdfResumes = (await loader.load()) as PDFResume[];
  // 2. Prepare the document for pinecone
  const documents = await Promise.all(pdfResumes.map(prepareDocument));
  console.log("documents: ", documents)
  //3. vectorise and embed individual documents
  const vectors = await Promise.all(documents.flat().map(embedDocument));

  // 4. Upload to pinecone
  const client = getPineconeClient();
  console.log("uploading to pinecone");
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME!);

  console.log("inserting vectors into pinecone");
  await pineconeIndex.upsert(vectors);

  return documents[0];
}

async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    console.log("embeddings: ", embeddings);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("error embedding document: ", error);
    throw error;
  }
}

export const truncateStringByByte = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFResume) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, " "); //replace newlines with spaces
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        loc: {
          pageNumber: metadata.loc.pageNumber,
          text: truncateStringByByte(pageContent, 36000),
        },
      },
    }),
  ]);

  return docs;
}
