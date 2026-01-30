"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface BandwidthCardProps {
  hoursAvailable: number;
  hoursCommitted: number;
  hoursLogged: number;
  utilizationPercentage: number;
}

export function BandwidthCard({
  hoursAvailable,
  hoursCommitted,
  hoursLogged,
  utilizationPercentage,
}: BandwidthCardProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(barRef.current, { width: 0 }, { width: `${Math.min(utilizationPercentage, 100)}%`, duration: 1, ease: "power2.out" });
    }
  }, [utilizationPercentage]);

  return (
    <div className="card p-6 bg-white">
      <div className="flex justify-between items-baseline mb-6">
        <h3 className="text-sm font-medium text-[#666] uppercase tracking-wide">Bandwidth</h3>
        <span className="text-xs text-[#999]">{hoursAvailable}h Capacity</span>
      </div>
      
      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-serif text-5xl text-[#111]">{hoursLogged.toFixed(1)}</span>
        <span className="text-[#666]">/ {hoursCommitted}h</span>
      </div>

      <div className="w-full bg-[#F2F2F2] h-1.5 overflow-hidden">
        <div 
          ref={barRef} 
          className="h-full bg-[#111]"
          style={{ width: 0 }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-[#666]">
         <span>Available: {(hoursAvailable - hoursCommitted).toFixed(1)}h</span>
         <span>{utilizationPercentage.toFixed(0)}% Utilized</span>
      </div>
    </div>
  );
}
