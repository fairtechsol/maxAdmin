import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/commonComponent/loader";
import LoggedUserDetail from "../../components/listClients/loggedUserDetail";
import { socketService } from "../../socketManager";
import {
  getUsersProfile,
  updateUserBalance,
} from "../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../store/store";
import "../layout.scss";
import Topbar from "./header";
import Sidebar from "./sidebar";

function MainLayout({ eventKey }: any) {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { type } = useParams();
  const [toggle, setToggle] = useState<Boolean>(false);
  const handleDrawer = () => {
    setToggle(!toggle);
  };

  const { summary } = useSelector((state: RootState) => state.user.profile);
  const { userBalanceLoading } = useSelector(
    (state: RootState) => state.user.userList
  );
  const updateLoggedUserBalance = (event: any) => {
    dispatch(updateUserBalance(event));
  };

  useEffect(() => {
    if (!localStorage.getItem("jwtMaxAdmin")) {
      navigate("/admin/login");
    } else {
      dispatch(getUsersProfile());
    }
  }, [dispatch]);

  useEffect(() => {
    if (toggle) {
      setToggle((prev) => !prev);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (localStorage.getItem("isAuthenticator") === "false") {
      localStorage.clear();
    }
  }, [navigate]);

  useEffect(() => {
    if (localStorage.getItem("jwtMaxAdmin")) {
      socketService.connect();
      socketService.auth.logout();
      socketService.match.updateUserBalance(updateLoggedUserBalance);
    }
    return () => {
      socketService.disconnect();
    };
  }, [localStorage.getItem("jwtMaxAdmin")]);

  return (
    <>
      {userBalanceLoading ? <Loader /> : null}
      <Topbar onClick={handleDrawer} toggle={toggle} />
      <div className={`sidebar ${toggle ? "sidebarActive" : ""}`}>
        <Sidebar clickHandler={handleDrawer} />
      </div>
      {location.pathname.includes("/admin/active-inactive-user-list") &&
      summary &&
      !type ? (
        <LoggedUserDetail />
      ) : (
        ""
      )}
      <main
        className={`page-content bg-light ${
          location.pathname === "/admin/add-account" ? "addAcc" : ""
        }  `}
      >
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
