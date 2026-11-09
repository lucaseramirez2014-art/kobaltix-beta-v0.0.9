"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");

    if (password !== confirm) {
      setError("Passwords do not match");
      setBusy(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setBusy(false);
      return;
    }

    try {
      const r = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, password }),
      });
      const d = await r.json();

      if (!r.ok) {
        setError(d.error || "Registration failed");
      } else {
        setMessage(d.message || "Account created. Check your email.");
        setTimeout(() => router.push("/auth/login"), 3000);
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
          <p className="text-xs text-[#71717a] mt-1">Create your workspace</p>
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

          <div>
            <label htmlFor="confirm" className="text-xs text-[#a1a1aa] block mb-1">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full bg-[#121316] border border-[#23262d] rounded px-3 py-2 text-sm text-[#ededed] focus:outline-hidden focus:border-[#4285F4]"
            />
          </div>

          {error && <p className="text-xs text-[#EA4335]">{error}</p>}
          {message && <p className="text-xs text-[#34A853]">{message}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#4285F4] text-white rounded px-4 py-2 text-sm font-medium disabled:opacity-50 cursor-pointer"
          >
            {busy ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-xs text-[#71717a] text-center mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#4285F4] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
