// Mock data for Orbit Dashboard

export interface DashboardSummary {
  period: {
    start: string;
    end: string;
    label: string;
  };
  bandwidth: {
    hoursAvailable: number;
    hoursCommitted: number;
    hoursLogged: number;
    utilizationPercentage: number;
  };
  revenue: {
    targetAmount: number;
    earnedAmount: number;
    pendingAmount: number;
    currency: string;
  };
  healthScore: number;
}

export interface Project {
  id: string;
  name: string;
  client: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  status: "active" | "completed" | "paused" | "archived";
  billingType: "hourly" | "fixed" | "retainer";
  rate: number;
  currency: string;
  hoursLogged: number;
  hoursEstimated: number;
  deadline: string | null;
  totalValue: number;
  invoicedAmount: number;
  color: string;
}

export interface RevenueDataPoint {
  date: string;
  earned: number;
  projected: number;
}

// Dashboard Summary Mock
export const dashboardSummary: DashboardSummary = {
  period: {
    start: "2026-01-01",
    end: "2026-01-31",
    label: "January 2026",
  },
  bandwidth: {
    hoursAvailable: 160,
    hoursCommitted: 112,
    hoursLogged: 87.5,
    utilizationPercentage: 78.125,
  },
  revenue: {
    targetAmount: 12000.0,
    earnedAmount: 8750.0,
    pendingAmount: 2100.0,
    currency: "USD",
  },
  healthScore: 82,
};

// Projects Mock
export const projects: Project[] = [
  {
    id: "proj_a1b2c3d4",
    name: "Brand Redesign",
    client: {
      id: "cli_x1y2z3",
      name: "Acme Corp",
    },
    status: "active",
    billingType: "hourly",
    rate: 150.0,
    currency: "USD",
    hoursLogged: 42,
    hoursEstimated: 80,
    deadline: "2026-02-15",
    totalValue: 12000,
    invoicedAmount: 6300,
    color: "#EA580C",
  },
  {
    id: "proj_e5f6g7h8",
    name: "Mobile App MVP",
    client: {
      id: "cli_a4b5c6",
      name: "StartupXYZ",
    },
    status: "active",
    billingType: "fixed",
    rate: 0,
    currency: "USD",
    hoursLogged: 28,
    hoursEstimated: 120,
    deadline: "2026-03-01",
    totalValue: 18000,
    invoicedAmount: 9000,
    color: "#2563EB",
  },
  {
    id: "proj_i9j0k1l2",
    name: "Monthly Retainer",
    client: {
      id: "cli_d7e8f9",
      name: "TechFlow Inc",
    },
    status: "active",
    billingType: "retainer",
    rate: 5000,
    currency: "USD",
    hoursLogged: 17.5,
    hoursEstimated: 40,
    deadline: null,
    totalValue: 5000,
    invoicedAmount: 5000,
    color: "#16A34A",
  },
  {
    id: "proj_m3n4o5p6",
    name: "E-commerce Platform",
    client: {
      id: "cli_g1h2i3",
      name: "RetailMax",
    },
    status: "paused",
    billingType: "hourly",
    rate: 175.0,
    currency: "USD",
    hoursLogged: 64,
    hoursEstimated: 200,
    deadline: "2026-04-30",
    totalValue: 35000,
    invoicedAmount: 11200,
    color: "#9333EA",
  },
];

// Revenue Chart Data (Last 12 weeks)
export const revenueChartData: RevenueDataPoint[] = [
  { date: "Nov 4", earned: 2400, projected: 2800 },
  { date: "Nov 11", earned: 3100, projected: 3000 },
  { date: "Nov 18", earned: 2800, projected: 3200 },
  { date: "Nov 25", earned: 3500, projected: 3000 },
  { date: "Dec 2", earned: 4200, projected: 3500 },
  { date: "Dec 9", earned: 3800, projected: 3800 },
  { date: "Dec 16", earned: 2900, projected: 4000 },
  { date: "Dec 23", earned: 1500, projected: 2000 },
  { date: "Dec 30", earned: 2200, projected: 3000 },
  { date: "Jan 6", earned: 3600, projected: 3200 },
  { date: "Jan 13", earned: 4100, projected: 3500 },
  { date: "Jan 20", earned: 3050, projected: 3300 },
];

// API simulation functions
export const fetchDashboardSummary = async (): Promise<DashboardSummary> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return dashboardSummary;
};

export const fetchProjects = async (): Promise<Project[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return projects;
};

export const fetchRevenueChart = async (): Promise<RevenueDataPoint[]> => {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return revenueChartData;
};
