"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formRef.current) return;
    const elements = formRef.current.querySelectorAll(".animate-in");
    gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    await new Promise((r) => setTimeout(r, 1000));
    window.location.href = "/dashboard";
  };

  return (
    <main className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div ref={formRef} className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="animate-in flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <span className="font-semibold text-xl tracking-tight">Orbit</span>
          </Link>

          <h1 className="animate-in font-serif text-4xl tracking-tight mb-2">Welcome back</h1>
          <p className="animate-in text-[var(--color-text-secondary)] mb-8">
            Log in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-in">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-[var(--color-border-subtle)] rounded bg-[var(--color-bg-surface)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
              />
            </div>

            <div className="animate-in">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Password</label>
                <Link href="/forgot-password" className="text-sm text-[var(--color-accent-primary)] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-[var(--color-border-subtle)] rounded bg-[var(--color-bg-surface)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="animate-in w-full py-3 bg-[var(--color-accent-primary)] text-white rounded font-medium hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="animate-in mt-8 pt-8 border-t border-[var(--color-border-subtle)]">
            <p className="text-center text-[var(--color-text-secondary)]">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[var(--color-accent-primary)] font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 bg-[var(--color-text-primary)] items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <div className="mb-8">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-accent-primary)]">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <blockquote className="font-serif text-3xl leading-relaxed mb-6">
            "Orbit completely changed how I manage my freelance business. I finally know my worth."
          </blockquote>
          <div>
            <p className="font-medium">Sarah Chen</p>
            <p className="text-white/60 text-sm">Independent Designer</p>
          </div>
        </div>
      </div>
    </main>
  );
}
