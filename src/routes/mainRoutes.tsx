import MainLayout from "../layout/main";
import Game from "../pages/games/index";
// ==============================|| Auth ROUTING ||============================== //

const AuthRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "game",
      element: <Game />,
    },
  ],
};
export default AuthRoutes;
