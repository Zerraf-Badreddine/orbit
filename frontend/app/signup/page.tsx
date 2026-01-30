"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex bg-white">
      <div className="w-full max-w-[400px] mx-auto flex flex-col justify-center p-8">
        <Link href="/" className="mb-12 block">
          <span className="font-serif font-medium text-2xl tracking-tight">Orbit.</span>
        </Link>
        
        <h1 className="text-2xl font-serif mb-2">Start your trial</h1>
        <p className="text-[#666] mb-8 text-sm">14 days free. No credit card required.</p>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-[#888] mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input w-full bg-[#FAFAFA]"
              placeholder="Jane Doe"
            />
          </div>
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

          <button type="submit" className="btn-primary w-full mt-4">
            Create Account
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-[#666]">
          Already have an account? <Link href="/login" className="text-black font-medium border-b border-black pb-0.5">Log in</Link>
        </p>
      </div>
    </div>
  );
}
