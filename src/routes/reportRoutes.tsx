import { lazy } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layout/main";
import Loadable from "../utils/loadable";
const AccountStatement = Loadable(
  lazy(() => import("../pages/reports/AccountStatement"))
);
const CurrentBets = Loadable(
  lazy(() => import("../pages/reports/CurrentBets"))
);
const CasinoReport = Loadable(
  lazy(() => import("../pages/reports/CasinoReport"))
);
const GeneralReport = Loadable(
  lazy(() => import("../pages/reports/GeneralReport"))
);
const GameReport = Loadable(lazy(() => import("../pages/reports/GameReport")));
const ProfitLossReport = Loadable(
  lazy(() => import("../pages/reports/ProfitLossReport"))
);
const CasinoResultReport = Loadable(
  lazy(() => import("../pages/reports/CasinoResultReport"))
);

const ReportRoutes = {
  path: "/admin",
  element: <MainLayout />,
  children: [
    {
      key: "accountStatement",
      path: "account-statement",
      element: <AccountStatement />,
    },
    { key: "currentBets", path: "current-bets", element: <CurrentBets /> },
    {
      path: "general-report",
      element: <GeneralReport />,
    },
    {
      path: "game-report",
      element: <GameReport />,
    },
    {
      key: "liveCasinoResult",
      path: "casino-report",
      element: <CasinoReport />,
    },
    { key: "partyWinLoss", path: "profit-loss", element: <ProfitLossReport /> },
    {
      key: "casinoResult",
      path: "casino-result",
      element: <CasinoResultReport />,
    },
    {
      path: "*",
      element: <Navigate to={"/admin/home"} replace />,
    },
  ],
};
export default ReportRoutes;
