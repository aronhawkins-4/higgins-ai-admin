"use client";
import { useRouter } from "next/navigation";
import clientSupabase from "@/app/utils/clientSupabase";
export const SignOutButton = () => {
  const router = useRouter();
  const supabase = clientSupabase();
  const signOut = async () => {
    supabase.auth.signOut().then(() => {
      router.push("/signin");
    });
  };
  return <a onClick={signOut}>Logout</a>;
};
