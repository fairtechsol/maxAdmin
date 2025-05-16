import { createBrowserRouter } from "react-router-dom";

import config from "../config";
import { routeKeyContant } from "../utils/Constants";
import AuthRoutes from "./authRoutes";
import MainRoutes from "./mainRoutes";
import OtherRoutes from "./otherRoutes";
import ReportRoutes from "./reportRoutes";

export default function routes(parsedPermissions: any) {
  const path = window.location.pathname;
  const routeKey = path.split("/")[2];

  const restrictedIds = new Set(
    MainRoutes.children
      .filter((item) => item.key && parsedPermissions?.[item.key] === false)
      .map((item) => item.key)
  );
  const restrictedIds2 = new Set(
    ReportRoutes.children
      .filter((item) => item.key && parsedPermissions?.[item.key] === false)
      .map((item) => item.key)
  );

  if (
    restrictedIds.has(routeKeyContant[routeKey]) ||
    restrictedIds2.has(routeKeyContant[routeKey])
  ) {
    window.location.replace("/admin/404");
  }

  // const filteredMainRoutes = {
  //   ...MainRoutes,
  //   children: MainRoutes.children.filter((item) => {
  //     if (!item.key) return true;
  //     return !restrictedIds.has(item.key);
  //   }),
  // };
  // const filteredReportRoutes = {
  //   ...ReportRoutes,
  //   children: ReportRoutes.children.filter((item: any) => {
  //     if (item.key && parsedPermissions?.[item.key] === false) {
  //       return false;
  //     }
  //     return true;
  //   }),
  // };
  return createBrowserRouter(
    [OtherRoutes, AuthRoutes, MainRoutes, ReportRoutes],
    {
      basename: config.BASE_NAME,
    }
  );
}
