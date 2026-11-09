import { NextResponse } from "next/server";
import { createServerSideClient } from "@/lib/supabase-server";

export async function POST() {
  try {
    const supabase = await createServerSideClient();
    await supabase.auth.signOut();
  } catch {
    // Even if Supabase is not available, clear local state
  }

  return NextResponse.json({ ok: true });
}
