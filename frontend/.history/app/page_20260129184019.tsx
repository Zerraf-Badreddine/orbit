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
    
    // Hero animations - sharper, punchier
    tl.fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power4.out" })
      .fromTo(".hero-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, "-=0.8")
      .fromTo(".hero-subtitle", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
      .fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
  }, []);

  return (
    <main className="min-h-screen bg-[#F2F2F2] selection:bg-[#EA580C] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="font-semibold text-xl tracking-tighter">Orbit.</Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/login" className="text-sm font-medium hover:opacity-70 transition-opacity">Log in</Link>
              <Link href="/signup" className="text-sm font-medium hover:opacity-70 transition-opacity">Start Trial</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-40 pb-20 lg:pt-60 lg:pb-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="border-t border-black mb-12 hero-line origin-left" />
        
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter mb-12 text-[#111]">
              <div className="overflow-hidden"><span className="hero-title block">Know your</span></div>
              <div className="overflow-hidden"><span className="hero-title block text-[#777]">bandwidth.</span></div>
            </h1>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="hero-subtitle text-xl leading-relaxed text-[#333] mb-8 max-w-sm">
              The operating system for high-performance freelancers. Time tracking, revenue forecasting, and bandwidth management in one calm interface.
            </p>
            <div className="hero-cta flex gap-6">
              <Link href="/signup" className="group flex items-center gap-2 text-lg font-medium border-b border-black pb-1 hover:text-[#EA580C] hover:border-[#EA580C] transition-colors">
                Start 14-day trial 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview - Minimal */}
      <section className="px-6 lg:px-12 max-w-[1400px] mx-auto mb-32">
        <div className="bg-white p-2 border border-[#E5E5E5] shadow-2xl shadow-black/5">
          <div className="bg-[#FAFAFA] aspect-[16/9] border border-[#F0F0F0] relative overflow-hidden group">
             {/* Abstract UI representation */}
             <div className="absolute inset-x-12 top-12 bottom-0 bg-white border-t border-x border-[#EAEAEA] shadow-sm">
                <div className="grid grid-cols-12 gap-8 p-12 h-full">
                  <div className="col-span-3 border-r border-[#F0F0F0] pr-8 space-y-6">
                    <div className="w-8 h-8 bg-black rounded-full" />
                    <div className="space-y-4 pt-8">
                      <div className="h-2 w-24 bg-[#F0F0F0] rounded" />
                      <div className="h-2 w-32 bg-[#F0F0F0] rounded" />
                      <div className="h-2 w-20 bg-[#F0F0F0] rounded" />
                    </div>
                  </div>
                  <div className="col-span-9">
                    <div className="flex justify-between items-end mb-16">
                      <div className="text-6xl font-serif text-[#111]">87.5h</div>
                      <div className="flex gap-4">
                        <div className="h-10 w-32 border border-[#E5E5E5]" />
                        <div className="h-10 w-10 bg-[#EA580C]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                      <div className="aspect-square border border-[#E5E5E5] p-6">
                        <div className="w-full h-full rounded-full border-[12px] border-[#F2F2F2] border-t-[#EA580C]" />
                      </div>
                      <div className="col-span-2 border border-[#E5E5E5] p-6 relative">
                         <div className="absolute bottom-6 left-6 right-6 h-32 flex items-end justify-between gap-1">
                            {[40, 60, 45, 80, 70, 90, 65, 85].map((h, i) => (
                              <div key={i} className="w-full bg-[#111]" style={{ height: `${h}%` }} />
                            ))}
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Editorial Style */}
      <section id="features" className="py-32 border-t border-[#E5E5E5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-24">
            {[
              { 
                title: "Bandwidth",
                desc: "Visualize your available hours. Never overcommit again."
              },
              { 
                title: "Revenue",
                desc: "Track earned vs projected income. Know your run rate."
              },
              { 
                title: "Health",
                desc: "A single score to measure your business sustainability."
              },
              { 
                title: "Clients",
                desc: "CRM tailored for freelancers. Contracts, rates, and history."
              },
              { 
                title: "Invoices",
                desc: "Generate Swiss-style invoices. Track status and aging."
              },
              { 
                title: "Time",
                desc: "Frictionless tracking. Billable vs non-billable splits."
              }
            ].map((f, i) => (
              <div key={i} className="group cursor-default">
                <div className="w-12 h-[1px] bg-black mb-6 group-hover:w-full transition-all duration-500 ease-out" />
                <h3 className="text-2xl font-serif mb-4">{f.title}</h3>
                <p className="text-[#666] leading-relaxed max-w-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Simple */}
      <section className="py-32 bg-[#111] text-[#F2F2F2]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="font-serif text-6xl md:text-7xl mb-12">Simple pricing.</h2>
              <p className="text-xl text-[#888] max-w-md">No hidden fees. No per-user costs. Just one flat rate for peace of mind.</p>
            </div>
            <div className="grid gap-12">
              <div className="border border-[#333] p-8 hover:bg-[#222] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl">Professional</h3>
                  <span className="text-xl text-[#888]">$29/mo</span>
                </div>
                <ul className="space-y-4 text-[#888]">
                  <li className="flex items-center gap-3">
                    <span className="text-white">—</span> Unlimited Projects
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-white">—</span> Advanced Analytics
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-white">—</span> Client Portal
                  </li>
                </ul>
                <div className="mt-8 pt-8 border-t border-[#333]">
                   <Link href="/signup" className="text-white border-b border-transparent hover:border-white transition-all pb-1">Start 14-day trial →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-12 px-6 lg:px-12 max-w-[1400px] mx-auto flex justify-between items-end border-t border-[#E5E5E5] mt-20">
        <div>
           <div className="font-serif text-2xl mb-2">Orbit.</div>
           <p className="text-[#888] text-sm">© 2026</p>
        </div>
        <div className="flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-[#EA580C]">Twitter</a>
          <a href="#" className="hover:text-[#EA580C]">Instagram</a>
          <a href="#" className="hover:text-[#EA580C]">Email</a>
        </div>
      </footer>
    </main>
  );
}
