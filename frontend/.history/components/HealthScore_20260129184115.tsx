"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HealthScoreProps {
  score: number;
}

export function HealthScore({ score }: HealthScoreProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  useEffect(() => {
    if (circleRef.current) {
        gsap.fromTo(circleRef.current, 
            { strokeDashoffset: circumference }, 
            { strokeDashoffset: offset, duration: 1.5, ease: "power2.out" }
        );
    }
  }, [score, circumference, offset]);

  // Color logic
  let color = "#111"; // Default black
  if(score < 50) color = "#EF4444";
  if(score >= 50 && score < 75) color = "#F59E0B";
  if(score >= 75) color = "#10B981";

  return (
    <div className="card p-6 bg-white flex flex-col items-center justify-center text-center">
       <h3 className="text-sm font-medium text-[#666] uppercase tracking-wide mb-4">Health Score</h3>
       
       <div className="relative w-40 h-40 mb-2">
         <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
           <circle cx="70" cy="70" r={radius} fill="none" stroke="#F2F2F2" strokeWidth="6" />
           <circle 
              ref={circleRef}
              cx="70" 
              cy="70" 
              r={radius} 
              fill="none" 
              stroke={color} 
              strokeWidth="6" 
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
            />
         </svg>
         <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-5xl text-[#111]">{score}</span>
         </div>
       </div>

       <span className="text-xs text-[#888]">{score >= 75 ? "Excellent Condition" : "Attention Needed"}</span>
    </div>
  );
}
