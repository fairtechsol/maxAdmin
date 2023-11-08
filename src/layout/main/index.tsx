import { useState } from "react";
// import { GiHamburgerMenu } from 'react-icons/gi';
import { Outlet } from "react-router-dom";
import CommonHeader from "../../components/commonHeader";
import "../layout.css";
import Topbar from "./header";
import Sidebar from "./sidebar";
function MainLayout() {
  const [toggle, setToggle] = useState<Boolean>();
  const handleDrawer = () => {
    setToggle(!toggle);
  };
  return (
    <>
      {/* topbar */}
      <Topbar onClick={() => handleDrawer()} />

      {/* sidebar start */}
      <div className={`sidebar ${toggle ? "sidebarActive" : ""}`}>
        <Sidebar />
      </div>
      {/* layout */}
      <main className="page-content ">
        <CommonHeader />
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
