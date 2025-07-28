import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router";

const RequireAdmin = ({ children }) => {
  const { role, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (role !== "admin") return <Navigate to="/dashboard" />;
  return children;
};

export default RequireAdmin;