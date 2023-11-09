import Sample from "../components/Sample";
import MainLayout from "../layout/main";
import Game from "../pages/games/index";
// ==============================|| Auth ROUTING ||============================== //

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
  ],
};
export default MainRoutes;
