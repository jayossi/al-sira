import { Pinecone } from "@pinecone-database/pinecone";
import { getEmbeddings } from "./embeddings";

export async function getMatchesFromEmbeddings(
  embedding: number[],
  filekey: string
) {
  const pineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!,
  });
  const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX_NAME!);
  try {
    const queryResult = await pineconeIndex.query({
      vector: embedding,
      topK: 5,
      includeMetadata: true,
    });
    console.log("queryResult: ", queryResult)
    return queryResult.matches || [];
  } catch (error) {
    console.log("error getting matches from embeddings: ", error);
    throw error;
  }
}

export async function getContext(query: string, filekey: string) {
  const queryEmbedded = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbedded, filekey);
  console.log("matches: ", matches)
  const qualifyingdocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );
  console.log("qualifyingdocs: ", qualifyingdocs)
  type Metadata = {
    text: string;
    pageNumber: number;
  };

  let docs = qualifyingdocs.map((doc) => (doc.metadata as Metadata).text);
  console.log("docs: ", docs)
  return docs.join("\n").substring(0, 3000);
}
