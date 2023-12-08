import { Accordion } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { MenuItem } from "./menuItem";
import menuItemJson from "./menuItem.json";
const Sidebar = (props: any) => {
  return (
    <>
      <div className="sidebarBox bg-light">
        <div className="">
          <div
            className="sidebarBox-close cursor-pointer"
            onClick={props.clickHandler}
          >
            {" "}
            <FaTimes />
          </div>
          <h3 className="title-28 f400 mb-3">Sports</h3>
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
