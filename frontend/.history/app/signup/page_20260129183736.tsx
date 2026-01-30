"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Password strength
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) score++;
    if (pwd.match(/\d/)) score++;
    if (pwd.match(/[^a-zA-Z\d]/)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500"];

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (visualRef.current) {
      tl.fromTo(visualRef.current.querySelectorAll(".animate-item"),
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
      );
    }

    if (formRef.current) {
      tl.fromTo(formRef.current.querySelectorAll(".animate-item"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
        "-=0.5"
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Left - Form Side */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[var(--color-bg-main)]">
        <div ref={formRef} className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="animate-item flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-primary)] to-orange-500 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span className="font-semibold text-xl">Orbit</span>
          </Link>

          {/* Header */}
          <div className="animate-item mb-8">
            <h1 className="text-3xl font-serif tracking-tight mb-2">Create your account</h1>
            <p className="text-[var(--color-text-secondary)]">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div className="animate-item">
              <label className="block text-sm font-medium mb-2">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="input"
              />
            </div>

            <div className="animate-item">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input"
              />
            </div>

            <div className="animate-item">
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="input pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {/* Password strength indicator */}
              {password && (
                <div className="mt-3">
                  <div className="flex gap-1.5 mb-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${i < strength ? strengthColors[strength - 1] : "bg-[var(--color-bg-muted)]"}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Password strength: <span className={strength >= 3 ? "text-emerald-600" : "text-[var(--color-text-secondary)]"}>{strength > 0 ? strengthLabels[strength - 1] : "Too short"}</span>
                  </p>
                </div>
              )}
            </div>

            <div className="animate-item">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-[var(--color-border-subtle)] accent-[var(--color-accent-primary)]"
                />
                <span className="text-sm text-[var(--color-text-secondary)]">
                  I agree to the{" "}
                  <a href="#" className="text-[var(--color-accent-primary)] hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-[var(--color-accent-primary)] hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button type="submit" className="animate-item btn-primary w-full" disabled={!agreed}>
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="animate-item flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[var(--color-border-subtle)]" />
            <span className="text-sm text-[var(--color-text-muted)]">or continue with</span>
            <div className="flex-1 h-px bg-[var(--color-border-subtle)]" />
          </div>

          {/* Social buttons */}
          <div className="animate-item grid grid-cols-2 gap-3">
            <button className="btn-secondary flex items-center justify-center gap-2 py-3">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2 py-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign in link */}
          <p className="animate-item text-center mt-8 text-sm text-[var(--color-text-secondary)]">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--color-accent-primary)] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Visual Side */}
      <div ref={visualRef} className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[var(--color-accent-primary)] via-orange-500 to-amber-500 overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        
        <div className="relative z-10 flex flex-col justify-center w-full p-12">
          <div className="max-w-md">
            <h2 className="animate-item text-4xl font-serif text-white leading-tight mb-6">
              Join thousands of freelancers growing their business
            </h2>
            
            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: "⏱", text: "Track time and bandwidth effortlessly" },
                { icon: "💰", text: "Set revenue goals and hit them" },
                { icon: "📊", text: "Get insights that actually matter" },
                { icon: "🧾", text: "Invoice clients in seconds" }
              ].map((benefit, i) => (
                <div key={i} className="animate-item flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/10">
                  <span className="text-2xl">{benefit.icon}</span>
                  <span className="text-white/90 font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="animate-item mt-10 grid grid-cols-3 gap-6">
              {[
                { value: "12K+", label: "Freelancers" },
                { value: "$4.2M", label: "Tracked" },
                { value: "98%", label: "Happy users" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="font-serif text-3xl text-white">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
