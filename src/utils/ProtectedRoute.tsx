// Protected route include authentication and authorization checking
import { Navigate, useLocation, Outlet } from "react-router-dom";
import NotFound from "../pages/NotFound";
const PrivateRoute = ({ roles }: { roles: Array<string> }) => {
  const location = useLocation();
  const isAuth = localStorage.getItem("auth_token");
  const role = localStorage.getItem("role");

  const userHasRequiredRole = role && roles.includes(role) ? true : false;

  if (!isAuth) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  if (isAuth && !userHasRequiredRole) {
    return (
      <>
        <NotFound />
      </>
    );
  }

  return <Outlet />;
};

export { PrivateRoute };
