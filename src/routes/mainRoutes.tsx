import { lazy } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layout/main";
import ListActiveInactiveUser from "../pages/listActiveUser";
import Loadable from "../utils/loadable";
// ==============================|| Main ROUTING ||============================== //
const Game = Loadable(lazy(() => import("../pages/games")));
const Sample = Loadable(lazy(() => import("../components/Sample")));
const ListClients = Loadable(lazy(() => import("../pages/listClients")));
const ListAccount = Loadable(lazy(() => import("../pages/listActiveUser")));
const AddAccount = Loadable(lazy(() => import("../pages/addAccount")));
const MarketAnalysis = Loadable(lazy(() => import("../pages/marketAnalysis")));
const ChangePassword = Loadable(lazy(() => import("../pages/changePassword")));
const SecureAuth = Loadable(lazy(() => import("../pages/secureAuth")));

const MainRoutes = {
  path: "/admin",
  element: <MainLayout />,
  children: [
    {
      path: "",
      element: <Game />,
    },
    {
      path: "samplepage",
      element: <Sample />,
    },
    {
      path: "listClients",
      element: <ListClients />,
    },
    {
      path: "listAccount",
      element: <ListAccount />,
    },
    {
      path: "add-account",
      element: <AddAccount />,
    },
    {
      path: "market-analysis",
      element: <MarketAnalysis />,
    },
    {
      path: "change-password",
      element: <ChangePassword />,
    },
    {
      path: "Secure-auth",
      element: <SecureAuth />,
    },
    {
      path: "active-inactive-user-list",
      element: <ListActiveInactiveUser />,
    },
    {
      path: "*",
      element: <Navigate to={"/admin/listAccount"} replace />,
    },
  ],
};
export default MainRoutes;
