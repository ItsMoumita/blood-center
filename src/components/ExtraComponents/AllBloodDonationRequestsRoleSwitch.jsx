import { useContext } from "react";
import AllBloodDonationRequests from "../../pages/DashboardPages/AdminPages/AllBloodDonationRequests";
import VolunteerAllBloodDonationRequests from "../../pages/DashboardPages/VolunteerPages/VolunteerAllBloodDonationRequests";
import { AuthContext } from "../../providers/AuthProvider";

const AllBloodDonationRequestsRoleSwitch = () => {
  const { role, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (role === "admin") return <AllBloodDonationRequests />;
  if (role === "volunteer") return <VolunteerAllBloodDonationRequests />;
  return <div>Unauthorized</div>;
};

export default AllBloodDonationRequestsRoleSwitch;