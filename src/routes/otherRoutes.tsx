import { Navigate } from "react-router-dom";
import Loadable from "../utils/loadable";
import { lazy } from "react";

const OtherLayout = Loadable(lazy(() => import("../layout/otherLayout")));
const SecurityAuth = Loadable(lazy(() => import("../pages/security")));

const OtherRoutes = {
  path: "/admin",
  element: <OtherLayout />,
  children: [
    { index: true, element: <Navigate to={"/admin/login"} replace /> },
    {
      path: "verify",
      element: <SecurityAuth />,
    },
    {
      path: "*",
      element: <Navigate to={"/admin/login"} replace />,
    },
  ],
};
export default OtherRoutes;
