import { NextResponse } from "next/server";
import { createServerSideClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  try {
    const supabase = await createServerSideClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({
      user: data.user ? { id: data.user.id, email: data.user.email } : null,
    });
  } catch {
    return NextResponse.json({ error: "Authentication service unavailable" }, { status: 502 });
  }
}
