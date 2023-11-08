import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { DownloadFromS3 } from './s3-server';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document, RecursiveCharacterTextSplitter} from "@pinecone-database/doc-splitter";
export const getPineconeClient = () => {
    return new Pinecone(
        {
            apiKey: process.env.PINECONE_API_KEY!,
            environment: process.env.PINECONE_ENVIRONMENT!,
        }
    );
}

type PDFResume = {
    pageContent: string;
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
    const pdfResumes = (await loader.load()) as PDFResume[] 
    // 2. Prepare the document for pinecone
    const documents = await Promise.all(pdfResumes.map(prepareDocument))

    
    
    return 
}

async function embedDocument(doc: Document) {
    return
}

export const truncateStringByByte = (str: string, bytes: number) => {
    const enc = new TextEncoder()
    return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes))
}

async function prepareDocument(page: PDFResume) {
    let  { pageContent, metadata } = page
    pageContent = pageContent.replace(/\n/g, " ") //replace newlines with spaces
    const splitter = new RecursiveCharacterTextSplitter()
    const docs = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata: {
                loc: {
                    pageNumber: metadata.loc.pageNumber,
                    text: truncateStringByByte(pageContent, 36000)
                }
            }
        })
        
    ])

    return docs
}