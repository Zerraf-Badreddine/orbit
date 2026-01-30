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
  const pathRef = useRef<SVGPathElement>(null);
  
  const width = 800;
  const height = 250;
  const padding = { top: 20, right: 0, bottom: 20, left: 0 };
  
  const maxY = Math.max(...data.map(d => Math.max(d.earned, d.projected))) * 1.1;
  const getX = (i: number) => (i / (data.length - 1)) * width;
  const getY = (v: number) => height - (v / maxY) * height;

  const earnedPath = data.map((d, i) => `${i===0?'M':'L'} ${getX(i)} ${getY(d.earned)}`).join(" ");

  useEffect(() => {
    if (pathRef.current) {
        const len = pathRef.current.getTotalLength();
        gsap.fromTo(pathRef.current, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" });
    }
  }, [data]);

  return (
    <div className="card p-8 bg-white">
      <div className="mb-8">
        <h2 className="text-lg font-serif">Revenue Trend</h2>
        <div className="h-px bg-[#F2F2F2] w-full mt-4" />
      </div>
      
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Simple Grid */}
          <line x1="0" y1={height} x2={width} y2={height} stroke="#E5E5E5" strokeWidth="1" />
          
          {/* Line - Thin, Black */}
          <path 
             ref={pathRef}
             d={earnedPath} 
             fill="none" 
             stroke="#111" 
             strokeWidth="1.5"
          />
          
          {/* Dots - Minimal */}
          {data.map((d, i) => (
             <circle key={i} cx={getX(i)} cy={getY(d.earned)} r="3" fill="#fff" stroke="#111" strokeWidth="1.5" />
          ))}
      </svg>
    </div>
  );
}
