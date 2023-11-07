import { useRoutes } from "react-router-dom";
// routes
import config from "../config";
import AuthRoutes from "./authRoutes";
import MainRoutes from "./mainRoutes";
// ==============================|| ROUTING RENDER ||============================== //
export default function Routes() {
  return useRoutes([AuthRoutes, MainRoutes], config.BASE_NAME);
}