import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCompetitionList } from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import { MenuItem } from "./menuItem";
import menuItemJson from "./menuItem.json";
const Sidebar = (props: any) => {

  const [menuItemList, setMenuItemList] = useState<any>([]);
  const [selectedMatch, setSelectedMatch] = useState("");


  useEffect(() => {
    setMenuItemList(menuItemJson);
  }, [menuItemJson]);




  const dispatch: AppDispatch = useDispatch();

  const { competitionList } = useSelector(
    (state: RootState) => state.match.sidebarList
  );

  useEffect(() => {
    if (selectedMatch !== "") {
      const tempList = [...menuItemList];
      const matchIndex = tempList.findIndex(
        (item: any) => item?.id === selectedMatch
      );
      tempList[matchIndex].children = competitionList?.map(
        (item: any) => ({
          name: item?.competitionName,
          id: item?.competitionId,
          type: "collapse",
          children: [],
        })
      );
      setMenuItemList(tempList);
    }
  }, [competitionList, selectedMatch]);


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
        {menuItemList?.map((item: any, index: number) => (
          <Accordion onSelect={(e: any) => {
            if (e == 0) {
              setSelectedMatch(item?.id);
              dispatch(getCompetitionList(item?.id));
            }
          }} key={index} defaultActiveKey={[]}>
            <MenuItem onClickMenuItem={props.clickHandler} item={item} menuItemList={menuItemList}
              setMenuItemList={setMenuItemList} selectedMatchIndex={index} />
          </Accordion>
        ))}
      </div>
    </>
  );
};
export default Sidebar;
