import { Database } from "@/types/supabase";
import { createBrowserClient } from "@supabase/ssr";

const clientSupabase = () => {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return supabase;
};
export default clientSupabase;
