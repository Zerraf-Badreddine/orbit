"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Project } from "@/lib/mockData";

interface ProjectListProps {
  projects: Project[];
}

const statusColors = {
  active: { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-500" },
  paused: { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500" },
  completed: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500" },
  archived: { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-500" },
};

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "Ongoing";
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays <= 7) return `${diffDays} days`;
  
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ProjectList({ projects }: ProjectListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".project-item");
    gsap.fromTo(items, 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="rounded-2xl bg-white border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-0">
        <div>
          <h2 className="text-lg font-semibold">Active Projects</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">{projects.length} projects in progress</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-[var(--color-accent-primary)] hover:bg-orange-50 rounded-lg transition-colors">
          View All →
        </button>
      </div>

      {/* List */}
      <div ref={containerRef} className="divide-y divide-[var(--color-border-subtle)]">
        {projects.map((project) => {
          const progressPercentage = (project.hoursLogged / project.hoursEstimated) * 100;
          const invoicePercentage = (project.invoicedAmount / project.totalValue) * 100;
          const colors = statusColors[project.status as keyof typeof statusColors] || statusColors.active;

          return (
            <div
              key={project.id}
              className="project-item group p-6 hover:bg-gradient-to-r hover:from-[var(--color-bg-muted)]/50 hover:to-transparent cursor-pointer transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Color indicator */}
                <div 
                  className="w-1.5 h-14 rounded-full flex-shrink-0 group-hover:scale-y-110 transition-transform"
                  style={{ backgroundColor: project.color }}
                />

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-base group-hover:text-[var(--color-accent-primary)] transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {project.client.name}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                      {project.status}
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    {/* Time Progress */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[var(--color-text-muted)] font-medium">Time</span>
                        <span className="font-semibold">{project.hoursLogged}h / {project.hoursEstimated}h</span>
                      </div>
                      <div className="h-2 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full relative transition-all duration-700"
                          style={{
                            width: `${Math.min(progressPercentage, 100)}%`,
                            backgroundColor: project.color,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_2s_infinite]" />
                        </div>
                      </div>
                    </div>

                    {/* Invoice Progress */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[var(--color-text-muted)] font-medium">Invoiced</span>
                        <span className="font-semibold">{formatCurrency(project.invoicedAmount, project.currency)}</span>
                      </div>
                      <div className="h-2 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full relative transition-all duration-700"
                          style={{ width: `${Math.min(invoicePercentage, 100)}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_2s_infinite]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side info */}
                <div className="text-right flex-shrink-0">
                  <p className="font-serif text-xl tracking-tight">{formatCurrency(project.totalValue, project.currency)}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Due {formatDate(project.deadline)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
