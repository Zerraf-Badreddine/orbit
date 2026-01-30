# Orbit API & Database Schema Documentation

This document outlines the API endpoints and database structure required to power the Orbit "Swiss Style" Dashboard.

---

## 1. Database Schema (PostgreSQL Recommended)

The data model centers around **Clients** and **Projects**, with efficient tracking for **Time** and **Revenue**.

### `users`
*Core application users (freelancers).*
| Column | Type | Notes |
|:---|:---|:---|
| `id` | UUID | PK |
| `email` | VARCHAR | Unique |
| `full_name` | VARCHAR | |
| `avatar_url` | VARCHAR | |
| `created_at` | TIMESTAMPTZ | |

### `clients`
*Companies or individuals you bill.*
| Column | Type | Notes |
|:---|:---|:---|
| `id` | UUID | PK |
| `user_id` | UUID | FK -> users.id |
| `name` | VARCHAR | Contact person |
| `company_name` | VARCHAR | |
| `email` | VARCHAR | |
| `status` | ENUM | 'active', 'inactive' |
| `currency` | VARCHAR | Default currency (e.g., 'USD') |
| `color` | VARCHAR | Hex code for UI |

### `projects`
*Billable workspaces linked to a client.*
| Column | Type | Notes |
|:---|:---|:---|
| `id` | UUID | PK |
| `client_id` | UUID | FK -> clients.id |
| `name` | VARCHAR | |
| `status` | ENUM | 'active', 'paused', 'completed', 'archived' |
| `billing_type` | ENUM | 'hourly', 'fixed', 'retainer' |
| `rate` | DECIMAL | Hourly rate or fixed price |
| `currency` | VARCHAR | |
| `hours_estimated` | DECIMAL | Budgeted hours |
| `deadline` | DATE | |
| `color` | VARCHAR | Hex code for UI |

### `time_entries`
*Atomic units of work.*
| Column | Type | Notes |
|:---|:---|:---|
| `id` | UUID | PK |
| `project_id` | UUID | FK -> projects.id |
| `description` | TEXT | What was worked on |
| `start_time` | TIMESTAMPTZ | |
| `end_time` | TIMESTAMPTZ | Null if currently running |
| `duration_seconds` | INTEGER | Calculated or manual |
| `billable` | BOOLEAN | Default: true |
| `date` | DATE | For easier aggregation |

### `invoices`
*Financial records.*
| Column | Type | Notes |
|:---|:---|:---|
| `id` | UUID | PK |
| `client_id` | UUID | FK -> clients.id |
| `project_id` | UUID | FK -> projects.id |
| `invoice_number` | VARCHAR | e.g., 'INV-2026-001' |
| `amount` | DECIMAL | Total due |
| `status` | ENUM | 'draft', 'sent', 'paid', 'overdue' |
| `issue_date` | DATE | |
| `due_date` | DATE | |
| `pdf_url` | VARCHAR | Path to generated PDF |

---

## 2. API Endpoints

### Dashboard
Aggregated data for the main view.

*   `GET /api/dashboard/summary`
    *   **Returns**: Bandwidth usage, Revenue targets, Health score.
    *   **Calculated**:
        *   `bandwidth.hoursLogged` = Sum `duration` of `time_entries` (this month).
        *   `bandwidth.hoursAvailable` = User setting (const) - logged.
        *   `revenue.current` = Sum `invoices.amount` (status='paid', this month).

*   `GET /api/dashboard/revenue-chart`
    *   **Returns**: Array of `{ date, earned, projected }` for the chart.

### Projects
*   `GET /api/projects`
    *   **Params**: `status` (optional)
    *   **Returns**: List of projects with embedded Client details.
*   `POST /api/projects`
    *   **Body**: `{ name, clientId, billingType, rate, ... }`
*   `GET /api/projects/:id`
*   `PATCH /api/projects/:id` (Update status/details)

### Clients
*   `GET /api/clients`
    *   **Returns**: List of clients with `totalRevenue` (aggregate from invoices).
*   `POST /api/clients`
*   `GET /api/clients/:id`

### Time Tracking
*   `GET /api/time-entries`
    *   **Params**: `start_date`, `end_date`, `project_id`
    *   **Returns**: List of entries.
*   `POST /api/time-entries`
    *   **Body**: `{ projectId, description, date, duration, ... }`
*   `POST /api/time-entries/start` (Start Timer)
*   `POST /api/time-entries/stop` (Stop Timer)

### Invoices
*   `GET /api/invoices`
    *   **Params**: `status`
*   `POST /api/invoices`
    *   **Body**: `{ clientId, projectId, items: [], ... }`
*   `POST /api/invoices/:id/send` (Mark as sent, trigger email)

---

## 3. Key Data Relationships for Frontend
1.  **Revenue vs Bandwidth**: The frontend calculates "Utilization" by comparing `time_entries` (hours) against a hardcoded or settings-based "Capacity" (e.g. 160h/month).
2.  **Project Health**: Derived from `hours_logged` / `hours_estimated`.
3.  **Color Coding**: Important for the "Swiss" aesthetic. Clients/Projects must store a `color` hex string to drive the UI chips and avatars.
