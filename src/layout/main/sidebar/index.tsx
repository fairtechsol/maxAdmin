import { Accordion } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import { MenuItem } from "./menuItem";
import menuItemJson from "./menuItem.json";
const Sidebar = (props: any) => {
  return (
    <>
      <div className="sidebarBox bg-light">
        <div className="sidebarBox-close" onClick={props.sidebarCloseBtn}>
          <GiHamburgerMenu />
        </div>
        {menuItemJson()?.map((item) => (
          <Accordion defaultActiveKey={["0"]}>
            <MenuItem item={item} />
          </Accordion>
        ))}
      </div>
    </>
  );
};
export default Sidebar;
