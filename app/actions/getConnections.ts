import serverSupabase from "../utils/serverSupabase";

export const getConnections = async () => {
  const supabase = serverSupabase();
  const { data: user, error: userError } = await supabase.auth.getUser();
  const connections = await supabase
    .from("Connections")
    .select()
    .contains("userIds", [user?.user?.id]);
  return connections;
};
