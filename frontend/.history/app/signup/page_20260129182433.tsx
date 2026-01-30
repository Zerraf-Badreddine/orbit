"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function SignUpPage() {
  const [name, setName] = useState("");
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
    await new Promise((r) => setTimeout(r, 1000));
    window.location.href = "/dashboard";
  };

  return (
    <main className="min-h-screen flex">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[var(--color-accent-primary)] to-orange-400 items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h2 className="font-serif text-4xl leading-tight mb-6">
            Take control of your freelance business
          </h2>
          <div className="space-y-4">
            {[
              "Track your bandwidth and avoid burnout",
              "Set revenue targets and hit them",
              "Generate professional invoices in seconds",
              "Know your worth with data-driven insights"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
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

          <h1 className="animate-in font-serif text-4xl tracking-tight mb-2">Create your account</h1>
          <p className="animate-in text-[var(--color-text-secondary)] mb-8">
            Start your 14-day free trial. No credit card required.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="animate-in">
              <label className="block text-sm font-medium mb-2">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 border border-[var(--color-border-subtle)] rounded bg-[var(--color-bg-surface)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
              />
            </div>

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
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="w-full px-4 py-3 border border-[var(--color-border-subtle)] rounded bg-[var(--color-bg-surface)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
              />
            </div>

            <div className="animate-in flex items-start gap-3">
              <input type="checkbox" id="terms" required className="mt-1" />
              <label htmlFor="terms" className="text-sm text-[var(--color-text-secondary)]">
                I agree to the{" "}
                <a href="#" className="text-[var(--color-accent-primary)] hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-[var(--color-accent-primary)] hover:underline">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="animate-in w-full py-3 bg-[var(--color-accent-primary)] text-white rounded font-medium hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="animate-in mt-8 pt-8 border-t border-[var(--color-border-subtle)]">
            <p className="text-center text-[var(--color-text-secondary)]">
              Already have an account?{" "}
              <Link href="/login" className="text-[var(--color-accent-primary)] font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
