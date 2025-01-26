import { Outlet } from "react-router-dom";

// Import components
import DashboardDrawer from "@components/dashboard/DashboardDrawer";
import { Suspense } from "react";

const Dashboard = () => {
  return (
    <div>
      <DashboardDrawer />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Dashboard;
