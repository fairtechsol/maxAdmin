import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Sidebar from './main/Sidebar';
function Layout() {
    const [toggle, setToggle] = useState('');
    const handleDrawer = () =>{
        alert('dghasd')
        setToggle(!toggle)
    }
  return (
    <>
        <div onClick={()=>handleDrawer}><GiHamburgerMenu /></div>
        <div className={`sidebarBox ${toggle ? 'sidebarActive' : ''}`}>
            <Sidebar></Sidebar>
        </div>
    </>
  );
}

export default Layout;