"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Project } from "@/lib/mockData";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
        gsap.fromTo(listRef.current.children, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" });
    }
  }, []);

  return (
    <div className="card bg-white mt-8">
      <div className="p-6 border-b border-[#F2F2F2] flex justify-between items-center">
        <h2 className="text-lg font-serif">Projects</h2>
        <span className="text-xs text-[#888] uppercase tracking-wide">Status</span>
      </div>
      <div ref={listRef}>
        {projects.map((p) => (
          <div key={p.id} className="p-6 border-b border-[#F2F2F2] last:border-0 hover:bg-[#FAFAFA] transition-colors flex items-center justify-between group cursor-default">
             <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
               <div>
                  <h3 className="font-medium text-[#111]">{p.name}</h3>
                  <p className="text-sm text-[#888]">{p.client.name}</p>
               </div>
             </div>
             <div className="flex items-center gap-8">
               <div className="text-right hidden sm:block">
                  <span className="block text-sm font-medium">{p.hoursLogged}h logged</span>
                  <div className="w-24 h-1 bg-[#F2F2F2] mt-1">
                     <div className="h-full bg-[#111]" style={{ width: `${(p.hoursLogged/p.hoursEstimated)*100}%` }} />
                  </div>
               </div>
               <span className={`text-xs px-2 py-1 border rounded-sm capitalize ${p.status === 'active' ? 'border-green-200 text-green-700 bg-green-50' : 'border-gray-200 text-gray-500'}`}>
                 {p.status}
               </span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
