// DashboardLayout.jsx

import { Outlet } from "react-router";
import DashboardSidebar from "../components/DashboardSidebar";

const DashboardLayout = () => {


  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 hidden md:block">
        <div className="text-2xl font-bold mb-10 text-center text-blue-600">
          BookSwap Hub
        </div>
        <DashboardSidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
