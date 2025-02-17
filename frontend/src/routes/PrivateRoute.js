import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
