"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HealthScoreProps {
  score: number;
}

export function HealthScore({ score }: HealthScoreProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 80) return "var(--color-success)";
    if (score >= 60) return "var(--color-warning)";
    return "var(--color-accent-primary)";
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Attention";
    return "Critical";
  };

  useEffect(() => {
    if (!circleRef.current || !numberRef.current) return;

    // Animate circle drawing
    gsap.fromTo(
      circleRef.current,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: strokeDashoffset,
        duration: 1.5,
        delay: 0.5,
        ease: "power3.out",
      }
    );

    // Animate number counting
    gsap.fromTo(
      { value: 0 },
      { value: score },
      {
        duration: 1.5,
        delay: 0.5,
        ease: "power3.out",
        onUpdate: function () {
          if (numberRef.current) {
            numberRef.current.textContent = Math.round(this.targets()[0].value).toString();
          }
        },
      }
    );
  }, [score, circumference, strokeDashoffset]);

  return (
    <div className="card p-8 lg:p-10 flex flex-col items-center justify-center text-center">
      <p className="text-[var(--color-text-secondary)] text-sm font-medium tracking-wide uppercase mb-6">
        Health Score
      </p>

      {/* Circular Progress */}
      <div className="relative w-48 h-48 mb-6">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 160 160"
        >
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--color-bg-main)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            ref={circleRef}
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={getScoreColor()}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            ref={numberRef}
            className="font-serif text-5xl tracking-tighter"
            style={{ color: getScoreColor() }}
          >
            0
          </span>
        </div>
      </div>

      <p
        className="text-lg font-medium"
        style={{ color: getScoreColor() }}
      >
        {getScoreLabel()}
      </p>
      <p className="text-[var(--color-text-secondary)] text-sm mt-2 max-w-[200px]">
        Based on bandwidth utilization and revenue progress
      </p>
    </div>
  );
}
