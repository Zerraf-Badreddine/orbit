"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div ref={formRef} className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="animate-in flex items-center gap-3 mb-12 justify-center">
          <div className="w-10 h-10 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
          <span className="font-semibold text-xl tracking-tight">Orbit</span>
        </Link>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <h1 className="animate-in font-serif text-4xl tracking-tight mb-2">Reset password</h1>
              <p className="animate-in text-[var(--color-text-secondary)]">
                Enter your email and we'll send you a reset link
              </p>
            </div>

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

              <button
                type="submit"
                disabled={isLoading}
                className="animate-in w-full py-3 bg-[var(--color-accent-primary)] text-white rounded font-medium hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="animate-in w-16 h-16 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="animate-in font-serif text-3xl tracking-tight mb-2">Check your email</h1>
            <p className="animate-in text-[var(--color-text-secondary)] mb-6">
              We've sent a password reset link to<br />
              <span className="font-medium text-[var(--color-text-primary)]">{email}</span>
            </p>
            <p className="animate-in text-sm text-[var(--color-text-secondary)]">
              Didn't receive the email?{" "}
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-[var(--color-accent-primary)] font-medium hover:underline"
              >
                Try again
              </button>
            </p>
          </div>
        )}

        <div className="animate-in mt-8 pt-8 border-t border-[var(--color-border-subtle)]">
          <p className="text-center text-[var(--color-text-secondary)]">
            Remember your password?{" "}
            <Link href="/login" className="text-[var(--color-accent-primary)] font-medium hover:underline">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
