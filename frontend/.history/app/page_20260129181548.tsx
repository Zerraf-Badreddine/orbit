"use client";

import { useQuery } from "@tanstack/react-query";
import { AnimatedReveal, StaggerReveal } from "@/components/AnimatedReveal";
import { DashboardHeader } from "@/components/DashboardHeader";
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

export default function Dashboard() {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[var(--color-accent-primary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-[var(--color-text-secondary)] text-sm">Loading your orbit...</p>
        </div>
      </div>
    );
  }

  if (!summary || !projects || !chartData) {
    return null;
  }

  return (
    <main className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[var(--color-bg-main)]/80 backdrop-blur-md border-b border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="12" y1="2" x2="12" y2="4" />
                  <line x1="12" y1="20" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="4" y2="12" />
                  <line x1="20" y1="12" x2="22" y2="12" />
                </svg>
              </div>
              <span className="font-semibold tracking-tight">Orbit</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#"
                className="text-sm font-medium text-[var(--color-text-primary)] border-b-2 border-[var(--color-accent-primary)] pb-0.5"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Projects
              </a>
              <a
                href="#"
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Time
              </a>
              <a
                href="#"
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Invoices
              </a>
              <a
                href="#"
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Clients
              </a>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button className="w-9 h-9 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center hover:border-[var(--color-text-secondary)] transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-accent-primary)] to-orange-400 flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-16">
        <AnimatedReveal delay={0}>
          <DashboardHeader periodLabel={summary.period.label} />
        </AnimatedReveal>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <AnimatedReveal delay={0.1} className="lg:col-span-1">
            <BandwidthCard
              hoursAvailable={summary.bandwidth.hoursAvailable}
              hoursCommitted={summary.bandwidth.hoursCommitted}
              hoursLogged={summary.bandwidth.hoursLogged}
              utilizationPercentage={summary.bandwidth.utilizationPercentage}
            />
          </AnimatedReveal>

          <AnimatedReveal delay={0.2} className="lg:col-span-1">
            <RevenueCard
              targetAmount={summary.revenue.targetAmount}
              earnedAmount={summary.revenue.earnedAmount}
              pendingAmount={summary.revenue.pendingAmount}
              currency={summary.revenue.currency}
            />
          </AnimatedReveal>

          <AnimatedReveal delay={0.3} className="lg:col-span-1">
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

      {/* Footer */}
      <footer className="border-t border-[var(--color-border-subtle)] mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-secondary)]">
            <p>© 2026 Orbit. Built for freelancers who value their time.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">
                Help
              </a>
              <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
