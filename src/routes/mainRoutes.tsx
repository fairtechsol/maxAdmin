import { lazy } from "react";
import MainLayout from "../layout/main";
import Loadable from "../utils/loadable";
// ==============================|| Main ROUTING ||============================== //
const Game = Loadable(lazy(() => import("../pages/games")));
const Sample = Loadable(lazy(() => import("../components/Sample")));
const ListClients = Loadable(lazy(() => import("../pages/listClients")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "game",
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
  ],
};
export default MainRoutes;
