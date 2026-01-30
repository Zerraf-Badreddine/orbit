# How to Translate UI to Database Schema

This guide explains the "secret" of how Backend Engineers design databases just by looking at the Frontend.

The Logic: **"If it's on the screen, it must be stored somewhere."**

---

## Example 1: The Project Card

Look at your `ProjectList.tsx` component. Here is what the user sees vs. what the Backend Engineer sees.

| What the User Sees (UI) | What the Backend Engineer Sees (Schema) |
| :--- | :--- |
| **"Brand Redesign"** (Main Title) | `projects` table $\to$ `name` (VARCHAR) |
| **"Acme Corp"** (Subtitle) | `projects` table must link to `clients` table. <br>(`client_id` Foreign Key) |
| **"$12,000"** (Value) | `projects` table $\to$ `total_value` (DECIMAL) |
| **"Active"** (Green Chip) | `projects` table $\to$ `status` (ENUM: 'active', etc) |
| **"Due Feb 15"** (Date) | `projects` table $\to$ `deadline` (DATE) |
| **Orange Dot** (Color code) | `projects` table $\to$ `color` (VARCHAR, e.g. '#EA580C') |

**Conclusion:** We need a `projects` table with columns: `name`, `client_id`, `total_value`, `status`, `deadline`, and `color`.

---

## Example 2: The Invoice Row

Look at your `InvoicesPage` table (`app/dashboard/invoices/page.tsx`).

| What the UI Needs | The Database Requirement |
| :--- | :--- |
| **"INV-001"** | We need a unique `invoice_number` string column. |
| **"Paid"** / **"Overdue"** | We need a `status` column that allows these specific values. |
| **Client Name** | We need to join with the `clients` table to get the name. |
| **Download PDF Button** | We need to store the `pdf_url` (link to S3/Cloud storage) so the button works. |

---

## Example 3: The "Utilization" Ring

Look at `BandwidthCard.tsx`. It shows "78% Utilized".

**The Thinking Process:**
1.  **Frontend**: Displays 78%.
2.  **Backend Engineer asks**: "Is 78% stored directly? Or calculated?"
3.  **Answer**: It changes every time I log work. So it shouldn't be flattened as "78".
4.  **Schema Decision**:
    *   We need a `time_entries` table to store every log (1hr, 2hr, 0.5hr).
    *   The Backend will **sum** these up on the fly (`SUM(hours)`) to calculate the percentage.
    *   **Result**: We don't store "78%". We store the *raw time entries*.

---

## Summary Checklist for Backend Design

When you give a design to a Backend Engineer, they look for:

1.  **Nouns** (Projects, Clients, Invoices) $\to$ These become **Tables**.
2.  **Adjectives** (Name, Date, Amount, Status) $\to$ These become **Columns**.
3.  **Connections** ("This project belongs to Acme") $\to$ These become **Foreign Keys** (`client_id`).
