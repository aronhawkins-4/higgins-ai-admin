import { AddCollectionButton } from "@/app/dashboard/components/AddCollectionButton";
import { CollectionFormModal } from "../../components/CollectionFormModal";
import { getConnection } from "@/app/actions/getConnection";
import { CollectionList } from "../../components/CollectionList";
import Link from "next/link";

export default async function ConnectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const connection = await getConnection(params.slug);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col gap-4">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link href="/dashboard">dashboard</Link>
              </li>
              <li>{params.slug}</li>
            </ul>
          </div>
          <AddCollectionButton />
          <CollectionList slug={params.slug} />
          {connection && <CollectionFormModal connection={connection} />}
        </div>
      </div>
    </main>
  );
}
