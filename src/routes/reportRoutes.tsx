import { lazy } from "react";
import MainLayout from "../layout/main";
import Loadable from "../utils/loadable";
// ==============================|| Main ROUTING ||============================== //
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
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "admin/account-statement",
      element: <AccountStatement />,
    },
    {
      path: "admin/current-bets",
      element: <CurrentBets />,
    },
    {
      path: "admin/general-report",
      element: <GeneralReport />,
    },
    {
      path: "admin/game-report",
      element: <GameReport />,
    },
    {
      path: "admin/casino-report",
      element: <CasinoReport />,
    },
    {
      path: "admin/profit-loss",
      element: <ProfitLossReport />,
    },
    {
      path: "admin/casinoresult",
      element: <CasinoResultReport />,
    },
  ],
};
export default ReportRoutes;
