import { createBrowserRouter } from "react-router-dom";
// routes
import config from "../config";
import AuthRoutes from "./authRoutes";
import MainRoutes from "./mainRoutes";
import ReportRoutes from "./reportRoutes";
import OtherRoutes from "./otherRoutes";
// ==============================|| ROUTING RENDER ||============================== //

export default function routes() {
  return createBrowserRouter(
    [OtherRoutes, AuthRoutes, MainRoutes, ReportRoutes],
    {
      basename: config.BASE_NAME,
    }
  );
}
