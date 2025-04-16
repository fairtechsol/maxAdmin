import { memo, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();

  const permissions: any = localStorage.getItem("permissions");

  useEffect(() => {
    if (localStorage.getItem("jwtMaxAdmin")) {
      if (!JSON.parse(permissions) || JSON.parse(permissions)?.marketAnalysis) {
        navigate("/admin/market-analysis");
      } else navigate("/admin/home");
    } else {
      if (!localStorage.getItem("forceChangePassword")) {
        navigate("/admin/login");
      }
    }
  }, []);

  return <Outlet />;
};
export default memo(AuthLayout);
