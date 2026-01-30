"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex bg-white">
      <div className="w-full max-w-[400px] mx-auto flex flex-col justify-center p-8">
        <Link href="/" className="mb-12 block">
          <span className="font-serif font-medium text-2xl tracking-tight">Orbit.</span>
        </Link>
        
        <h1 className="text-2xl font-serif mb-2">Welcome back</h1>
        <p className="text-[#666] mb-8 text-sm">Enter your details to access your workspace.</p>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-[#888] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input w-full bg-[#FAFAFA]"
              placeholder="name@work.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-[#888] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full bg-[#FAFAFA]"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link href="/forgot-password" className="text-sm text-[#666] hover:text-black">Forgot password?</Link>
          </div>

          <button type="submit" className="btn-primary w-full mt-4">
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-[#666]">
          Don't have an account? <Link href="/signup" className="text-black font-medium border-b border-black pb-0.5">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
