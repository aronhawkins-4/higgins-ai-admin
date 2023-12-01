import { getCollections } from "@/app/actions/getCollections";
import { BouncingDotsLoader } from "@/app/components/BouncingDotsLoader";
import Link from "next/link";
import { FC } from "react";

interface CollectionListProps {
  slug: string;
}
export const CollectionList: FC<CollectionListProps> = async ({ slug }) => {

  const collections = await getCollections(slug);
  if (collections?.data && collections?.data?.length === 0) return;
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold">Collections</h2>
      {!collections?.data && <BouncingDotsLoader />}
      {collections?.data && (
        <ul className="menu bg-base-200 w-56 rounded-box">
          {collections?.data.map((collection) => (
            <li key={collection.id}>
              <Link
                href={`/dashboard/connections/${slug}/collections/${collection.slug}`}
              >
                {collection.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
