import { ChromaClient } from "chromadb";

const chromaClient = (url: string) => {
  const client = new ChromaClient({ path: url });
  return client;
};
export default chromaClient;
