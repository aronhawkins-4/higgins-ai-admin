import Link from "next/link";
import serverSupabase from "./utils/serverSupabase";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await serverSupabase();
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    redirect("/signin");
  }
  if (data.session) {
    redirect("/dashboard");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col gap-4">Home</div>
        <Link href="/signin" className="btn">
          Sign in
        </Link>
      </div>
    </main>
  );
}
