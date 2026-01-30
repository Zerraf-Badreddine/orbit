"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface TimeEntry {
  id: string;
  projectId: string;
  projectName: string;
  projectColor: string;
  description: string;
  date: string;
  hours: number;
  billable: boolean;
}

const mockTimeEntries: TimeEntry[] = [
  { id: "t1", projectId: "proj_a1b2c3d4", projectName: "Brand Redesign", projectColor: "#EA580C", description: "Logo exploration and concepts", date: "2026-01-29", hours: 3.5, billable: true },
  { id: "t2", projectId: "proj_a1b2c3d4", projectName: "Brand Redesign", projectColor: "#EA580C", description: "Client feedback call", date: "2026-01-29", hours: 1.0, billable: true },
  { id: "t3", projectId: "proj_e5f6g7h8", projectName: "Mobile App MVP", projectColor: "#2563EB", description: "User flow wireframes", date: "2026-01-28", hours: 4.0, billable: true },
  { id: "t4", projectId: "proj_i9j0k1l2", projectName: "Monthly Retainer", projectColor: "#16A34A", description: "Website maintenance", date: "2026-01-28", hours: 2.5, billable: true },
  { id: "t5", projectId: "proj_e5f6g7h8", projectName: "Mobile App MVP", projectColor: "#2563EB", description: "Prototype testing", date: "2026-01-27", hours: 3.0, billable: true },
  { id: "t6", projectId: "proj_a1b2c3d4", projectName: "Brand Redesign", projectColor: "#EA580C", description: "Color palette refinement", date: "2026-01-27", hours: 2.0, billable: true },
  { id: "t7", projectId: "proj_i9j0k1l2", projectName: "Monthly Retainer", projectColor: "#16A34A", description: "Bug fixes and updates", date: "2026-01-26", hours: 3.5, billable: true },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function TimePage() {
  const [view, setView] = useState<"list" | "week">("list");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => setTimerSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".time-entry");
    gsap.fromTo(items, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" });
  }, [view]);

  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const totalHoursToday = mockTimeEntries.filter((e) => e.date === "2026-01-29").reduce((sum, e) => sum + e.hours, 0);
  const totalHoursWeek = mockTimeEntries.reduce((sum, e) => sum + e.hours, 0);

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="text-[var(--color-text-secondary)] text-sm uppercase tracking-wide mb-1">Track</p>
            <h1 className="text-3xl lg:text-4xl font-serif tracking-tight">Time</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${view === "list" ? "bg-[var(--color-text-primary)] text-white" : "bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)]"}`}
            >
              List
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${view === "week" ? "bg-[var(--color-text-primary)] text-white" : "bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)]"}`}
            >
              Week
            </button>
          </div>
        </div>
      </header>

      {/* Timer Section */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <input
            type="text"
            placeholder="What are you working on?"
            className="flex-1 px-4 py-3 border border-[var(--color-border-subtle)] rounded bg-[var(--color-bg-main)] focus:outline-none focus:border-[var(--color-accent-primary)]"
          />
          <select className="px-4 py-3 border border-[var(--color-border-subtle)] rounded bg-[var(--color-bg-main)] focus:outline-none">
            <option>Brand Redesign</option>
            <option>Mobile App MVP</option>
            <option>Monthly Retainer</option>
          </select>
          <div className="flex items-center gap-4">
            <span className="font-mono text-2xl font-medium w-28 text-center">{formatTimer(timerSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors ${isTimerRunning ? "bg-red-500 hover:bg-red-600" : "bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)]"}`}
            >
              {isTimerRunning ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Today</p>
          <p className="font-serif text-2xl">{totalHoursToday}h</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">This Week</p>
          <p className="font-serif text-2xl">{totalHoursWeek}h</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Billable</p>
          <p className="font-serif text-2xl text-[var(--color-success)]">100%</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Entries</p>
          <p className="font-serif text-2xl">{mockTimeEntries.length}</p>
        </div>
      </div>

      {/* Time Entries */}
      {view === "list" ? (
        <div ref={containerRef} className="card overflow-hidden">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {mockTimeEntries.map((entry) => (
              <div key={entry.id} className="time-entry p-4 lg:p-6 hover:bg-[var(--color-bg-main)] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.projectColor }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{entry.description}</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{entry.projectName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-lg">{entry.hours}h</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{entry.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card p-6">
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, i) => (
              <div key={day} className="text-center">
                <p className="text-xs text-[var(--color-text-secondary)] uppercase mb-2">{day}</p>
                <div className="h-32 bg-[var(--color-bg-main)] rounded p-2">
                  {mockTimeEntries.filter((_, idx) => idx % 7 === i).slice(0, 2).map((entry) => (
                    <div key={entry.id} className="text-xs p-1 mb-1 rounded truncate" style={{ backgroundColor: entry.projectColor + "20", color: entry.projectColor }}>
                      {entry.hours}h
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
