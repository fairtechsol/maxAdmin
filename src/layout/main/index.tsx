import { useEffect, useState } from "react";
// import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LoggedUserDetail from "../../components/listClients/loggedUserDetail";
import { getUsersProfile } from "../../store/actions/user/userActions";
import { AppDispatch } from "../../store/store";
import "../layout.scss";
import Topbar from "./header";
import Sidebar from "./sidebar";

function MainLayout() {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [toggle, setToggle] = useState<Boolean>(false);
  const handleDrawer = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/");
    }
    dispatch(getUsersProfile());
  }, [dispatch]);

  return (
    <>
      {/* topbar */}
      <Topbar onClick={handleDrawer} toggle={toggle} />
      {/* sidebar start */}
      <div className={`sidebar ${toggle ? "sidebarActive" : ""}`}>
        <Sidebar clickHandler={handleDrawer} />
      </div>
      {/* layout */}
      {location.pathname === "/admin/active-inactive-user-list" ? (
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
