"use client";

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
  const remainingHours = hoursAvailable - hoursCommitted;
  const loggedPercentage = (hoursLogged / hoursCommitted) * 100;

  return (
    <div className="card p-8 lg:p-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[var(--color-text-secondary)] text-sm font-medium tracking-wide uppercase mb-1">
            Bandwidth
          </p>
          <p className="text-[var(--color-text-secondary)] text-sm">
            Time availability this month
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[var(--color-bg-main)] flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[var(--color-text-secondary)]"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
      </div>

      {/* Main Number */}
      <div className="mb-8">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-6xl lg:text-7xl tracking-tighter text-[var(--color-text-primary)]">
            {hoursLogged.toFixed(1)}
          </span>
          <span className="text-[var(--color-text-secondary)] text-lg">
            / {hoursCommitted}h committed
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-[var(--color-bg-main)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-accent-primary)] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.min(loggedPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-[var(--color-text-secondary)] text-xs uppercase tracking-wide mb-1">
            Available
          </p>
          <p className="text-lg font-medium">{hoursAvailable}h</p>
        </div>
        <div>
          <p className="text-[var(--color-text-secondary)] text-xs uppercase tracking-wide mb-1">
            Remaining
          </p>
          <p className="text-lg font-medium">{remainingHours}h</p>
        </div>
        <div>
          <p className="text-[var(--color-text-secondary)] text-xs uppercase tracking-wide mb-1">
            Utilization
          </p>
          <p className="text-lg font-medium">{utilizationPercentage.toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
}
