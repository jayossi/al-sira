import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { DownloadFromS3 } from './s3-server';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export const getPineconeClient = () => {
    return new Pinecone(
        {
            apiKey: process.env.PINECONE_API_KEY!,
            environment: process.env.PINECONE_ENV!,
        }
    );
}

type PDFResume = {
    pageConetent: string;
    metadata: {
        loc: { pageNumber: number }
    }
}

export async function loadS3IntoPinecone(fileKey: string) {
    // 1. Obtain the pdf resume from S3 (download + read pdf)
    console.log("downloading file from s3")
    const file_name = await DownloadFromS3(fileKey)
    if (!file_name) {
        throw new Error("File not found")
    }
    console.log("loading pdf into memory: " + file_name)
    const loader = new PDFLoader(file_name)
    const pdfResume = (await loader.load()) 
    console.log("pdf loaded")
    return pdfResume
    // 2. Prepare the document for pinecone


}

async function embedDocument(doc: Document) {
    return
}

export const truncateStringByByte = (str: string, bytes: number) => {
    return
}

async function prepareDocument(page: PDFResume) {

    return
}