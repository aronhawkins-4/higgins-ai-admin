import clientSupabase from "../utils/clientSupabase";
import { useState } from "react";
import { UserResponse } from "@supabase/supabase-js";
import { Connection } from "@/types/types";

export const useConnection = (slug: string) => {
  const [user, setUser] = useState<UserResponse>();
  const [connection, setConnection] = useState<Connection>();
  const supabase = clientSupabase();
  supabase.auth.getUser().then((res) => {
    setUser(res);
  });
  if (user?.data) {
    supabase
      .from("Connections")
      .select()
      .eq("slug", slug)
      .contains("userIds", [user.data.user?.id])
      .single()
      .then((res) => {
        setConnection(res.data as Connection);
      });
  }
  if (connection) {
    return connection;
  }
};
