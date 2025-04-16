import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMorePlacedBetsReset } from "../../../../store/actions/match/matchAction";
import { AppDispatch } from "../../../../store/store";
import UserBetModalTableCasino from "./userbetModal";

interface UserBetModalFormProps {
  morePlacedBets: any;
  customClass: string;
  matchId?: string;
}

const UserBetModalForm = ({
  morePlacedBets,
  customClass,
}: UserBetModalFormProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const filtered = morePlacedBets?.filter(
      (item: any) => item?.deleteReason === null
    );
    setFilteredItems(filtered);
    return () => {
      dispatch(getMorePlacedBetsReset());
    };
  }, []);

  return (
    <form className={`UserBetModalForm ${customClass} `}>
      <div
        className="d-flex flex-column p-1"
        style={{ border: "1px solid #b6b4b4" }}
      >
        <UserBetModalTableCasino list={filteredItems} />
      </div>
    </form>
  );
};

export default memo(UserBetModalForm);
