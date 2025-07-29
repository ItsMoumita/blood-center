import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router";

const RequireVolunteerOrAdmin = ({ children }) => {
  const { role, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (role !== "admin" && role !== "volunteer") return <Navigate to="/dashboard" />;
  return children;
};

export default RequireVolunteerOrAdmin;