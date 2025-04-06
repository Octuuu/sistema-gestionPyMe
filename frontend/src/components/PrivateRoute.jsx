import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ element }) => {
  const { token } = useContext(AuthContext);

  // Si no hay token, redirige a login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si hay token, permite la navegación
  return element;
};

export default PrivateRoute;
