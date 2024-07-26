import { lazy } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layout/main";
import Loadable from "../utils/loadable";

// ==============================|| Main ROUTING ||============================== //

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

const SecureAuth = Loadable(lazy(() => import("../pages/secureAuth")));
const CardList3 = Loadable(lazy(() => import("../pages/cardGames/cardsList")));
const ListActiveInactiveUser = Loadable(
  lazy(() => import("../pages/listActiveUser"))
);
const AndarBahar2 = Loadable(
  lazy(() => import("../pages/cardGames/games/andarBahar2"))
);
const Lucky7 = Loadable(lazy(() => import("../pages/cardGames/games/lucky7")));
const DragonTiger2020 = Loadable(
  lazy(() => import("../pages/cardGames/games/dragonTiger2020"))
);
const Card32A = Loadable(
  lazy(() => import("../pages/cardGames/games/card32A"))
);
const TeenPatti2020 = Loadable(
  lazy(() => import("../pages/cardGames/games/teenpatti2020"))
);
const DragonTiger20Second = Loadable(
  lazy(() => import("../pages/cardGames/games/dragonSecond20"))
);
const DragonTigerLion = Loadable(
  lazy(() => import("../pages/cardGames/games/dragonTigerLion"))
);
const DragonTigerOneDay = Loadable(
  lazy(() => import("../pages/cardGames/games/dragonTigerOneDay"))
);
const Lucky7B = Loadable(
  lazy(() => import("../pages/cardGames/games/lucky7B"))
);

const TeenPatti1D = Loadable(
  lazy(() => import("../pages/cardGames/games/teenPatti1D"))
);
const TeenPattiOpen = Loadable(
  lazy(() => import("../pages/cardGames/games/teenpattiOpen"))
);
const Abj = Loadable(
  lazy(() => import("../pages/cardGames/games/andarBahar1"))
);
const Superover = Loadable(
  lazy(() => import("../pages/cardGames/games/superOver"))
);
const Race20 = Loadable(lazy(() => import("../pages/cardGames/games/race20")));
const Cricket5 = Loadable(
  lazy(() => import("../pages/cardGames/games/cricket5"))
);
const Cards32B = Loadable(
  lazy(() => import("../pages/cardGames/games/cards32B"))
);
const CasinoWar = Loadable(
  lazy(() => import("../pages/cardGames/games/casinoWar"))
);
const Poker1day = Loadable(
  lazy(() => import("../pages/cardGames/games/poker1day"))
);
const Poker20 = Loadable(
  lazy(() => import("../pages/cardGames/games/poker20"))
);
const Poker6 = Loadable(lazy(() => import("../pages/cardGames/games/poker6")));

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
      path: "casinoDetail/teenPatti20", //
      element: <TeenPatti2020 />,
    },
    {
      path: "casinoDetail/lucky7-A", //
      element: <Lucky7 />,
    },
    {
      path: "casinoDetail/32cards-A", //
      element: <Card32A />,
    },
    {
      path: "casinoDetail/abj2", //
      element: <AndarBahar2 />,
    },
    {
      path: "casinoDetail/dt20",
      element: <DragonTiger2020 />, //
    },
    {
      path: "casinoDetail/dt202",
      element: <DragonTiger20Second />, //
    },
    {
      path: "casinoDetail/dtl20",
      element: <DragonTigerLion />, //
    },
    {
      path: "casinoDetail/dt6",
      element: <DragonTigerOneDay />, //
    },
    {
      path: "casinoDetail/lucky7eu", //
      element: <Lucky7B />, //
    },
    {
      path: "casinoDetail/teen",
      element: <TeenPatti1D />, //
    },
    {
      path: "casinoDetail/teen8",
      element: <TeenPattiOpen />,
    },
    {
      path: "casinoDetail/ab20",
      element: <Abj />,
    },
    {
      path: "casinoDetail/superover",
      element: <Superover />,
    },
    {
      path: "casinoDetail/race20",
      element: <Race20 />,
    },
    {
      path: "casinoDetail/cricketv3",
      element: <Cricket5 />,
    },
    {
      path: "casinoDetail/card32eu",
      element: <Cards32B />,
    },
    {
      path: "casinoDetail/war",
      element: <CasinoWar />,
    },
    {
      path: "casinoDetail/poker",
      element: <Poker1day />,
    },
    {
      path: "casinoDetail/poker6",
      element: <Poker6 />,
    },
    {
      path: "casinoDetail/poker20",
      element: <Poker20 />,
    },
    {
      path: "*",
      element: <Navigate to={"/admin/listAccount"} replace />,
    },
  ],
};
export default MainRoutes;
