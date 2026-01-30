"use client";

interface DashboardHeaderProps {
  periodLabel: string;
}

export function DashboardHeader({ periodLabel }: DashboardHeaderProps) {
  const today = new Date();
  const greeting = getGreeting();

  function getGreeting(): string {
    const hour = today.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }

  return (
    <header className="mb-12 lg:mb-16">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <p className="text-[var(--color-text-secondary)] text-sm font-medium tracking-wide uppercase mb-2">
            {greeting}
          </p>
          <h1 className="text-4xl lg:text-5xl font-serif tracking-tight">
            Your Orbit
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Period Selector */}
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded text-sm font-medium hover:border-[var(--color-text-secondary)] transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {periodLabel}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Quick Actions */}
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-primary)] text-white rounded text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Log Time
          </button>
        </div>
      </div>
    </header>
  );
}
