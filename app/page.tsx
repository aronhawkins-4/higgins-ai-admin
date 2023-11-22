"use client";
import { useRouter } from "next/navigation";
import supabase from "./utils/clientSupabase";
import { AddConnectionButton } from "./components/AddConnectionButton";
import { AddCollectionButton } from "./components/AddCollectionButton";
import { ConnectionModal } from "./components/ConnectionModal";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();
      console.log(data.user?.email);
    }
    getUser();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col gap-4">
          <AddConnectionButton />
          <AddCollectionButton />
          <ConnectionModal />
        </div>
      </div>
    </main>
  );
}
