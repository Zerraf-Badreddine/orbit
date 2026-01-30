"use client";

import { Project } from "@/lib/mockData";

interface ProjectListProps {
  projects: Project[];
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "Ongoing";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getStatusColor(status: Project["status"]): string {
  switch (status) {
    case "active":
      return "var(--color-success)";
    case "paused":
      return "var(--color-warning)";
    case "completed":
      return "var(--color-text-secondary)";
    default:
      return "var(--color-text-secondary)";
  }
}

function getBillingLabel(type: Project["billingType"]): string {
  switch (type) {
    case "hourly":
      return "Hourly";
    case "fixed":
      return "Fixed Price";
    case "retainer":
      return "Retainer";
  }
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="p-6 lg:p-8 border-b border-[var(--color-border-subtle)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium tracking-tight">Active Projects</h2>
            <p className="text-[var(--color-text-secondary)] text-sm mt-1">
              {projects.filter((p) => p.status === "active").length} active, {projects.length} total
            </p>
          </div>
          <button className="text-sm font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] transition-colors">
            View All →
          </button>
        </div>
      </div>

      {/* Project Rows */}
      <div className="divide-y divide-[var(--color-border-subtle)]">
        {projects.map((project, index) => {
          const progressPercentage = (project.hoursLogged / project.hoursEstimated) * 100;
          const invoicePercentage = (project.invoicedAmount / project.totalValue) * 100;

          return (
            <div
              key={project.id}
              className="stagger-item p-6 lg:p-8 hover:bg-[var(--color-bg-main)] transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-6">
                {/* Left: Project Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    {/* Color indicator */}
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: project.color }}
                    />
                    <h3 className="font-medium text-base truncate group-hover:text-[var(--color-accent-primary)] transition-colors">
                      {project.name}
                    </h3>
                    {/* Status badge */}
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full capitalize"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${getStatusColor(project.status)} 15%, transparent)`,
                        color: getStatusColor(project.status),
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                    <span>{project.client.name}</span>
                    <span>•</span>
                    <span>{getBillingLabel(project.billingType)}</span>
                    {project.rate > 0 && (
                      <>
                        <span>•</span>
                        <span>{formatCurrency(project.rate, project.currency)}/hr</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right: Stats */}
                <div className="flex items-center gap-8 flex-shrink-0">
                  {/* Hours */}
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">
                      Hours
                    </p>
                    <p className="font-medium">
                      {project.hoursLogged}
                      <span className="text-[var(--color-text-secondary)]">/{project.hoursEstimated}</span>
                    </p>
                  </div>

                  {/* Value */}
                  <div className="text-right">
                    <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">
                      Value
                    </p>
                    <p className="font-medium font-serif text-lg">
                      {formatCurrency(project.totalValue, project.currency)}
                    </p>
                  </div>

                  {/* Deadline */}
                  <div className="text-right hidden md:block w-20">
                    <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">
                      Due
                    </p>
                    <p className="font-medium">{formatDate(project.deadline)}</p>
                  </div>
                </div>
              </div>

              {/* Progress bars */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                {/* Hours progress */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mb-1">
                    <span>Time</span>
                    <span>{progressPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-1 bg-[var(--color-bg-main)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(progressPercentage, 100)}%`,
                        backgroundColor: project.color,
                      }}
                    />
                  </div>
                </div>

                {/* Invoice progress */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mb-1">
                    <span>Invoiced</span>
                    <span>{invoicePercentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-1 bg-[var(--color-bg-main)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-success)] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(invoicePercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
