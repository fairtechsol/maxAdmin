import { lazy } from "react";
import MainLayout from "../layout/main";
import Loadable from "../utils/loadable";
// ==============================|| Main ROUTING ||============================== //
const Game = Loadable(lazy(() => import("../pages/games")));
const Sample = Loadable(lazy(() => import("../components/Sample")));
const ListClients = Loadable(lazy(() => import("../pages/listClients")));
const AddAccount = Loadable(lazy(() => import("../pages/addAccount")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "admin",
      element: <Game />,
    },
    {
      path: "samplepage",
      element: <Sample />,
    },
    {
      path: "admin/listClients",
      element: <ListClients />,
    },
    {
      path: "admin/add-account",
      element: <AddAccount />,
    },
  ],
};
export default MainRoutes;
