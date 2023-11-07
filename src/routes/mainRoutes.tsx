import MainLayout from "../layout/main";
import Game from "../pages/games/index";
// ==============================|| Auth ROUTING ||============================== //

const AuthRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "temp",
      element: <Game />,
    },
  ],
};
export default AuthRoutes;
