import { getCollection } from "@/app/actions/getCollection";
import { getConnection } from "@/app/actions/getConnection";
import { FileDropzone } from "@/app/dashboard/components/FileDropzone";
import { FileUpload } from "@/app/dashboard/components/FileUpload";
import chromaClient from "@/app/utils/chromaClient";
import { OpenAIEmbeddingFunction } from "chromadb";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default async function CollectionPage({
  params,
}: {
  params: { slug: string; colSlug: string };
}) {
  const collection = await getCollection(params.colSlug);
  const connection = await getConnection(params.slug);
  console.log(collection);
  if (!connection || !connection.vector_db_url) {
    toast.error("Invalid Connection");
    redirect("/dashboard");
  }
  if (!collection) {
    toast.error("Invalid Collection");
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col gap-4">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link href="/dashboard">dashboard</Link>
              </li>
              <li>
                <Link href={`/dashboard/connections/${params.slug}`}>
                  {params.slug}
                </Link>
              </li>
              <li>{params.colSlug}</li>
            </ul>
          </div>
          <FileDropzone
            connectionSlug={params.slug}
            collectionName={collection.name!}
          />
        </div>
      </div>
    </main>
  );
}
