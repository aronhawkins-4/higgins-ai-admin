import Image from "next/image";
import { redirect } from "next/navigation";
import serverSupabase from "@/app/utils/serverSupabase";
import { SignOutButton } from "./SignOutButton";
import Link from "next/link";

export const Navbar = async () => {
  const supabase = serverSupabase();
  const { data, error } = await supabase.auth.getSession();

  if (!data.session) {
    return;
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/dashboard">
          Higgins AI Admin
        </Link>
      </div>
      <div className="flex-none">
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
              <SignOutButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
