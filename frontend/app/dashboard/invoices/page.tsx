"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface Invoice {
  id: string;
  number: string;
  client: string;
  project: string;
  amount: number;
  currency: string;
  status: "draft" | "sent" | "paid" | "overdue";
  issueDate: string;
  dueDate: string;
}

const mockInvoices: Invoice[] = [
  { id: "inv_1", number: "INV-2026-001", client: "Acme Corp", project: "Brand Redesign", amount: 6300, currency: "USD", status: "paid", issueDate: "2026-01-15", dueDate: "2026-01-30" },
  { id: "inv_2", number: "INV-2026-002", client: "StartupXYZ", project: "Mobile App MVP", amount: 9000, currency: "USD", status: "sent", issueDate: "2026-01-20", dueDate: "2026-02-05" },
  { id: "inv_3", number: "INV-2026-003", client: "TechFlow Inc", project: "Monthly Retainer", amount: 5000, currency: "USD", status: "paid", issueDate: "2026-01-01", dueDate: "2026-01-15" },
  { id: "inv_4", number: "INV-2026-004", client: "RetailMax", project: "E-commerce Platform", amount: 11200, currency: "USD", status: "overdue", issueDate: "2026-01-05", dueDate: "2026-01-20" },
  { id: "inv_5", number: "INV-2026-005", client: "Acme Corp", project: "Brand Redesign", amount: 4500, currency: "USD", status: "draft", issueDate: "2026-01-28", dueDate: "2026-02-12" },
];

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: 0 }).format(amount);
}

export default function InvoicesPage() {
  const [filter, setFilter] = useState<"all" | "draft" | "sent" | "paid" | "overdue">("all");
  const [showPreview, setShowPreview] = useState<Invoice | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredInvoices = mockInvoices.filter((inv) => filter === "all" || inv.status === filter);

  useEffect(() => {
    if (!containerRef.current) return;
    const rows = containerRef.current.querySelectorAll(".invoice-row");
    gsap.fromTo(rows, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" });
  }, [filter]);

  const totalPaid = mockInvoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);
  const totalPending = mockInvoices.filter((i) => i.status === "sent").reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = mockInvoices.filter((i) => i.status === "overdue").reduce((sum, i) => sum + i.amount, 0);

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-700";
      case "sent": return "bg-blue-100 text-blue-700";
      case "overdue": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="text-[var(--color-text-secondary)] text-sm uppercase tracking-wide mb-1">Billing</p>
            <h1 className="text-3xl lg:text-4xl font-serif tracking-tight">Invoices</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-primary)] text-white rounded text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Invoice
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Paid</p>
          <p className="font-serif text-2xl text-[var(--color-success)]">{formatCurrency(totalPaid, "USD")}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Pending</p>
          <p className="font-serif text-2xl text-blue-600">{formatCurrency(totalPending, "USD")}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Overdue</p>
          <p className="font-serif text-2xl text-red-600">{formatCurrency(totalOverdue, "USD")}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Total</p>
          <p className="font-serif text-2xl">{mockInvoices.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        {(["all", "draft", "sent", "paid", "overdue"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors capitalize ${filter === status ? "bg-[var(--color-text-primary)] text-white" : "bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-text-secondary)]"}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Invoices Table */}
      <div ref={containerRef} className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-[var(--color-bg-main)] border-b border-[var(--color-border-subtle)]">
            <tr>
              <th className="text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide p-4">Invoice</th>
              <th className="text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide p-4 hidden md:table-cell">Client</th>
              <th className="text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide p-4 hidden lg:table-cell">Project</th>
              <th className="text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide p-4">Amount</th>
              <th className="text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide p-4">Status</th>
              <th className="text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide p-4 hidden md:table-cell">Due</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-subtle)]">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="invoice-row hover:bg-[var(--color-bg-main)] transition-colors">
                <td className="p-4">
                  <p className="font-medium">{invoice.number}</p>
                </td>
                <td className="p-4 hidden md:table-cell text-[var(--color-text-secondary)]">{invoice.client}</td>
                <td className="p-4 hidden lg:table-cell text-[var(--color-text-secondary)]">{invoice.project}</td>
                <td className="p-4 font-serif text-lg">{formatCurrency(invoice.amount, invoice.currency)}</td>
                <td className="p-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${getStatusColor(invoice.status)}`}>{invoice.status}</span>
                </td>
                <td className="p-4 hidden md:table-cell text-[var(--color-text-secondary)]">{invoice.dueDate}</td>
                <td className="p-4">
                  <button onClick={() => setShowPreview(invoice)} className="p-2 hover:bg-[var(--color-bg-surface)] rounded transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPreview(null)} />
          <div className="relative bg-[var(--color-bg-surface)] rounded-lg w-full max-w-2xl mx-4 p-8 shadow-[var(--shadow-elevated)]">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-serif mb-1">{showPreview.number}</h2>
                <p className="text-[var(--color-text-secondary)]">{showPreview.project}</p>
              </div>
              <button onClick={() => setShowPreview(null)} className="p-1 hover:bg-[var(--color-bg-main)] rounded">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Billed To</p>
                <p className="font-medium">{showPreview.client}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Amount Due</p>
                <p className="font-serif text-3xl">{formatCurrency(showPreview.amount, showPreview.currency)}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Issue Date</p>
                <p>{showPreview.issueDate}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Due Date</p>
                <p>{showPreview.dueDate}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 border border-[var(--color-border-subtle)] rounded font-medium hover:bg-[var(--color-bg-main)] transition-colors">Download PDF</button>
              <button className="flex-1 py-2.5 bg-[var(--color-accent-primary)] text-white rounded font-medium hover:bg-[var(--color-accent-hover)] transition-colors">Send Invoice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
