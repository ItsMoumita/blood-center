import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import ContentManagement from "../../pages/DashboardPages/AdminPages/ContentManagement";
import VolunteerContentManagement from "../../pages/DashboardPages/VolunteerPages/VolunteerContentManagement"

const ContentManagementRoleSwitch = () => {
  const { role, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (role === "admin") return <ContentManagement />;
  if (role === "volunteer") return <VolunteerContentManagement />;
  return <div>Unauthorized</div>;
};

export default ContentManagementRoleSwitch;