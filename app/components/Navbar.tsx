"use client";
import Image from "next/image";
import supabase from "../utils/clientSupabase";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

export const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
    setSession(null);
  };

  useEffect(() => {
    const getSession = async () => {
      if (!session) {
        const { data, error } = await supabase.auth.getSession();
        if (data.session) {
          setSession(data.session);
        }
      }
    };
    getSession();
  }, []);

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
        {session && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full overflow-hidden">
                <Image
                  alt="user image"
                  src="http://localhost:3000/api/og"
                  fill
                  className="rounded-full"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={signOut}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
