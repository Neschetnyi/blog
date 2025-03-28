import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();

  const auth = localStorage.getItem("user");

  if (!auth) {
    return <Navigate to="/signIn" state={{ from: location }} />;
  }
  return children;
};
export { RequireAuth };
