import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import AdminDashboard from "./AdminPages/AdminDashboard";
import DonorDashboard from "./DonorPages/DonorDashboard";
// import VolunteerDashboard from "../pages/DashboardPages/VolunteerDashboard"; // if you have

const Dashboard = () => {
  const { role, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (role === "admin") return <AdminDashboard />;
//   if (role === "volunteer") return <VolunteerDashboard />;
  return <DonorDashboard />;
};

export default Dashboard;