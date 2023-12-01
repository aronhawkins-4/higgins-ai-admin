import { getConnections } from "@/app/actions/getConnections";
import { BouncingDotsLoader } from "@/app/components/BouncingDotsLoader";
import { useConnections } from "@/app/hooks/useConnections";
import Link from "next/link";
import { FC } from "react";

export const ConnectionList = async () => {
  const connections = await getConnections();

  if (connections?.data && connections?.data?.length === 0) return;
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold">Connections</h2>
      {!connections.data && <BouncingDotsLoader />}
      {connections.data && (
        <ul className="menu bg-base-200 w-56 rounded-box">
          {connections?.data.map((connection) => (
            <li key={connection.id}>
              <Link href={`/dashboard/connections/${connection.slug}`}>
                {connection.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
