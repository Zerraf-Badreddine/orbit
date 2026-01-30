"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface RevenueCardProps {
  targetAmount: number;
  earnedAmount: number;
  pendingAmount: number;
  currency: string;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function RevenueCard({
  targetAmount,
  earnedAmount,
  pendingAmount,
  currency,
}: RevenueCardProps) {
  const earnedRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<HTMLDivElement>(null);

  const earnedPct = (earnedAmount / targetAmount) * 100;
  const pendingPct = (pendingAmount / targetAmount) * 100;

  useEffect(() => {
    if (earnedRef.current) gsap.fromTo(earnedRef.current, { width: 0 }, { width: `${earnedPct}%`, duration: 1, ease: "power2.out" });
    if (pendingRef.current) gsap.fromTo(pendingRef.current, { width: 0 }, { width: `${pendingPct}%`, duration: 1, delay: 0.2, ease: "power2.out" });
  }, [earnedPct, pendingPct]);

  return (
    <div className="card p-6 bg-white">
      <div className="flex justify-between items-baseline mb-6">
        <h3 className="text-sm font-medium text-[#666] uppercase tracking-wide">Revenue</h3>
        <span className="text-xs text-[#999]">{formatCurrency(targetAmount, currency)} Target</span>
      </div>
      
      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-serif text-5xl text-[#111]">{formatCurrency(earnedAmount, currency)}</span>
        <span className="text-[#666] text-sm">(+{formatCurrency(pendingAmount, currency)} pending)</span>
      </div>

      <div className="w-full bg-[#F2F2F2] h-1.5 overflow-hidden flex">
        <div ref={earnedRef} className="h-full bg-[#10B981]" style={{ width: 0 }} />
        <div ref={pendingRef} className="h-full bg-[#F59E0B]" style={{ width: 0 }} />
      </div>
       <div className="flex justify-between mt-2 text-xs text-[#666]">
         <span>Earned</span>
         <span>{Math.round(earnedPct + pendingPct)}% of Goal</span>
      </div>
    </div>
  );
}
