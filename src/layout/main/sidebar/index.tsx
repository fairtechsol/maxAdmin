import { Accordion } from "react-bootstrap";
import { TiTimes } from "react-icons/ti";
import { MenuItem } from "./menuItem";
import menuItemJson from "./menuItem.json";
const Sidebar = (props: any) => {
  return (
    <>
      <div className="sidebarBox bg-light">
        <div className=" ">
          <h3 className="title-32 f400">Sports</h3>
          <div
            className="sidebarBox-close cursor-pointer"
            onClick={props.clickHandler}
          >
            <TiTimes />
          </div>
        </div>
        {menuItemJson()?.map((item, index) => (
          <Accordion key={index} defaultActiveKey={[]}>
            <MenuItem item={item} />
          </Accordion>
        ))}
      </div>
    </>
  );
};
export default Sidebar;
