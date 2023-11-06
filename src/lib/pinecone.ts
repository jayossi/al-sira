import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";


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
    return
}

async function embedDocument(doc: Document) {
    return
}

export const truncateStringByByte = (str: string, bytes: number) => {
    return
}

async function prepareDocument(page:PDFResume) {
    
    return
}