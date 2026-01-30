"use client";

interface RevenueCardProps {
  targetAmount: number;
  earnedAmount: number;
  pendingAmount: number;
  currency: string;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function RevenueCard({
  targetAmount,
  earnedAmount,
  pendingAmount,
  currency,
}: RevenueCardProps) {
  const progressPercentage = (earnedAmount / targetAmount) * 100;
  const projectedTotal = earnedAmount + pendingAmount;
  const onTrack = projectedTotal >= targetAmount * 0.9;

  return (
    <div className="card p-8 lg:p-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[var(--color-text-secondary)] text-sm font-medium tracking-wide uppercase mb-1">
            Revenue
          </p>
          <p className="text-[var(--color-text-secondary)] text-sm">
            Income progress this month
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
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
      </div>

      {/* Main Number */}
      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-6xl lg:text-7xl tracking-tighter text-[var(--color-text-primary)]">
            {formatCurrency(earnedAmount, currency)}
          </span>
        </div>
        <p className="text-[var(--color-text-secondary)] text-lg mt-2">
          of {formatCurrency(targetAmount, currency)} target
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-[var(--color-bg-main)] rounded-full overflow-hidden relative">
          {/* Earned */}
          <div
            className="h-full bg-[var(--color-success)] rounded-full absolute left-0 top-0 transition-all duration-700 ease-out"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
          {/* Pending (striped) */}
          <div
            className="h-full absolute top-0 transition-all duration-700 ease-out opacity-50"
            style={{
              left: `${Math.min(progressPercentage, 100)}%`,
              width: `${Math.min((pendingAmount / targetAmount) * 100, 100 - progressPercentage)}%`,
              background: `repeating-linear-gradient(
                45deg,
                var(--color-warning),
                var(--color-warning) 4px,
                transparent 4px,
                transparent 8px
              )`,
            }}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-[var(--color-text-secondary)] text-xs uppercase tracking-wide mb-1">
            Earned
          </p>
          <p className="text-lg font-medium text-[var(--color-success)]">
            {formatCurrency(earnedAmount, currency)}
          </p>
        </div>
        <div>
          <p className="text-[var(--color-text-secondary)] text-xs uppercase tracking-wide mb-1">
            Pending
          </p>
          <p className="text-lg font-medium text-[var(--color-warning)]">
            {formatCurrency(pendingAmount, currency)}
          </p>
        </div>
        <div>
          <p className="text-[var(--color-text-secondary)] text-xs uppercase tracking-wide mb-1">
            Status
          </p>
          <p className={`text-lg font-medium ${onTrack ? "text-[var(--color-success)]" : "text-[var(--color-accent-primary)]"}`}>
            {onTrack ? "On Track" : "Behind"}
          </p>
        </div>
      </div>
    </div>
  );
}
