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
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      user: data.user ? { id: data.user.id, email: data.user.email } : null,
      message: data.user?.identities?.length
        ? "Account created. Check your email to confirm."
        : "Account created. You may be signed in automatically.",
    });
  } catch {
    return NextResponse.json({ error: "Authentication service unavailable" }, { status: 502 });
  }
}
