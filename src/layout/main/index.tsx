import { useState } from "react";
// import { GiHamburgerMenu } from 'react-icons/gi';
import { Outlet, useLocation } from "react-router-dom";
import "../layout.scss";
import Topbar from "./header";
import Sidebar from "./sidebar";

function MainLayout() {
  let location = useLocation();

  const [toggle, setToggle] = useState<Boolean>(false);
  const handleDrawer = () => {
    setToggle(!toggle);
  };
  return (
    <>
      {/* topbar */}
      <Topbar onClick={handleDrawer} toggle={toggle} />
      {/* sidebar start */}
      <div className={`sidebar ${toggle ? "sidebarActive" : ""}`}>
        <Sidebar clickHandler={handleDrawer} />
      </div>
      {/* layout */}
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
