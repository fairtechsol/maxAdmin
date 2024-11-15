
import { useEffect, useState } from "react";
// import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
// import { searchList } from "../../../../store/actions/user/userActions";
import {  getMorePlacedBetsReset } from "../../../../store/actions/match/matchAction";
import UserBetModalTableCasino from "./userbetModal";

const UserBetModalForm = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [filteredItems, setFilteredItems] = useState([]);
 

  
  // useEffect(() => {
  //   if (searchListData) {
  //     const options = searchListData?.users?.map((user: any) => ({
  //       value: user.id,
  //       label: user.userName,
  //     }));
  //     setUserOptions(options);
  //   }
  // }, [searchListData]);
  useEffect(() => {
    const filtered = props?.morePlacedBets?.filter(
      (item: any) => item?.deleteReason === null
    );
    setFilteredItems(filtered);
    return () => {
      dispatch(getMorePlacedBetsReset());
    };
  }, []);
  
  

  
  

  

  return (
    <form
      className={`UserBetModalForm ${props.customClass} `}
    >
     
      <div
        className="d-flex flex-column p-1"
        style={{ border: "1px solid #b6b4b4" }}
      >
       
        <UserBetModalTableCasino list={filteredItems} />
      </div>
    </form>
  );
};

export default UserBetModalForm;
