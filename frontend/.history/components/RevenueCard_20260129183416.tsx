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
  const earnedBarRef = useRef<HTMLDivElement>(null);
  const pendingBarRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  const progressPercentage = (earnedAmount / targetAmount) * 100;
  const pendingPercentage = (pendingAmount / targetAmount) * 100;
  const onTrack = (earnedAmount + pendingAmount) >= targetAmount * 0.9;

  useEffect(() => {
    // Animate progress bars
    if (earnedBarRef.current) {
      gsap.fromTo(earnedBarRef.current, 
        { width: "0%" },
        { width: `${Math.min(progressPercentage, 100)}%`, duration: 1.2, delay: 0.3, ease: "power3.out" }
      );
    }
    if (pendingBarRef.current) {
      gsap.fromTo(pendingBarRef.current,
        { width: "0%" },
        { width: `${Math.min(pendingPercentage, 100 - progressPercentage)}%`, duration: 1, delay: 0.6, ease: "power3.out" }
      );
    }

    // Animate number counting
    if (numberRef.current) {
      gsap.fromTo({ val: 0 }, { val: earnedAmount }, {
        duration: 1.5,
        delay: 0.2,
        ease: "power3.out",
        onUpdate: function() {
          if (numberRef.current) {
            numberRef.current.textContent = formatCurrency(Math.round(this.targets()[0].val), currency);
          }
        }
      });
    }
  }, [earnedAmount, progressPercentage, pendingPercentage, currency]);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white border border-[var(--color-border-subtle)] p-8 lg:p-10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Header */}
      <div className="relative flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
            <p className="text-[var(--color-text-muted)] text-sm font-medium tracking-wide uppercase">
              Revenue
            </p>
          </div>
          <p className="text-[var(--color-text-secondary)] text-sm">
            Income progress this month
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="1.5">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
      </div>

      {/* Main Number */}
      <div className="relative mb-8">
        <div className="flex items-baseline gap-2">
          <span ref={numberRef} className="font-serif text-6xl lg:text-7xl tracking-tighter text-[var(--color-text-primary)]">
            $0
          </span>
        </div>
        <p className="text-[var(--color-text-secondary)] text-base mt-2">
          of {formatCurrency(targetAmount, currency)} target
        </p>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-3 bg-gradient-to-r from-[var(--color-bg-muted)] to-[var(--color-bg-main)] rounded-full overflow-hidden shadow-inner flex">
          {/* Earned */}
          <div
            ref={earnedBarRef}
            className="h-full bg-gradient-to-r from-emerald-500 to-green-400 relative flex-shrink-0"
            style={{ width: "0%" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
          </div>
          {/* Pending (striped) */}
          <div
            ref={pendingBarRef}
            className="h-full flex-shrink-0"
            style={{
              width: "0%",
              background: `repeating-linear-gradient(
                90deg,
                #F59E0B,
                #F59E0B 4px,
                #FBBF24 4px,
                #FBBF24 8px
              )`,
            }}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="relative grid grid-cols-3 gap-4 pt-6 border-t border-[var(--color-border-subtle)]">
        <div>
          <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-wide mb-1.5 font-medium">
            Earned
          </p>
          <p className="text-xl font-semibold text-[var(--color-success)]">
            {formatCurrency(earnedAmount, currency)}
          </p>
        </div>
        <div>
          <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-wide mb-1.5 font-medium">
            Pending
          </p>
          <p className="text-xl font-semibold text-amber-500">
            {formatCurrency(pendingAmount, currency)}
          </p>
        </div>
        <div>
          <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-wide mb-1.5 font-medium">
            Status
          </p>
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${onTrack ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${onTrack ? "bg-emerald-500" : "bg-orange-500"}`} />
            {onTrack ? "On Track" : "Behind"}
          </div>
        </div>
      </div>
    </div>
  );
}
