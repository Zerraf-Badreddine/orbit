"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Kinetic Hero Text
    const words = heroTextRef.current?.querySelectorAll(".word");
    if (words) {
      gsap.fromTo(words, 
        { y: 120, rotationX: -90, opacity: 0 },
        { 
          y: 0, 
          rotationX: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: "expo.out",
          delay: 0.2
        }
      );
    }

    // 2. Dashboard Preview Parallax
    gsap.fromTo(".dashboard-preview",
      { y: 100, scale: 0.9, rotationX: 10 },
      {
        y: -50,
        scale: 1,
        rotationX: 0,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom center",
          scrub: 1,
        }
      }
    );

    // 3. Feature Cards Reveal
    const cards = document.querySelectorAll(".bento-card");
    cards.forEach((card) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#F2F2F2] selection:bg-[#EA580C] selection:text-white overflow-x-hidden">
      
      {/* Navigation - Sticky & Glassy */}
      <nav className="fixed top-0 inset-x-0 z-50 mix-blend-difference text-white">
        <div className="px-6 md:px-12 py-6 flex justify-between items-center bg-black/5 backdrop-blur-sm border-b border-white/5">
          <Link href="/" className="text-2xl font-serif tracking-tighter hover:opacity-70 transition-opacity">Orbit.</Link>
          <div className="flex gap-8 items-center">
            <Link href="/login" className="text-sm font-medium hover:text-[#EA580C] transition-colors">Log in</Link>
            <Link href="/signup" className="text-sm font-medium bg-white text-black px-5 py-2 rounded-full hover:bg-[#EA580C] hover:text-white transition-all">Start Trial</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Bold & Massive */}
      <section className="hero-section relative pt-40 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto min-h-[90vh] flex flex-col justify-between">
        <div className="relative z-10">
          <h1 ref={heroTextRef} className="font-serif text-[13vw] leading-[0.85] tracking-tighter text-[#111] mb-12">
            <div className="overflow-hidden"><span className="word inline-block">Control</span></div>
            <div className="overflow-hidden"><span className="word inline-block text-[#888]">Your</span></div>
            <div className="overflow-hidden"><span className="word inline-block text-[#EA580C]">Chaos.</span></div>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-end">
          <p className="text-xl md:text-2xl leading-relaxed text-[#444] max-w-md">
            The operating system for high-performance freelancers. 
            <span className="text-[#111] font-semibold"> Bandwidth</span>, 
            <span className="text-[#111] font-semibold"> Revenue</span>, and 
            <span className="text-[#111] font-semibold"> Time</span> 
            synced in one ruthless interface.
          </p>
          <div className="flex gap-4">
             <Link href="/signup" className="bg-[#111] text-white px-8 py-4 text-lg font-medium rounded-sm hover:bg-[#EA580C] transition-all">
                Get Started →
             </Link>
             <button className="px-8 py-4 text-lg font-medium border border-[#ccc] rounded-sm hover:border-black transition-all">
                View Manifesto
             </button>
          </div>
        </div>

        {/* Abstract Grid Line Decoration */}
        <div className="absolute top-0 right-12 h-full w-px bg-[#000]/5 hidden md:block" />
        <div className="absolute top-0 left-1/3 h-full w-px bg-[#000]/5 hidden md:block" />
      </section>

      {/* Dashboard Preview - Tilted 3D Effect */}
      <section className="px-2 md:px-12 mb-32 relative z-20 perspective-1000">
        <div className="dashboard-preview bg-black p-2 md:p-3 rounded-xl shadow-2xl shadow-black/20 mx-auto max-w-[1400px]">
           <div className="bg-[#FAFAFA] rounded-lg overflow-hidden border border-[#333] aspect-[16/10] relative">
              {/* Abstract UI Art */}
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
              
              {/* Sidebar */}
              <div className="absolute left-0 top-0 bottom-0 w-64 border-r border-[#E5E5E5] bg-white hidden md:block p-6 space-y-4">
                 <div className="w-8 h-8 rounded-full bg-[#EA580C]" />
                 <div className="h-2 w-20 bg-[#F2F2F2] rounded" />
                 <div className="h-2 w-32 bg-[#F2F2F2] rounded" />
                 <div className="pt-8 space-y-3">
                    {[1,2,3,4].map(i => <div key={i} className="h-8 w-full bg-[#FAFAFA] rounded-sm" />)}
                 </div>
              </div>

              {/* Main Area */}
              <div className="absolute inset-0 md:left-64 p-8 md:p-12">
                 <div className="flex justify-between items-end mb-16">
                    <div>
                       <div className="text-sm font-medium uppercase tracking-widest text-[#888] mb-2">Total Revenue</div>
                       <div className="text-6xl md:text-7xl font-serif text-[#111]">$124,500</div>
                    </div>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-[#EA580C]/10 text-[#EA580C] text-sm font-medium rounded">+12% vs last month</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-3 gap-6 h-full">
                    <div className="bg-white border border-[#E5E5E5] p-6 rounded-lg relative overflow-hidden group hover:border-[#EA580C] transition-colors">
                       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F2F2F2] to-transparent" />
                       <div className="relative z-10 w-full h-full flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full border-[16px] border-[#F2F2F2] border-t-[#EA580C] rotate-45" />
                       </div>
                    </div>
                    <div className="col-span-2 bg-white border border-[#E5E5E5] p-6 rounded-lg flex items-end justify-between gap-2">
                       {[65, 40, 75, 55, 80, 45, 90, 70, 85, 60, 95, 75].map((h, i) => (
                          <div key={i} className="w-full bg-[#111] hover:bg-[#EA580C] transition-colors" style={{ height: `${h}%` }} />
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto mb-40">
         <div className="mb-20">
            <h2 className="font-serif text-5xl md:text-7xl mb-6">Designed for<br/>Density.</h2>
            <div className="h-1 w-24 bg-[#EA580C]" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
            
            {/* Large Card */}
            <div className="bento-card md:col-span-2 bg-white border border-[#E5E5E5] p-10 hover:shadow-2xl hover:shadow-black/5 transition-all text-[#111] flex flex-col justify-between group">
               <div>
                  <h3 className="text-3xl font-serif mb-4">Profit First.</h3>
                  <p className="text-lg text-[#666] max-w-sm">Automatically separate your profit, tax, and expenses. See your real take-home pay instantly.</p>
               </div>
               <div className="w-full h-32 flex items-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="flex-1 bg-[#111] h-[80%]" />
                  <div className="flex-1 bg-[#333] h-[60%]" />
                  <div className="flex-1 bg-[#555] h-[40%]" />
                  <div className="flex-1 bg-[#EA580C] h-[90%]" />
               </div>
            </div>

            {/* Tall Card */}
            <div className="bento-card md:row-span-2 bg-[#111] text-white p-10 flex flex-col justify-between group">
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-8 group-hover:bg-[#EA580C] group-hover:border-transparent transition-colors">
                  <span className="text-2xl">→</span>
               </div>
               <div>
                  <h3 className="text-3xl font-serif mb-4">Client Portal</h3>
                  <p className="text-white/60 mb-8">Share live project status, invoices, and assets. Reduce emails by 90%.</p>
                  <div className="space-y-4 border-t border-white/10 pt-8">
                     <div className="flex justify-between text-sm"><span>Acme Corp</span><span className="text-[#EA580C]">Active</span></div>
                     <div className="flex justify-between text-sm"><span>Stark Ind</span><span className="text-[#EA580C]">Pending</span></div>
                     <div className="flex justify-between text-sm"><span>Wayne Ent</span><span className="text-white/40">Closed</span></div>
                  </div>
               </div>
            </div>

            {/* Square Card */}
            <div className="bento-card bg-white border border-[#E5E5E5] p-10 flex flex-col justify-between hover:border-[#EA580C] transition-colors group">
               <div className="w-16 h-16 bg-[#F2F2F2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-4 h-4 bg-[#EA580C] rounded-full animate-pulse" />
               </div>
               <div>
                  <h3 className="text-2xl font-serif mb-2">Time Tracking</h3>
                  <p className="text-[#666]">Frictionless. Keyboard-first.</p>
               </div>
            </div>

             {/* Square Card */}
             <div className="bento-card bg-[#EA580C] text-white p-10 flex flex-col justify-between">
               <div className="text-6xl font-serif">14d</div>
               <div>
                  <h3 className="text-2xl font-serif mb-2">Free Trial</h3>
                  <p className="text-white/80">No credit card required.</p>
               </div>
            </div>

         </div>
      </section>

      {/* Footer Area - Massive */}
      <footer className="bg-[#111] text-[#E5E5E5] pt-32 pb-12 px-6 md:px-12">
         <div className="max-w-[1600px] mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-32">
               <div>
                  <h4 className="text-white font-medium mb-6">Product</h4>
                  <ul className="space-y-4 text-sm text-[#888]">
                     <li className="hover:text-white cursor-pointer">Manifesto</li>
                     <li className="hover:text-white cursor-pointer">Pricing</li>
                     <li className="hover:text-white cursor-pointer">Changelog</li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-white font-medium mb-6">Company</h4>
                  <ul className="space-y-4 text-sm text-[#888]">
                     <li className="hover:text-white cursor-pointer">About</li>
                     <li className="hover:text-white cursor-pointer">Careers</li>
                     <li className="hover:text-white cursor-pointer">Legal</li>
                  </ul>
               </div>
               <div className="md:col-span-2 text-right">
                  <p className="text-2xl font-serif text-white mb-2">"Simplicity is the ultimate sophistication."</p>
                  <p className="text-[#666]">― Leonardo da Vinci</p>
               </div>
            </div>
            
            <div className="border-t border-[#333] pt-12 flex justify-between items-end">
               <h1 className="text-[15vw] leading-[0.7] font-serif tracking-tighter opacity-20 hover:opacity-100 transition-opacity select-none cursor-default">Orbit.</h1>
               <p className="text-sm text-[#444] hidden md:block">© 2026 Orbit Inc.</p>
            </div>
         </div>
      </footer>
    </main>
  );
}
