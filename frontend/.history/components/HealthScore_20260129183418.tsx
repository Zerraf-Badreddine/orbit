"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HealthScoreProps {
  score: number;
}

export function HealthScore({ score }: HealthScoreProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return { main: "#10B981", light: "#D1FAE5", gradient: "from-emerald-500 to-green-400" };
    if (score >= 60) return { main: "#F59E0B", light: "#FEF3C7", gradient: "from-amber-500 to-yellow-400" };
    return { main: "#EF4444", light: "#FEE2E2", gradient: "from-red-500 to-orange-400" };
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Attention";
    return "Critical";
  };

  const colors = getScoreColor();

  useEffect(() => {
    if (!circleRef.current || !numberRef.current) return;

    // Animate circle drawing
    gsap.fromTo(
      circleRef.current,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: strokeDashoffset,
        duration: 1.8,
        delay: 0.4,
        ease: "power3.out",
      }
    );

    // Animate glow
    if (glowRef.current) {
      gsap.fromTo(
        glowRef.current,
        { strokeDashoffset: circumference, opacity: 0 },
        {
          strokeDashoffset: strokeDashoffset,
          opacity: 0.5,
          duration: 1.8,
          delay: 0.4,
          ease: "power3.out",
        }
      );
    }

    // Animate number counting
    gsap.fromTo(
      { value: 0 },
      { value: score },
      {
        duration: 1.8,
        delay: 0.4,
        ease: "power3.out",
        onUpdate: function () {
          if (numberRef.current) {
            numberRef.current.textContent = Math.round(this.targets()[0].value).toString();
          }
        },
      }
    );

    // Subtle pulse animation on the container
    gsap.to(containerRef.current, {
      scale: 1.02,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, [score, circumference, strokeDashoffset]);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white border border-[var(--color-border-subtle)] p-8 lg:p-10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 flex flex-col items-center justify-center text-center">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Header */}
      <div className="relative mb-6">
        <div className="flex items-center gap-2 justify-center">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.main }} />
          <p className="text-[var(--color-text-muted)] text-sm font-medium tracking-wide uppercase">
            Health Score
          </p>
        </div>
      </div>

      {/* Circular Progress */}
      <div ref={containerRef} className="relative w-52 h-52 mb-6">
        {/* Background glow */}
        <div 
          className="absolute inset-4 rounded-full blur-2xl opacity-20"
          style={{ backgroundColor: colors.main }}
        />
        
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--color-bg-muted)"
            strokeWidth="10"
          />
          {/* Glow circle */}
          <circle
            ref={glowRef}
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={colors.main}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            filter="blur(8px)"
          />
          {/* Progress circle */}
          <circle
            ref={circleRef}
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={colors.main}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            ref={numberRef}
            className="font-serif text-6xl tracking-tighter"
            style={{ color: colors.main }}
          >
            0
          </span>
          <span className="text-[var(--color-text-muted)] text-sm font-medium mt-1">
            / 100
          </span>
        </div>
      </div>

      {/* Label */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
        style={{ backgroundColor: colors.light, color: colors.main }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          {score >= 60 ? (
            <polyline points="20 6 9 17 4 12" />
          ) : (
            <path d="M12 9v4m0 4h.01" />
          )}
        </svg>
        {getScoreLabel()}
      </div>

      <p className="text-[var(--color-text-secondary)] text-sm mt-4 max-w-[220px]">
        Based on bandwidth utilization and revenue progress
      </p>
    </div>
  );
}
