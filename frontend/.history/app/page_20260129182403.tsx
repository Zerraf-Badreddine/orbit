"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const elements = heroRef.current.querySelectorAll(".animate-in");
    gsap.fromTo(
      elements,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, []);

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-main)]/80 backdrop-blur-md border-b border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <span className="font-semibold tracking-tight text-lg">Orbit</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Pricing</a>
              <Link href="/login" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Log in</Link>
              <Link href="/signup" className="px-4 py-2 bg-[var(--color-accent-primary)] text-white rounded text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors">
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <p className="animate-in text-[var(--color-accent-primary)] text-sm font-medium tracking-wide uppercase mb-4">
              Freelance Operating System
            </p>
            <h1 className="animate-in font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6">
              Know your worth.<br />
              <span className="text-[var(--color-text-secondary)]">Track your time.</span>
            </h1>
            <p className="animate-in text-xl text-[var(--color-text-secondary)] max-w-2xl mb-10">
              Orbit gives freelancers a clear view of their bandwidth and revenue. 
              Stop guessing, start growing. Professional-grade tools without the enterprise complexity.
            </p>
            <div className="animate-in flex flex-wrap gap-4">
              <Link href="/signup" className="px-6 py-3 bg-[var(--color-accent-primary)] text-white rounded font-medium hover:bg-[var(--color-accent-hover)] transition-colors">
                Start Free Trial
              </Link>
              <Link href="/login" className="px-6 py-3 border border-[var(--color-border-subtle)] rounded font-medium hover:border-[var(--color-text-secondary)] transition-colors">
                View Demo
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="animate-in mt-16 lg:mt-24">
            <div className="card p-4 lg:p-6 shadow-[var(--shadow-elevated)]">
              <div className="bg-[var(--color-bg-main)] rounded p-6 lg:p-10">
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {/* Mini Bandwidth Card */}
                  <div className="bg-[var(--color-bg-surface)] rounded p-6 border border-[var(--color-border-subtle)]">
                    <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">Bandwidth</p>
                    <p className="font-serif text-3xl">87.5h</p>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">of 112h committed</p>
                  </div>
                  {/* Mini Revenue Card */}
                  <div className="bg-[var(--color-bg-surface)] rounded p-6 border border-[var(--color-border-subtle)]">
                    <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">Revenue</p>
                    <p className="font-serif text-3xl">$8,750</p>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">of $12,000 target</p>
                  </div>
                  {/* Mini Health Card */}
                  <div className="bg-[var(--color-bg-surface)] rounded p-6 border border-[var(--color-border-subtle)]">
                    <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">Health</p>
                    <p className="font-serif text-3xl text-[var(--color-success)]">82</p>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">Excellent</p>
                  </div>
                </div>
                {/* Fake Chart */}
                <div className="h-32 bg-[var(--color-bg-surface)] rounded border border-[var(--color-border-subtle)] flex items-end p-4 gap-2">
                  {[40, 55, 45, 70, 85, 65, 50, 35, 60, 75, 80].map((h, i) => (
                    <div key={i} className="flex-1 bg-[var(--color-accent-primary)]/20 rounded-t" style={{ height: `${h}%` }}>
                      <div className="w-full bg-[var(--color-accent-primary)] rounded-t" style={{ height: `${h * 0.7}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-[var(--color-bg-surface)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[var(--color-accent-primary)] text-sm font-medium tracking-wide uppercase mb-4">Features</p>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-tight">Everything you need to thrive</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⏱",
                title: "Bandwidth Tracking",
                desc: "See your availability at a glance. Know exactly how many hours you can commit to new projects."
              },
              {
                icon: "💰",
                title: "Revenue Insights",
                desc: "Track earned vs pending income. Set monthly targets and watch your progress in real-time."
              },
              {
                icon: "📊",
                title: "Health Score",
                desc: "One number that tells you if you're on track. Based on utilization and revenue goals."
              },
              {
                icon: "📁",
                title: "Project Management",
                desc: "Organize clients and projects. Track hours, deadlines, and invoicing status."
              },
              {
                icon: "🧾",
                title: "Invoice Generation",
                desc: "Create professional invoices in seconds. Track payments and follow up automatically."
              },
              {
                icon: "📈",
                title: "Trend Analysis",
                desc: "Spot patterns in your work. Optimize rates and identify your most profitable clients."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 border border-[var(--color-border-subtle)] rounded hover:border-[var(--color-text-secondary)] transition-colors group">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-medium mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors">{feature.title}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[var(--color-accent-primary)] text-sm font-medium tracking-wide uppercase mb-4">Pricing</p>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-tight">Simple, transparent pricing</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="card p-8">
              <p className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">Starter</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-serif text-4xl">$0</span>
                <span className="text-[var(--color-text-secondary)]">/month</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6">Perfect for getting started</p>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-success)]">✓</span> 3 active projects
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-success)]">✓</span> Basic time tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-success)]">✓</span> Monthly reports
                </li>
              </ul>
              <Link href="/signup" className="block text-center py-3 border border-[var(--color-border-subtle)] rounded font-medium hover:border-[var(--color-text-secondary)] transition-colors">
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="card p-8 border-2 border-[var(--color-accent-primary)] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--color-accent-primary)] text-white text-xs font-medium rounded">
                Most Popular
              </div>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">Professional</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-serif text-4xl">$19</span>
                <span className="text-[var(--color-text-secondary)]">/month</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6">For serious freelancers</p>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-success)]">✓</span> Unlimited projects
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-success)]">✓</span> Advanced analytics
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-success)]">✓</span> Invoice generation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-success)]">✓</span> Client portal
                </li>
              </ul>
              <Link href="/signup" className="block text-center py-3 bg-[var(--color-accent-primary)] text-white rounded font-medium hover:bg-[var(--color-accent-hover)] transition-colors">
                Start Free Trial
              </Link>
            </div>

            {/* Team */}
            <div className="card p-8">
              <p className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">Team</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-serif text-4xl">$49</span>
                <span className="text-[var(--color-text-secondary)]">/month</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6">For agencies & teams</p>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-success)]">✓</span> Everything in Pro
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-success)]">✓</span> Up to 10 team members
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-success)]">✓</span> Team reporting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-success)]">✓</span> Priority support
                </li>
              </ul>
              <Link href="/signup" className="block text-center py-3 border border-[var(--color-border-subtle)] rounded font-medium hover:border-[var(--color-text-secondary)] transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-[var(--color-text-primary)] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight mb-6">
            Ready to take control?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Join thousands of freelancers who've stopped guessing and started growing.
          </p>
          <Link href="/signup" className="inline-block px-8 py-4 bg-[var(--color-accent-primary)] rounded font-medium hover:bg-[var(--color-accent-hover)] transition-colors">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <span className="font-medium">Orbit</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-[var(--color-text-secondary)]">
              <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">Terms</a>
              <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">Support</a>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              © 2026 Orbit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
