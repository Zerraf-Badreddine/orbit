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
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  const remainingHours = hoursAvailable - hoursCommitted;
  const loggedPercentage = (hoursLogged / hoursCommitted) * 100;

  useEffect(() => {
    // Animate progress bar
    if (progressRef.current) {
      gsap.fromTo(progressRef.current, 
        { width: "0%" },
        { width: `${Math.min(loggedPercentage, 100)}%`, duration: 1.2, delay: 0.3, ease: "power3.out" }
      );
    }

    // Animate number counting
    if (numberRef.current) {
      gsap.fromTo({ val: 0 }, { val: hoursLogged }, {
        duration: 1.5,
        delay: 0.2,
        ease: "power3.out",
        onUpdate: function() {
          if (numberRef.current) {
            numberRef.current.textContent = this.targets()[0].val.toFixed(1);
          }
        }
      });
    }
  }, [hoursLogged, loggedPercentage]);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white border border-[var(--color-border-subtle)] p-8 lg:p-10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Header */}
      <div className="relative flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)] animate-pulse" />
            <p className="text-[var(--color-text-muted)] text-sm font-medium tracking-wide uppercase">
              Bandwidth
            </p>
          </div>
          <p className="text-[var(--color-text-secondary)] text-sm">
            Time availability this month
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-primary)" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
      </div>

      {/* Main Number */}
      <div className="relative mb-8">
        <div className="flex items-baseline gap-3">
          <span ref={numberRef} className="font-serif text-6xl lg:text-7xl tracking-tighter text-[var(--color-text-primary)]">
            0.0
          </span>
          <span className="text-[var(--color-text-muted)] text-xl font-medium">
            hours
          </span>
        </div>
        <p className="text-[var(--color-text-secondary)] text-base mt-2">
          of {hoursCommitted}h committed
        </p>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-3 bg-gradient-to-r from-[var(--color-bg-muted)] to-[var(--color-bg-main)] rounded-full overflow-hidden shadow-inner">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-[var(--color-accent-primary)] to-orange-400 rounded-full relative"
            style={{ width: "0%" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="relative grid grid-cols-3 gap-4 pt-6 border-t border-[var(--color-border-subtle)]">
        <div>
          <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-wide mb-1.5 font-medium">
            Available
          </p>
          <p className="text-xl font-semibold">{hoursAvailable}h</p>
        </div>
        <div>
          <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-wide mb-1.5 font-medium">
            Remaining
          </p>
          <p className="text-xl font-semibold">{remainingHours}h</p>
        </div>
        <div>
          <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-wide mb-1.5 font-medium">
            Utilization
          </p>
          <p className="text-xl font-semibold text-[var(--color-accent-primary)]">{utilizationPercentage.toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
}
