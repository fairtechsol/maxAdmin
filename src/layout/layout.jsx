import { useState } from 'react';
// import { GiHamburgerMenu } from 'react-icons/gi';
import './layout.css';
import Sidebar from './main/Sidebar';
import Topbar from './main/Topbar';
function Layout() {
    const [toggle, setToggle] = useState();
    const handleDrawer = () =>{
        setToggle(!toggle)
    }
  return (
    <>
      {/* topbar */}
        <Topbar onClick={()=>handleDrawer()}/>

        {/* sidebar start */}
        <div className={`sidebar ${toggle ? 'sidebarActive' : ''}`}>
            <Sidebar></Sidebar>
        </div>

        {/* layout */}
        


    </>
  );
}

export default Layout;