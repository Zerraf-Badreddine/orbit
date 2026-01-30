"use client";

import { useQuery } from "@tanstack/react-query";
import { AnimatedReveal, StaggerReveal } from "@/components/AnimatedReveal";
import { BandwidthCard } from "@/components/BandwidthCard";
import { RevenueCard } from "@/components/RevenueCard";
import { HealthScore } from "@/components/HealthScore";
import { ProjectList } from "@/components/ProjectList";
import { RevenueChart } from "@/components/RevenueChart";
import {
  fetchDashboardSummary,
  fetchProjects,
  fetchRevenueChart,
} from "@/lib/mockData";

export default function DashboardPage() {
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: fetchDashboardSummary,
  });

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const { data: chartData, isLoading: chartLoading } = useQuery({
    queryKey: ["revenue-chart"],
    queryFn: fetchRevenueChart,
  });

  if (summaryLoading || projectsLoading || chartLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[var(--color-accent-primary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-[var(--color-text-secondary)] text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!summary || !projects || !chartData) return null;

  const greeting = getGreeting();
  function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <AnimatedReveal delay={0}>
        <header className="mb-10">
          <p className="text-[var(--color-text-secondary)] text-sm font-medium tracking-wide uppercase mb-1">
            {greeting}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h1 className="text-3xl lg:text-4xl font-serif tracking-tight">
              Dashboard
            </h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded text-sm font-medium hover:border-[var(--color-text-secondary)] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {summary.period.label}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-primary)] text-white rounded text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Log Time
              </button>
            </div>
          </div>
        </header>
      </AnimatedReveal>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <AnimatedReveal delay={0.1}>
          <BandwidthCard
            hoursAvailable={summary.bandwidth.hoursAvailable}
            hoursCommitted={summary.bandwidth.hoursCommitted}
            hoursLogged={summary.bandwidth.hoursLogged}
            utilizationPercentage={summary.bandwidth.utilizationPercentage}
          />
        </AnimatedReveal>
        <AnimatedReveal delay={0.2}>
          <RevenueCard
            targetAmount={summary.revenue.targetAmount}
            earnedAmount={summary.revenue.earnedAmount}
            pendingAmount={summary.revenue.pendingAmount}
            currency={summary.revenue.currency}
          />
        </AnimatedReveal>
        <AnimatedReveal delay={0.3}>
          <HealthScore score={summary.healthScore} />
        </AnimatedReveal>
      </div>

      {/* Revenue Chart */}
      <AnimatedReveal delay={0.4} className="mb-8">
        <RevenueChart data={chartData} />
      </AnimatedReveal>

      {/* Projects List */}
      <AnimatedReveal delay={0.5}>
        <StaggerReveal stagger={0.08} baseDelay={0.6}>
          <ProjectList projects={projects} />
        </StaggerReveal>
      </AnimatedReveal>
    </div>
  );
}
