export const ROUTES: Record<
  "BUILDER" | "EXECUTION_LOG" | "DASHBOARD",
  { route: string }
> = {
  BUILDER: {
    route: "/dashboard/builder",
  },
  EXECUTION_LOG: {
    route: "/dashboard/execution-log",
  },
  DASHBOARD: {
    route: "/dashboard",
  },
};
