"use client";
import Image from "next/image";
import supabase from "../utils/clientSupabase";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

export const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Higgins AI Admin</a>
      </div>
      <div className="flex-none">
        {!session && (
          <a
            className="link link-hover"
            onClick={() => {
              router.push("/signin");
            }}
          >
            Sign In
          </a>
        )}
      </div>
    </div>
  );
};
