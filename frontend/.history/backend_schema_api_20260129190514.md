# Orbit API & Database Schema Documentation

This document outlines the API endpoints and database structure required to power the Orbit "Swiss Style" Dashboard.

---

## 1. Database Schema (PostgreSQL Recommended)

The data model centers around **Clients** and **Projects**, with efficient tracking for **Time** and **Revenue**.

### `user` (BetterAuth Core)
*Standard BetterAuth user table.*
| Column | Type | Notes |
|:---|:---|:---|
| `id` | TEXT | PK, Cuid/UUID |
| `name` | TEXT | |
| `email` | TEXT | Unique |
| `emailVerified` | BOOLEAN | |
| `image` | TEXT | Avatar URL |
| `createdAt` | TIMESTAMP | |
| `updatedAt` | TIMESTAMP | |

### `session` (BetterAuth)
*Active user sessions.*
| Column | Type | Notes |
|:---|:---|:---|
| `id` | TEXT | PK |
| `userId` | TEXT | FK -> user.id |
| `token` | TEXT | Unique |
| `expiresAt` | TIMESTAMP | |
| `ipAddress` | TEXT | Optional |
| `userAgent` | TEXT | Optional |

### `account` (BetterAuth)
*Linked OAuth accounts (Google, GitHub).*
| Column | Type | Notes |
|:---|:---|:---|
| `id` | TEXT | PK |
| `userId` | TEXT | FK -> user.id |
| `accountId` | TEXT | Provider's ID |
| `providerId` | TEXT | e.g., 'google' |
| `accessToken` | TEXT | |
| `refreshToken` | TEXT | |
| `expiresAt` | TIMESTAMP | |
| `password` | TEXT | If using email/pass |

### `verification` (BetterAuth)
*Email verification & password reset tokens.*
| Column | Type | Notes |
|:---|:---|:---|
| `id` | TEXT | PK |
| `identifier` | TEXT | e.g., email |
| `value` | TEXT | The token string |
| `expiresAt` | TIMESTAMP | |

### `clients`
*Companies or individuals you bill.*
| Column | Type | Notes |
|:---|:---|:---|
| `id` | UUID | PK |
| `userId` | TEXT | FK -> user.id |
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

### Authentication (BetterAuth)
*Handled automatically by BetterAuth library.*
*   `POST /api/auth/*` (SignIn, SignOut, SignUp, etc.)
*   `GET /api/auth/session` (Get current session)

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
