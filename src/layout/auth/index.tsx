import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate(-1);
    } else {
      if (!localStorage.getItem("forceChangePassword")) {
        navigate("/admin/login");
      }
    }
  }, []);
  return <Outlet />;
}
