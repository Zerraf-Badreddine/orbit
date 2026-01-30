"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Hero animations
    tl.fromTo(".hero-badge", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
      .fromTo(".hero-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
      .fromTo(".hero-subtitle", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.5")
      .fromTo(".hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      .fromTo(".hero-preview", { y: 80, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1 }, "-=0.3");

    // Floating animation for preview
    gsap.to(".hero-preview", {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  useEffect(() => {
    if (!featuresRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target.querySelectorAll(".feature-card"),
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(featuresRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-orange-100/40 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-50/30 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-accent-primary)] to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="font-semibold tracking-tight text-lg">Orbit</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Pricing</a>
              <Link href="/login" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Log in</Link>
              <Link href="/signup" className="btn-primary text-sm py-2 px-4">
                Start Free →
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)] animate-pulse" />
              <span className="text-sm font-medium text-[var(--color-accent-primary)]">Freelance Operating System</span>
            </div>

            {/* Title */}
            <h1 className="hero-title font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-6">
              Know your worth.
              <br />
              <span className="gradient-text">Track your time.</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-xl lg:text-2xl text-[var(--color-text-secondary)] max-w-2xl mb-10 leading-relaxed">
              Orbit gives freelancers a clear view of their bandwidth and revenue. 
              Stop guessing. Start growing.
            </p>

            {/* CTAs */}
            <div className="hero-cta flex flex-wrap gap-4">
              <Link href="/signup" className="btn-primary flex items-center gap-2">
                Start Free Trial
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/dashboard" className="btn-secondary flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                View Demo
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="hero-preview mt-16 lg:mt-24">
            <div className="relative rounded-2xl bg-gradient-to-b from-white to-[var(--color-bg-main)] p-1.5 shadow-[var(--shadow-elevated)] border border-white/50">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 via-transparent to-amber-500/10 pointer-events-none" />
              <div className="relative rounded-xl bg-[var(--color-bg-main)] overflow-hidden">
                <div className="p-6 lg:p-10">
                  {/* Mock Nav */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  
                  {/* Mock Cards */}
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border-subtle)]">
                      <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-2">Bandwidth</p>
                      <p className="font-serif text-4xl tracking-tight">87.5<span className="text-xl text-[var(--color-text-muted)]">h</span></p>
                      <div className="mt-4 h-1.5 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                        <div className="h-full w-[78%] bg-gradient-to-r from-[var(--color-accent-primary)] to-orange-400 rounded-full" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border-subtle)]">
                      <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-2">Revenue</p>
                      <p className="font-serif text-4xl tracking-tight">$8,750</p>
                      <div className="mt-4 h-1.5 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                        <div className="h-full w-[73%] bg-gradient-to-r from-emerald-500 to-green-400 rounded-full" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border-subtle)] flex flex-col items-center justify-center">
                      <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-2">Health Score</p>
                      <p className="font-serif text-5xl tracking-tight text-emerald-500">82</p>
                    </div>
                  </div>

                  {/* Mock Chart */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border-subtle)]">
                    <div className="flex items-end justify-between h-24 gap-2">
                      {[40, 55, 45, 70, 85, 65, 75, 50, 65, 80, 90, 75].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end gap-1">
                          <div className="bg-gradient-to-t from-[var(--color-accent-primary)] to-orange-300 rounded-t" style={{ height: `${h}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 mb-6">
              <span className="text-sm font-medium text-[var(--color-accent-primary)]">Features</span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-tight mb-4">Everything you need to thrive</h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Professional-grade tools without the enterprise complexity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "⏱", title: "Bandwidth Tracking", desc: "See your availability at a glance. Know exactly how many hours you can commit to new projects.", gradient: "from-orange-500 to-amber-500" },
              { icon: "💰", title: "Revenue Insights", desc: "Track earned vs pending income. Set monthly targets and watch your progress in real-time.", gradient: "from-emerald-500 to-green-500" },
              { icon: "📊", title: "Health Score", desc: "One number that tells you if you're on track. Based on utilization and revenue goals.", gradient: "from-blue-500 to-cyan-500" },
              { icon: "📁", title: "Project Management", desc: "Organize clients and projects. Track hours, deadlines, and invoicing status.", gradient: "from-violet-500 to-purple-500" },
              { icon: "🧾", title: "Invoice Generation", desc: "Create professional invoices in seconds. Track payments and follow up automatically.", gradient: "from-pink-500 to-rose-500" },
              { icon: "📈", title: "Trend Analysis", desc: "Spot patterns in your work. Optimize rates and identify your most profitable clients.", gradient: "from-amber-500 to-yellow-500" }
            ].map((feature, i) => (
              <div key={i} className="feature-card group card-static p-8 hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-border-medium)] transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors">{feature.title}</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-24 lg:py-32 bg-gradient-to-b from-[var(--color-bg-main)] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 mb-6">
              <span className="text-sm font-medium text-[var(--color-accent-primary)]">Pricing</span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-[var(--color-text-secondary)]">No hidden fees. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="card-static p-8 flex flex-col">
              <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Starter</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-serif text-5xl tracking-tight">$0</span>
                <span className="text-[var(--color-text-muted)]">/month</span>
              </div>
              <p className="text-[var(--color-text-secondary)] mb-6">Perfect for getting started</p>
              <div className="divider mb-6" />
              <ul className="space-y-3 mb-8 flex-1">
                {["3 active projects", "Basic time tracking", "Monthly reports"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn-secondary text-center">Get Started</Link>
            </div>

            {/* Pro - Featured */}
            <div className="relative card-static p-8 flex flex-col border-2 border-[var(--color-accent-primary)] shadow-[var(--shadow-glow)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[var(--color-accent-primary)] to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                Most Popular
              </div>
              <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Professional</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-serif text-5xl tracking-tight">$19</span>
                <span className="text-[var(--color-text-muted)]">/month</span>
              </div>
              <p className="text-[var(--color-text-secondary)] mb-6">For serious freelancers</p>
              <div className="divider mb-6" />
              <ul className="space-y-3 mb-8 flex-1">
                {["Unlimited projects", "Advanced analytics", "Invoice generation", "Client portal", "Priority support"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn-primary text-center">Start Free Trial</Link>
            </div>

            {/* Team */}
            <div className="card-static p-8 flex flex-col">
              <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Team</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-serif text-5xl tracking-tight">$49</span>
                <span className="text-[var(--color-text-muted)]">/month</span>
              </div>
              <p className="text-[var(--color-text-secondary)] mb-6">For agencies & teams</p>
              <div className="divider mb-6" />
              <ul className="space-y-3 mb-8 flex-1">
                {["Everything in Pro", "Up to 10 team members", "Team reporting", "Custom integrations"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn-secondary text-center">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-[var(--color-text-primary)] via-zinc-900 to-zinc-800 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-4xl lg:text-6xl tracking-tight mb-6">
            Ready to take control?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Join thousands of freelancers who've stopped guessing and started growing.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--color-text-primary)] rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-xl">
            Start Your Free Trial
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent-primary)] to-orange-500 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="font-semibold">Orbit</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-[var(--color-text-secondary)]">
              <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">Terms</a>
              <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">Support</a>
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">© 2026 Orbit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
