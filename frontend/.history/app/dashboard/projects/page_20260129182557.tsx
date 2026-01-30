"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projects, Project } from "@/lib/mockData";

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "Ongoing";
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "paused" | "completed">("all");
  const [showNewModal, setShowNewModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter(p => filter === "all" || p.status === filter);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".project-card");
    gsap.fromTo(cards, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" });
  }, [filter]);

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="text-[var(--color-text-secondary)] text-sm uppercase tracking-wide mb-1">Manage</p>
            <h1 className="text-3xl lg:text-4xl font-serif tracking-tight">Projects</h1>
          </div>
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-primary)] text-white rounded text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Project
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-8">
        {(["all", "active", "paused", "completed"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors capitalize ${
              filter === status
                ? "bg-[var(--color-text-primary)] text-white"
                : "bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-text-secondary)]"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div ref={containerRef} className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[var(--color-text-secondary)]">No projects found</p>
        </div>
      )}

      {/* New Project Modal */}
      {showNewModal && (
        <NewProjectModal onClose={() => setShowNewModal(false)} />
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const progressPercentage = (project.hoursLogged / project.hoursEstimated) * 100;

  return (
    <div className="project-card card p-6 hover:shadow-[var(--shadow-card-hover)]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
              project.status === "active"
                ? "bg-green-100 text-green-700"
                : project.status === "paused"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {project.status}
          </span>
        </div>
        <button className="p-1 hover:bg-[var(--color-bg-main)] rounded transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      <h3 className="text-lg font-medium mb-1">{project.name}</h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">{project.client.name}</p>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[var(--color-text-secondary)]">Progress</span>
            <span>{progressPercentage.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 bg-[var(--color-bg-main)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${Math.min(progressPercentage, 100)}%`, backgroundColor: project.color }}
            />
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <div>
            <p className="text-[var(--color-text-secondary)]">Value</p>
            <p className="font-serif text-lg">{formatCurrency(project.totalValue, project.currency)}</p>
          </div>
          <div className="text-right">
            <p className="text-[var(--color-text-secondary)]">Deadline</p>
            <p className="font-medium">{formatDate(project.deadline)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewProjectModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-[var(--color-bg-surface)] rounded-lg w-full max-w-lg mx-4 p-6 shadow-[var(--shadow-elevated)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif">New Project</h2>
          <button onClick={onClose} className="p-1 hover:bg-[var(--color-bg-main)] rounded">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Project Name</label>
            <input type="text" placeholder="e.g., Website Redesign" className="w-full px-4 py-2.5 border border-[var(--color-border-subtle)] rounded focus:outline-none focus:border-[var(--color-accent-primary)]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Client</label>
            <input type="text" placeholder="e.g., Acme Corp" className="w-full px-4 py-2.5 border border-[var(--color-border-subtle)] rounded focus:outline-none focus:border-[var(--color-accent-primary)]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Billing Type</label>
              <select className="w-full px-4 py-2.5 border border-[var(--color-border-subtle)] rounded focus:outline-none focus:border-[var(--color-accent-primary)]">
                <option>Hourly</option>
                <option>Fixed Price</option>
                <option>Retainer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rate</label>
              <input type="number" placeholder="150" className="w-full px-4 py-2.5 border border-[var(--color-border-subtle)] rounded focus:outline-none focus:border-[var(--color-accent-primary)]" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Deadline</label>
            <input type="date" className="w-full px-4 py-2.5 border border-[var(--color-border-subtle)] rounded focus:outline-none focus:border-[var(--color-accent-primary)]" />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-[var(--color-border-subtle)] rounded font-medium hover:bg-[var(--color-bg-main)] transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 bg-[var(--color-accent-primary)] text-white rounded font-medium hover:bg-[var(--color-accent-hover)] transition-colors">
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
