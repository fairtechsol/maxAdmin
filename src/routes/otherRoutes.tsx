import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../utils/loadable";

const OtherLayout = Loadable(lazy(() => import("../layout/otherLayout")));
const SecurityAuth = Loadable(lazy(() => import("../pages/security")));
const ErrorPage = Loadable(lazy(() => import("../pages/errorPage")));

const OtherRoutes = {
  path: "/admin",
  element: <OtherLayout />,
  children: [
    {
      path: "verify",
      element: <SecurityAuth />,
    },
    {
      path: "404",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <Navigate to={"/admin/login"} replace />,
    },
  ],
};
export default OtherRoutes;
