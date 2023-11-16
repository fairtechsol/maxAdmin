import { Accordion } from "react-bootstrap";
import { TiTimes } from "react-icons/ti";
import { MenuItem } from "./menuItem";
import menuItemJson from "./menuItem.json";
const Sidebar = (props: any) => {
  return (
    <>
      <div className="sidebarBox bg-light">
        <div className="sidebarBox-close" onClick={props.sidebarCloseBtn}>
          <TiTimes />
        </div>
        {menuItemJson()?.map((item, index) => (
          <Accordion key={index} defaultActiveKey={["0"]}>
            <MenuItem item={item} />
          </Accordion>
        ))}
      </div>
    </>
  );
};
export default Sidebar;
