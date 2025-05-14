import { createBrowserRouter } from "react-router-dom";

import config from "../config";
import AuthRoutes from "./authRoutes";
import MainRoutes from "./mainRoutes";
import OtherRoutes from "./otherRoutes";
import ReportRoutes from "./reportRoutes";

export default function routes(parsedPermissions: any) {
  const restrictedIds = new Set(
    MainRoutes.children
      .filter((item) => item.key && parsedPermissions?.[item.key] === false)
      .map((item) => item.key)
  );

  const filteredMainRoutes = {
    ...MainRoutes,
    children: MainRoutes.children.filter((item) => {
      if (!item.key) return true;
      return !restrictedIds.has(item.key);
    }),
  };

  const filteredReportRoutes = {
    ...ReportRoutes,
    children: ReportRoutes.children.filter((item: any) => {
      if (item.key && parsedPermissions?.[item.key] === false) {
        return false;
      }
      return true;
    }),
  };
  return createBrowserRouter(
    [OtherRoutes, AuthRoutes, filteredMainRoutes, filteredReportRoutes],
    {
      basename: config.BASE_NAME,
    }
  );
}
