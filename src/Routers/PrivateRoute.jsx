import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/ExtraComponents/Loading";
import { AuthContext } from "../providers/AuthProvider";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // //console.log(location.pathname);

  if (loading) {
    return <Loading></Loading>;
  }

  if (user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login" replace></Navigate>;
};

export default PrivateRoute;
