import serverSupabase from "../utils/serverSupabase";

export const getCollections = async (connectionSlug: string) => {
  const supabase = serverSupabase();
  const { data: connection, error } = await supabase
    .from("Connections")
    .select()
    .eq("slug", connectionSlug)
    .single();
  if (connection) {
    const collections = await supabase
      .from("Collections")
      .select("*")
      .eq("connection_id", connection.id);
    return collections;
  }
};
