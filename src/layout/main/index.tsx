import { useEffect, useState } from "react";
// import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LoggedUserDetail from "../../components/listClients/loggedUserDetail";
import {
  getUsersProfile,
  updateUserBalance,
} from "../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../store/store";
import "../layout.scss";
import Topbar from "./header";
import Sidebar from "./sidebar";
import { socketService } from "../../socketManager";

function MainLayout({eventKey}:any) {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [toggle, setToggle] = useState<Boolean>(false);
  const handleDrawer = () => {
    setToggle(!toggle);
  };

  const { summary } = useSelector(
    (state: RootState) => state.user.profile
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
      {/* topbar */}
      <Topbar onClick={handleDrawer} toggle={toggle} />
      {/* sidebar start */}
      <div className={`sidebar ${toggle ? "sidebarActive" : ""}`}>
        <Sidebar clickHandler={handleDrawer} />
      </div>
      {/* layout */}
      {location.pathname === "/admin/active-inactive-user-list" && summary ? (
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
