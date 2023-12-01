"use client";
import { useCallback, useEffect, useState } from "react";
import clientSupabase from "../utils/clientSupabase";
import { Connection } from "@/types/types";

export const useConnections = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [connections, setConnections] = useState<Connection[] | null>(null);
  const supabase = clientSupabase();
  const getConnections = useCallback(() => {
    supabase
      .from("Connections")
      .select()
      .then((res) => {
        if (res.data) {
          setConnections(res.data);
          setIsLoading(false);
        }
      });
  }, [supabase]);

  useEffect(() => {
    getConnections();
    setIsLoading(() => (!connections ? true : false));
  }, []);

  return { connections, isLoading };
};
