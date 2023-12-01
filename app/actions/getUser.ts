import serverSupabase from "../utils/serverSupabase";

export const getUser = async (userUid: string) => {
  const supabase = serverSupabase();
  const user = await supabase.from("users").select().eq("id", userUid).single();
  return user;
};
