import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

export default function AuthLayout() {
  const navigate = useNavigate();

  const { loginData } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("jwtMaxAdmin")) {
      if (!loginData?.permissions || loginData?.permissions?.marketAnalysis) {
        navigate("/admin/market-analysis");
      } else navigate("/admin/home");
    } else {
      if (!localStorage.getItem("forceChangePassword")) {
        navigate("/admin/login");
      }
    }
  }, []);

  return <Outlet />;
}
