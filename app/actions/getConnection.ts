import serverSupabase from "../utils/serverSupabase";

export const getConnection = async (slug: string) => {
  const supabase = serverSupabase();
  const { data: user, error: userError } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("Connections")
    .select()
    .eq("slug", slug)
    .contains("userIds", [user?.user?.id])
    .single();
  if (data) {
    return data;
  }
};
