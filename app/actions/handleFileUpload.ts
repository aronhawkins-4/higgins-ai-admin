"use server";

import { Connection } from "@/types/types";
import { OpenAIEmbeddingFunction } from "chromadb";
import chromaClient from "../utils/chromaClient";
import { v4 as uuidv4 } from "uuid";

export const handleFileUpload = async (
  connection: Connection,
  collectionName: string,
  fileContent: string
) => {
  console.log("hey", fileContent);
  const embedder = new OpenAIEmbeddingFunction({
    openai_api_key: connection?.open_ai_api_key!,
  });
  const chroma = chromaClient(connection?.vector_db_url!);
  const collection = await chroma.getCollection({
    name: collectionName,
    embeddingFunction: embedder,
  });
  console.log(await collection.count());
  const fileId = uuidv4().toString();
  await collection.add({ ids: fileId, documents: fileContent }).then(() => {
    console.log("SUCCESS");
  });
  const results = await collection.query({
    queryTexts: ["This is a document"],
  });
  console.log(results);
};
