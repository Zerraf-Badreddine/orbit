"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  projectsCount: number;
  totalRevenue: number;
  currency: string;
  status: "active" | "inactive";
  avatar?: string;
  color: string;
}

const mockClients: Client[] = [
  { id: "cli_1", name: "Michael Chen", email: "michael@acmecorp.com", company: "Acme Corp", projectsCount: 3, totalRevenue: 24500, currency: "USD", status: "active", color: "#EA580C" },
  { id: "cli_2", name: "Sarah Johnson", email: "sarah@startupxyz.io", company: "StartupXYZ", projectsCount: 1, totalRevenue: 18000, currency: "USD", status: "active", color: "#2563EB" },
  { id: "cli_3", name: "James Wilson", email: "james@techflow.com", company: "TechFlow Inc", projectsCount: 2, totalRevenue: 35000, currency: "USD", status: "active", color: "#16A34A" },
  { id: "cli_4", name: "Emma Davis", email: "emma@retailmax.com", company: "RetailMax", projectsCount: 1, totalRevenue: 35000, currency: "USD", status: "inactive", color: "#9333EA" },
  { id: "cli_5", name: "David Park", email: "david@innovate.co", company: "Innovate Co", projectsCount: 2, totalRevenue: 12000, currency: "USD", status: "active", color: "#DC2626" },
];

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: 0 }).format(amount);
}

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [showDetail, setShowDetail] = useState<Client | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredClients = mockClients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".client-card");
    gsap.fromTo(cards, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" });
  }, [search]);

  const totalRevenue = mockClients.reduce((sum, c) => sum + c.totalRevenue, 0);
  const activeClients = mockClients.filter((c) => c.status === "active").length;

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="text-[var(--color-text-secondary)] text-sm uppercase tracking-wide mb-1">Directory</p>
            <h1 className="text-3xl lg:text-4xl font-serif tracking-tight">Clients</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-primary)] text-white rounded text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Client
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Total Clients</p>
          <p className="font-serif text-2xl">{mockClients.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Active</p>
          <p className="font-serif text-2xl text-[var(--color-success)]">{activeClients}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Total Revenue</p>
          <p className="font-serif text-2xl">{formatCurrency(totalRevenue, "USD")}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Avg. per Client</p>
          <p className="font-serif text-2xl">{formatCurrency(totalRevenue / mockClients.length, "USD")}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients..."
            className="w-full pl-11 pr-4 py-2.5 border border-[var(--color-border-subtle)] rounded bg-[var(--color-bg-surface)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div ref={containerRef} className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            onClick={() => setShowDetail(client)}
            className="client-card card p-6 cursor-pointer hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-lg"
                style={{ backgroundColor: client.color }}
              >
                {client.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{client.name}</h3>
                  <span className={`w-2 h-2 rounded-full ${client.status === "active" ? "bg-[var(--color-success)]" : "bg-gray-400"}`} />
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] truncate">{client.company}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--color-border-subtle)]">
              <div>
                <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Projects</p>
                <p className="font-medium">{client.projectsCount}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Revenue</p>
                <p className="font-serif text-lg">{formatCurrency(client.totalRevenue, client.currency)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[var(--color-text-secondary)]">No clients found</p>
        </div>
      )}

      {/* Client Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDetail(null)} />
          <div className="relative bg-[var(--color-bg-surface)] rounded-lg w-full max-w-lg mx-4 p-8 shadow-[var(--shadow-elevated)]">
            <button onClick={() => setShowDetail(null)} className="absolute top-4 right-4 p-1 hover:bg-[var(--color-bg-main)] rounded">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-medium text-xl"
                style={{ backgroundColor: showDetail.color }}
              >
                {showDetail.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h2 className="text-xl font-serif">{showDetail.name}</h2>
                <p className="text-[var(--color-text-secondary)]">{showDetail.company}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-main)] rounded">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-text-secondary)]">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{showDetail.email}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[var(--color-bg-main)] rounded">
                <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Projects</p>
                <p className="font-serif text-2xl">{showDetail.projectsCount}</p>
              </div>
              <div className="p-4 bg-[var(--color-bg-main)] rounded">
                <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Total Revenue</p>
                <p className="font-serif text-2xl">{formatCurrency(showDetail.totalRevenue, showDetail.currency)}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-2.5 border border-[var(--color-border-subtle)] rounded font-medium hover:bg-[var(--color-bg-main)] transition-colors">
                View Projects
              </button>
              <button className="flex-1 py-2.5 bg-[var(--color-accent-primary)] text-white rounded font-medium hover:bg-[var(--color-accent-hover)] transition-colors">
                New Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
