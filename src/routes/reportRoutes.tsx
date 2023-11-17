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
  path: "/admin",
  element: <MainLayout />,
  children: [
    {
      path: "account-statement",
      element: <AccountStatement />,
    },
    {
      path: "current-bets",
      element: <CurrentBets />,
    },
    {
      path: "general-report",
      element: <GeneralReport />,
    },
    {
      path: "game-report",
      element: <GameReport />,
    },
    {
      path: "casino-report",
      element: <CasinoReport />,
    },
    {
      path: "profit-loss",
      element: <ProfitLossReport />,
    },
    {
      path: "casino-result",
      element: <CasinoResultReport />,
    },
  ],
};
export default ReportRoutes;
