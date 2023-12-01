import serverSupabase from "../utils/serverSupabase";

export const getCollection = async (slug: string) => {
  const supabase = serverSupabase();
  const { data: user, error: userError } = await supabase.auth.getUser();
  console.log(user?.user?.email);
  const { data, error } = await supabase
    .from("Collections")
    .select()
    .eq("slug", slug)
    .single();
  if (data !== null) {
    return data;
  }
  throw new Error("Collection does not exist");
};
