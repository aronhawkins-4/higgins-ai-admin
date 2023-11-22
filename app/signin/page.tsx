"use client";

import supabase from "@/app/utils/clientSupabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (session) {
      router.push("/");
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex w-full max-w-2xl relative">
        <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 absolute -z-10 w-full h-full w- top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50"></div>
        <div className="p-8 bg-slate-800 rounded-lg w-full auth-wrapper">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                input: { color: "#fff" },
                label: { color: "#fff" },
              },
            }}
            providers={["google"]}
          />
        </div>
      </div>
    </main>
  );
}
