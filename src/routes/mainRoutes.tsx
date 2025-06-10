import { lazy } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layout/main";
import Loadable from "../utils/loadable";

const Game = Loadable(lazy(() => import("../pages/games")));
const OtherGamesDetail = Loadable(lazy(() => import("../pages/otherGames")));
const ListClients = Loadable(lazy(() => import("../pages/listClients")));
const ListAccount = Loadable(lazy(() => import("../pages/listActiveUser")));
const AddAccount = Loadable(lazy(() => import("../pages/addAccount")));
const MarketAnalysis = Loadable(lazy(() => import("../pages/marketAnalysis")));
const ChangePassword = Loadable(lazy(() => import("../pages/changePassword")));
const ChangePasswordFirst = Loadable(
  lazy(() => import("../pages/auth/changePassword"))
);
const MultiLogin = Loadable(lazy(() => import("../pages/multiLogin")));
const SecureAuth = Loadable(lazy(() => import("../pages/secureAuth")));
const Home = Loadable(lazy(() => import("../pages/home")));
const ListActiveInactiveUser = Loadable(
  lazy(() => import("../pages/listActiveUser"))
);

const MainRoutes = {
  path: "/admin",
  element: <MainLayout />,
  children: [
    {
      path: "match_detail/:id",
      element: <Game />,
    },
    {
      path: "match_details/:id",
      element: <Game />,
    },
    {
      path: "other_match_detail/:gameType/:id/:marketId",
      element: <OtherGamesDetail />,
    },
    {
      key: "userList",
      path: "listClients/:id",
      element: <ListClients />,
    },
    {
      key: "userList",
      path: "listClients/:type/:id",
      element: <ListClients />,
    },
    { key: "userList", path: "listAccount", element: <ListAccount /> },
    {
      key: "insertUser",
      path: "add-account",
      element: <AddAccount />,
    },
    {
      key: "marketAnalysis",
      path: "market-analysis",
      element: <MarketAnalysis />,
    },
    {
      path: "home",
      element: <Home />,
    },
    {
      path: "change_password",
      element: <ChangePassword />,
    },
    {
      key: "loginUserCreation",
      path: "multiLogin",
      element: <MultiLogin />,
    },
    {
      path: "change_password_first",
      element: <ChangePasswordFirst />,
    },
    {
      path: "Secure-auth",
      element: <SecureAuth />,
    },
    {
      key: "userList",
      path: "active-inactive-user-list/:id",
      element: <ListActiveInactiveUser />,
    },
    {
      key: "userList",
      path: "active-inactive-user-list/:type/:id",
      element: <ListActiveInactiveUser />,
    },
    {
      path: "*",
      element: <Navigate to={"/admin/home"} replace />,
    },
  ],
};
export default MainRoutes;
