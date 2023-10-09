import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context";
import { ROUTE } from "../../constants/routes";

const PrivateRoute = ({ children }) => {
  const [{ token }] = useAuth();

  if (!token) {
    return <Navigate to={ROUTE.LOGIN} replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
