import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  //   const res = NextResponse.next();
  //   const supabase = createMiddlewareClient(
  //     { req, res },
  //     {
  //       supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //       supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  //     }
  //   );
  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession();
  //   console.log(session);
  //   if (!session) {
  //     return NextResponse.redirect("http://localhost:3000/signin");
  //   }
}

// export const config = {
//   //   matcher: ["/"],
// };

// src/middleware.ts
