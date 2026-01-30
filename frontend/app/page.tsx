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

      {/* Hero Section - Structured Grid */}
      <section className="hero-section relative pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto min-h-[90vh] flex flex-col">
        {/* Decorative Grid Lines with Coordinates */}
        <div className="absolute inset-0 pointer-events-none px-6 md:px-12">
            <div className="h-full w-full border-x border-[#E5E5E5]/50 grid grid-cols-1 md:grid-cols-12 divide-x divide-[#E5E5E5]/50">
               {[...Array(12)].map((_,i) => (
                 <div key={i} className="hidden md:block relative">
                    <span className="absolute top-2 left-2 text-[8px] font-mono text-[#999] opacity-50">0{i+1}</span>
                 </div>
               ))}
            </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 h-full flex-1 gap-y-12 md:gap-y-0">
           
           {/* Top Row: Mission Statement & Headline */}
           <div className="col-span-12 md:col-span-2 pt-12 md:pt-24 hidden md:block">
              {/* Dense "Manifesto" Text Block */}
              <div className="text-[10px] leading-relaxed font-mono uppercase tracking-widest text-[#666] max-w-[140px] border-l-2 border-[#EA580C] pl-3">
                 System Status: Online<br/>
                 Version: 2.0.4<br/><br/>
                 Eliminate Noise.<br/>
                 Focus on Output.<br/>
                 Measure Value.<br/>
                 Repeat.
              </div>
           </div>

           <div className="col-span-12 md:col-span-10 border-b border-[#111] pb-12 pt-12 md:pt-24 pl-0 md:pl-12">
              <h1 ref={heroTextRef} className="font-serif text-[12vw] leading-[0.8] tracking-tighter text-[#111]">
                <div className="overflow-hidden"><span className="word inline-block">Control</span></div>
                <div className="overflow-hidden"><span className="word inline-block text-[#888]">Your</span></div>
                <div className="overflow-hidden"><span className="word inline-block text-[#EA580C]">Chaos.</span></div>
              </h1>
           </div>

           {/* Middle Row: Social Proof / Ticker */}
           <div className="col-span-12 border-b border-[#E5E5E5] py-6 flex items-center overflow-hidden">
               <div className="flex gap-12 whitespace-nowrap animate-marquee">
                  {[...Array(10)].map((_, i) => (
                     <div key={i} className="flex items-center gap-2 opacity-40 grayscale hover:grayscale-0 transition-all cursor-crosshair">
                        <div className="w-4 h-4 rounded-full bg-[#111]" />
                        <span className="font-serif text-lg">Trusted Studio {i+1}</span>
                     </div>
                  ))}
               </div>
           </div>

           {/* Bottom Row: Detail Stats & CTA */}
           <div className="col-span-12 md:col-span-6 pt-12 flex items-start gap-12">
              <div className="space-y-2">
                 <div className="text-xs font-mono uppercase text-[#666]">Total Revenue Tracked</div>
                 <div className="text-4xl font-serif text-[#111]">$4,285,000</div>
                 <div className="h-1 w-full bg-[#E5E5E5] mt-2 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-2/3 bg-[#EA580C]" />
                 </div>
              </div>
              <div className="space-y-2 hidden sm:block">
                 <div className="text-xs font-mono uppercase text-[#666]">Active Freelancers</div>
                 <div className="text-4xl font-serif text-[#111]">12,402</div>
                 <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_,i) => <div key={i} className="w-1 h-3 bg-[#111]" />)}
                    {[...Array(3)].map((_,i) => <div key={i} className="w-1 h-3 bg-[#E5E5E5]" />)}
                 </div>
              </div>
           </div>

           <div className="col-span-12 md:col-span-5 md:col-start-8 pt-12 flex flex-col justify-between space-y-8 md:pl-12">
              <p className="text-xl leading-relaxed text-[#444]">
                The complete operating system for high-performance freelancers. 
                <span className="text-[#111] font-medium block mt-2 border-l border-[#EA580C] pl-4">
                   Bandwidth + Revenue + Time
                </span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="bg-[#111] text-white px-8 py-4 text-lg font-medium rounded-sm hover:bg-[#EA580C] transition-all text-center group">
                    Start 14-day trial <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <button className="px-8 py-4 text-lg font-medium border border-[#ccc] rounded-sm hover:border-black transition-all bg-white/50 backdrop-blur-sm">
                    Read Manifesto
                </button>
              </div>
           </div>
        </div>
      </section>

      {/* Dashboard Preview - Annotated */}
      <section className="px-2 md:px-12 mb-32 relative z-20 perspective-1000">
         {/* Annotation Labels pointing to preview */}
         <div className="max-w-[1400px] mx-auto hidden md:flex justify-between items-end mb-4 px-12 md:px-24 pointer-events-none">
             <div className="text-xs font-mono text-[#666] flex flex-col items-center">
                 <span>↓ Sidebar Navigation</span>
                 <div className="h-8 w-px bg-[#ccc]" />
             </div>
             <div className="text-xs font-mono text-[#666] flex flex-col items-center">
                 <span>Revenue Analytics ↓</span>
                 <div className="h-8 w-px bg-[#ccc]" />
             </div>
         </div>

        <div className="dashboard-preview bg-black p-2 md:p-3 rounded-xl shadow-2xl shadow-black/20 mx-auto max-w-[1400px]">
           <div className="bg-[#FAFAFA] rounded-lg overflow-hidden border border-[#333] aspect-[16/10] relative flex">
              
              {/* Sidebar: Detailed */}
              <div className="w-64 border-r border-[#E5E5E5] bg-white hidden md:flex flex-col p-6 shrink-0 z-10">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-4 h-4 rounded-full bg-[#EA580C]" />
                    <div className="h-2 w-16 bg-[#E5E5E5] rounded-full" />
                 </div>
                 <div className="space-y-6">
                    <div className="h-px w-full bg-[#F2F2F2]" />
                    {[1,2,3,4].map(i => (
                        <div key={i} className="flex gap-4 items-center opacity-40">
                            <div className="w-4 h-4 bg-[#F2F2F2] rounded-sm" />
                            <div className="h-2 w-24 bg-[#F2F2F2] rounded-full" />
                        </div>
                    ))}
                 </div>
              </div>

              {/* Main Area: Detailed */}
              <div className="flex-1 p-8 md:p-12 relative overflow-hidden bg-[#FAFAFA]">
                 {/* Top Bar */}
                 <div className="flex justify-between items-end mb-12 border-b border-[#E5E5E5] pb-6">
                    <div>
                       <div className="text-[10px] font-mono uppercase tracking-widest text-[#888] mb-2">Total Revenue (YTD)</div>
                       <div className="text-5xl md:text-6xl font-serif text-[#111]">$124,500<span className="text-2xl text-[#999] opacity-50">.00</span></div>
                    </div>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-[#EA580C]/10 text-[#EA580C] text-xs font-mono font-medium rounded border border-[#EA580C]/20">
                          TARGET: $150k
                       </span>
                    </div>
                 </div>

                 <div className="grid grid-cols-12 gap-8 h-full">
                    
                    {/* Utilization Chart */}
                    <div className="col-span-12 md:col-span-4 bg-white border border-[#E5E5E5] p-6 rounded-lg relative overflow-hidden flex flex-col shadow-sm">
                       <div className="text-xs font-mono uppercase text-[#666] mb-4">Metric: Bandwidth</div>
                       <div className="flex-1 flex items-center justify-center relative">
                          {/* Donut Chart */}
                          <div className="w-40 h-40 rounded-full border-[20px] border-[#F2F2F2] border-t-[#EA580C] border-r-[#EA580C] rotate-45 relative">
                              <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                                 <div className="text-center">
                                    <span className="block text-2xl font-serif">75%</span>
                                    <span className="text-[10px] uppercase text-[#888]">Utilized</span>
                                 </div>
                              </div>
                          </div>
                       </div>
                       <div className="mt-4 flex justify-between text-xs text-[#666] border-t border-[#F2F2F2] pt-4">
                          <span>Available: 12h</span>
                          <span className="font-medium text-[#111]">Booked: 28h</span>
                       </div>
                    </div>

                    {/* Revenue Bar Chart */}
                    <div className="col-span-12 md:col-span-8 bg-white border border-[#E5E5E5] p-6 rounded-lg flex flex-col shadow-sm">
                       <div className="flex justify-between items-center mb-6">
                          <div className="text-xs font-mono uppercase text-[#666]">Analytics: Monthly Growth</div>
                          <div className="flex gap-2">
                             <div className="w-2 h-2 bg-[#111] rounded-full" />
                             <span className="text-[10px] text-[#666]">Earned</span>
                             <div className="w-2 h-2 bg-[#EA580C] rounded-full ml-2" />
                             <span className="text-[10px] text-[#666]">Projected</span>
                          </div>
                       </div>
                       
                       <div className="flex-1 flex items-end justify-between gap-3 px-2">
                          {[65, 40, 75, 55, 80, 45, 90, 70, 85, 60, 95, 75].map((h, i) => (
                             <div key={i} className="w-full relative group">
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    ${h}k
                                </div>
                                <div 
                                    className={`w-full ${i > 9 ? 'bg-[#EA580C] opacity-80' : 'bg-[#111]'} rounded-t-sm transition-all duration-300 hover:opacity-80`} 
                                    style={{ height: `${h}%` }} 
                                />
                                <div className="text-[8px] text-center mt-2 text-[#999] font-mono">
                                   {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
                 
                 {/* Fake "Recent" List */}
                 <div className="absolute bottom-0 left-0 right-0 h-12 bg-white border-t border-[#E5E5E5] flex items-center px-6 justify-between text-xs font-mono text-[#666]">
                    <span>Recent Activity</span>
                    <span className="flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                         Inv #1024 Paid
                    </span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Bento Grid Features - Unchanged but denser feel due to context */}
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
