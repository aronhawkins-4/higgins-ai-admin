import { AddConnectionButton } from "./components/AddConnectionButton";
import { ConnectionFormModal } from "./components/ConnectionFormModal";
import { ConnectionList } from "./components/ConnectionList";
import serverSupabase from "../utils/serverSupabase";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col gap-4">
          <AddConnectionButton />
          <ConnectionList />
          <ConnectionFormModal />
        </div>
      </div>
    </main>
  );
}
