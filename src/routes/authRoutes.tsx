import { lazy } from "react";
import AuthLayout from "../layout/auth";
import Loadable from "../utils/loadable";
import { Navigate } from "react-router-dom";
// ==============================|| Auth ROUTING ||============================== //
const Login = Loadable(lazy(() => import("../pages/auth/login")));
const ChangePassword = Loadable(lazy(() => import("../pages/auth/changePassword")));

const AuthRoutes = {
  path: "/admin/",
  element: <AuthLayout />,
  children: [
    { index: true, element: <Navigate to="/admin/login" replace /> },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "change-password",
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <Navigate to={"/admin/login"} replace />,
    },
  ],
};
export default AuthRoutes;
