"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { RevenueDataPoint } from "@/lib/mockData";

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function RevenueChart({ data }: RevenueChartProps) {
  const earnedPathRef = useRef<SVGPathElement>(null);
  const projectedPathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const width = 800;
  const height = 280;
  const padding = { top: 40, right: 24, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate scales
  const maxValue = Math.max(...data.flatMap((d) => [d.earned, d.projected])) * 1.1;
  const xStep = chartWidth / (data.length - 1);

  // Generate path data
  const generatePath = (key: "earned" | "projected"): string => {
    return data
      .map((d, i) => {
        const x = padding.left + i * xStep;
        const y = padding.top + chartHeight - (d[key] / maxValue) * chartHeight;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  const earnedPath = generatePath("earned");
  const projectedPath = generatePath("projected");

  // Y-axis ticks
  const yTicks = [0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue];

  useEffect(() => {
    if (!earnedPathRef.current || !projectedPathRef.current) return;

    // Get path lengths
    const earnedLength = earnedPathRef.current.getTotalLength();
    const projectedLength = projectedPathRef.current.getTotalLength();

    // Set up initial state
    gsap.set(earnedPathRef.current, {
      strokeDasharray: earnedLength,
      strokeDashoffset: earnedLength,
    });
    gsap.set(projectedPathRef.current, {
      strokeDasharray: projectedLength,
      strokeDashoffset: projectedLength,
    });

    // Animate line drawing
    const tl = gsap.timeline({ delay: 0.6 });

    tl.to(projectedPathRef.current, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    tl.to(
      earnedPathRef.current,
      {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      "-=1"
    );
  }, [data]);

  return (
    <div className="card p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium tracking-tight">Revenue Trend</h2>
          <p className="text-[var(--color-text-secondary)] text-sm mt-1">
            Last 12 weeks performance
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-[var(--color-accent-primary)]" />
            <span className="text-xs text-[var(--color-text-secondary)]">Earned</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-0.5"
              style={{
                background: `repeating-linear-gradient(
                  90deg,
                  var(--color-text-secondary),
                  var(--color-text-secondary) 3px,
                  transparent 3px,
                  transparent 6px
                )`,
              }}
            />
            <span className="text-xs text-[var(--color-text-secondary)]">Projected</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div ref={containerRef} className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[600px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          {yTicks.map((tick, i) => {
            const y = padding.top + chartHeight - (tick / maxValue) * chartHeight;
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="var(--color-border-subtle)"
                  strokeWidth="1"
                  strokeDasharray={i === 0 ? "0" : "4 4"}
                />
                <text
                  x={padding.left - 12}
                  y={y}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  fill="var(--color-text-secondary)"
                  fontSize="11"
                  fontFamily="var(--font-family-sans)"
                >
                  {formatCurrency(tick)}
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {data.map((d, i) => {
            const x = padding.left + i * xStep;
            // Show every other label on smaller datasets, every third on larger
            if (i % 2 !== 0 && data.length > 8) return null;
            return (
              <text
                key={i}
                x={x}
                y={height - 12}
                textAnchor="middle"
                fill="var(--color-text-secondary)"
                fontSize="11"
                fontFamily="var(--font-family-sans)"
              >
                {d.date}
              </text>
            );
          })}

          {/* Projected path (dashed, behind) */}
          <path
            ref={projectedPathRef}
            d={projectedPath}
            fill="none"
            stroke="var(--color-text-secondary)"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.5"
          />

          {/* Earned path (solid, front) */}
          <path
            ref={earnedPathRef}
            d={earnedPath}
            fill="none"
            stroke="var(--color-accent-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points for earned */}
          {data.map((d, i) => {
            const x = padding.left + i * xStep;
            const y = padding.top + chartHeight - (d.earned / maxValue) * chartHeight;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="var(--color-bg-surface)"
                stroke="var(--color-accent-primary)"
                strokeWidth="2"
                className="opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
