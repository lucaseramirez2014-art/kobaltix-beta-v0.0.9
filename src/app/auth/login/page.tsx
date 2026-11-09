"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(errorParam || "");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, password }),
      });
      const d = await r.json();

      if (!r.ok) {
        setError(d.error || "Login failed");
      } else {
        router.push(redirect);
        router.refresh();
      }
    } catch {
      setError("Unable to connect to authentication service");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#ededed] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-lg font-semibold font-mono">Cobalix</h1>
          <p className="text-xs text-[#71717a] mt-1">Sign in to your workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-xs text-[#a1a1aa] block mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#121316] border border-[#23262d] rounded px-3 py-2 text-sm text-[#ededed] focus:outline-hidden focus:border-[#4285F4]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-xs text-[#a1a1aa] block mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#121316] border border-[#23262d] rounded px-3 py-2 text-sm text-[#ededed] focus:outline-hidden focus:border-[#4285F4]"
            />
          </div>

          {error && (
            <p className="text-xs text-[#EA4335]">{error}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#4285F4] text-white rounded px-4 py-2 text-sm font-medium disabled:opacity-50 cursor-pointer"
          >
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-xs text-[#71717a] text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-[#4285F4] hover:underline">
            Register
          </Link>
        </p>

        <p className="text-[10px] text-[#52525b] text-center mt-4">
          Requires Supabase configured with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
        </p>
      </div>
    </div>
  );
}
