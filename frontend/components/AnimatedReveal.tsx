"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface AnimatedRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

export function AnimatedReveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 60,
  className = "",
}: AnimatedRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      {
        y: y,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: "power3.out",
      }
    );
  }, [delay, duration, y]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={contentRef} style={{ opacity: 0 }}>
        {children}
      </div>
    </div>
  );
}

interface StaggerRevealProps {
  children: ReactNode[];
  stagger?: number;
  baseDelay?: number;
  className?: string;
}

export function StaggerReveal({
  children,
  stagger = 0.1,
  baseDelay = 0.2,
  className = "",
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".stagger-item");

    gsap.fromTo(
      items,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: stagger,
        delay: baseDelay,
        ease: "power3.out",
      }
    );
  }, [stagger, baseDelay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
