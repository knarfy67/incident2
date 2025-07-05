import { Navigate, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  const login = localStorage.getItem("userId");

  return login ? <Outlet /> : <Navigate to="/Login" />;
};
