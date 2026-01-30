"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface RevenueDataPoint {
  date: string;
  earned: number;
  projected: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const chartRef = useRef<SVGSVGElement>(null);
  const earnedPathRef = useRef<SVGPathElement>(null);
  const projectedPathRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);

  const width = 800;
  const height = 250;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map((d) => Math.max(d.earned, d.projected))) * 1.15;
  
  const getX = (index: number) => padding.left + (index / (data.length - 1)) * chartWidth;
  const getY = (value: number) => padding.top + chartHeight - (value / maxValue) * chartHeight;

  const earnedPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.earned)}`).join(" ");
  const projectedPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.projected)}`).join(" ");
  const areaPath = `${earnedPath} L ${getX(data.length - 1)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`;

  // Y-axis labels
  const yTicks = [0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue];

  useEffect(() => {
    if (!earnedPathRef.current || !projectedPathRef.current) return;

    const earnedLength = earnedPathRef.current.getTotalLength();
    const projectedLength = projectedPathRef.current.getTotalLength();

    gsap.set(earnedPathRef.current, { strokeDasharray: earnedLength, strokeDashoffset: earnedLength });
    gsap.set(projectedPathRef.current, { strokeDasharray: projectedLength, strokeDashoffset: projectedLength });

    const tl = gsap.timeline({ delay: 0.4 });

    // Animate area fade in
    if (areaRef.current) {
      tl.fromTo(areaRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, 0);
    }

    // Animate projected line
    tl.to(projectedPathRef.current, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }, 0);

    // Animate earned line
    tl.to(earnedPathRef.current, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }, 0.2);

    // Animate dots
    const dots = chartRef.current?.querySelectorAll(".chart-dot");
    if (dots) {
      gsap.fromTo(dots, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, delay: 1, ease: "back.out(2)" });
    }
  }, [data]);

  return (
    <div className="rounded-2xl bg-white border border-[var(--color-border-subtle)] p-6 lg:p-8 shadow-[var(--shadow-card)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Revenue Trend</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">Last 12 weeks performance</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-orange-400" />
            <span className="text-sm text-[var(--color-text-secondary)]">Earned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--color-text-muted)]" />
            <span className="text-sm text-[var(--color-text-secondary)]">Projected</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <svg ref={chartRef} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="earnedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-primary)" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={padding.left}
              y1={getY(tick)}
              x2={width - padding.right}
              y2={getY(tick)}
              stroke="var(--color-border-subtle)"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 12}
              y={getY(tick)}
              textAnchor="end"
              alignmentBaseline="middle"
              className="text-xs fill-[var(--color-text-muted)]"
            >
              ${(tick / 1000).toFixed(0)}k
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {data.filter((_, i) => i % 2 === 0).map((d, i) => (
          <text
            key={d.date}
            x={getX(i * 2)}
            y={height - 12}
            textAnchor="middle"
            className="text-xs fill-[var(--color-text-muted)]"
          >
            {d.date}
          </text>
        ))}

        {/* Area fill */}
        <path ref={areaRef} d={areaPath} fill="url(#areaGradient)" opacity="0" />

        {/* Projected line */}
        <path
          ref={projectedPathRef}
          d={projectedPath}
          fill="none"
          stroke="var(--color-text-muted)"
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeLinecap="round"
        />

        {/* Earned line */}
        <path
          ref={earnedPathRef}
          d={earnedPath}
          fill="none"
          stroke="url(#earnedGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((d, i) => (
          <g key={i} className="chart-dot">
            {/* Outer glow */}
            <circle
              cx={getX(i)}
              cy={getY(d.earned)}
              r="8"
              fill="var(--color-accent-primary)"
              opacity="0.15"
            />
            {/* Inner dot */}
            <circle
              cx={getX(i)}
              cy={getY(d.earned)}
              r="4"
              fill="white"
              stroke="var(--color-accent-primary)"
              strokeWidth="2"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
