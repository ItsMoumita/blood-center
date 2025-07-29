import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import AdminDashboard from "./AdminPages/AdminDashboard";
import DonorDashboard from "./DonorPages/DonorDashboard";
import VolunteerDashboard from "./VolunteerPages/VolunteerDashboard";

const Dashboard = () => {
  const { role, loading } = useContext(AuthContext);
console.log(role)
  if (loading) return <div>Loading...</div>;

  if (role === "admin") return <AdminDashboard />;
  if (role === "volunteer") return <VolunteerDashboard></VolunteerDashboard>;
  return <DonorDashboard />;
};

export default Dashboard;