import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import AdminDashboard from "./AdminPages/AdminDashboard";
import DonorDashboard from "./DonorPages/DonorDashboard";
import VolunteerDashboard from "./VolunteerPages/VolunteerDashboard";
import Loading from "../../components/ExtraComponents/Loading";

const Dashboard = () => {
  const { role, loading } = useContext(AuthContext);
//console.log(role)
  if (loading) return <Loading></Loading>;

  if (role === "admin") return <AdminDashboard />;
  if (role === "volunteer") return <VolunteerDashboard></VolunteerDashboard>;
  return <DonorDashboard />;
};

export default Dashboard;