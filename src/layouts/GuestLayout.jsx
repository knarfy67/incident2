import { Navigate, Outlet } from "react-router-dom";

export const GuestLayout = () => {
  const login = localStorage.getItem("userId");

  console.log("Auth Status:", login);

  return !login ? <Outlet /> : <Navigate to="/Dashboard" />;
};
