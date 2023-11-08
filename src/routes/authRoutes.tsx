import { lazy } from "react";
import AuthLayout from "../layout/auth";
import Loadable from "../utils/loadable";
// ==============================|| Auth ROUTING ||============================== //
const Login = Loadable(lazy(() => import("../pages/auth/login")));
const AuthRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
  ],
};
export default AuthRoutes;
