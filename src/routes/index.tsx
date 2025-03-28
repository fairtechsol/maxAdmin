import { createBrowserRouter } from "react-router-dom";

import config from "../config";
import AuthRoutes from "./authRoutes";
import MainRoutes from "./mainRoutes";
import OtherRoutes from "./otherRoutes";
import ReportRoutes from "./reportRoutes";

export default function routes() {
  return createBrowserRouter(
    [OtherRoutes, AuthRoutes, MainRoutes, ReportRoutes],
    {
      basename: config.BASE_NAME,
    }
  );
}
