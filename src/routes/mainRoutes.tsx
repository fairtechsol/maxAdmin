import { lazy } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layout/main";
import ListActiveInactiveUser from "../pages/listActiveUser";
import Loadable from "../utils/loadable";
import AndarBahar2 from "../pages/cardGames/games/andarBahar2";
import Lucky7 from "../pages/cardGames/games/lucky7";
import DragonTiger2020 from "../pages/cardGames/games/dragonTiger2020";
import Card32A from "../pages/cardGames/games/card32A";
import TeenPatti2020 from "../pages/cardGames/games/teenpatti2020";
// ==============================|| Main ROUTING ||============================== //
const Game = Loadable(lazy(() => import("../pages/games")));
const OtherGamesDetail = Loadable(lazy(() => import("../pages/otherGames")));
// const Sample = Loadable(lazy(() => import("../components/Sample")));
const ListClients = Loadable(lazy(() => import("../pages/listClients")));
const ListAccount = Loadable(lazy(() => import("../pages/listActiveUser")));
const AddAccount = Loadable(lazy(() => import("../pages/addAccount")));
const MarketAnalysis = Loadable(lazy(() => import("../pages/marketAnalysis")));
const ChangePassword = Loadable(lazy(() => import("../pages/changePassword")));
const ChangePasswordFirst = Loadable(
  lazy(() => import("../pages/auth/changePassword"))
);

const SecureAuth = Loadable(lazy(() => import("../pages/secureAuth")));
const CardList3 = Loadable(lazy(() => import("../pages/cardGames/cardsList")));

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
      path: "other_match_detail/:id/:marketId",
      element: <OtherGamesDetail />,
    },
    // {
    //   path: "samplepage",
    //   element: <Sample />,
    // },
    {
      path: "listClients/:id",
      element: <ListClients />,
    },
    {
      path: "listClients/:type/:id",
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
      path: "change_password",
      element: <ChangePassword />,
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
      path: "active-inactive-user-list/:id",
      element: <ListActiveInactiveUser />,
    },
    {
      path: "active-inactive-user-list/:type/:id",
      element: <ListActiveInactiveUser />,
    },
    {
      path: "casino/:listType",
      element: <CardList3 />,
    },
    {
      path: "casinoDetail/teenPatti20",
      element: <TeenPatti2020 />,
    },
    {
      path: "casinoDetail/lucky7-A",
      element: <Lucky7 />,
    },
    {
      path: "casinoDetail/32cards-A",
      element: <Card32A />,
    },
    {
      path: "casinoDetail/abj2",
      element: <AndarBahar2 />,
    },
    {
      path: "casinoDetail/dt20",
      element: <DragonTiger2020 />,
    },
    {
      path: "casinoDetail/dt202",
      // element: <DragonTigerSecond20 />,
    },
    {
      path: "*",
      element: <Navigate to={"/admin/listAccount"} replace />,
    },
  ],
};
export default MainRoutes;
