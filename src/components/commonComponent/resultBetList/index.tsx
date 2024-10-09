import { useState } from "react";
import moment from "moment";
import { Column } from "../../../models/tableInterface";
const columns: Column[] = [
  { id: "nation", label: "Nation " },
  { id: "rate", label: "Rate " },
  { id: "amount", label: "Amount " },
  { id: "win", label: "Win" },
  { id: "matchDate", label: "MatchDate " },
  { id: "ip", label: "IP " },
  { id: "browserDetail", label: "BrowserDetail " },
  { id: "action", label: "Action " },
];
const ResultBetList = ({ bets, total }: any) => {
  const [selected, setSelected] = useState("all");
  const [list, setList] = useState(bets);

  const handleRadioChange = (type: any) => {
    setSelected(type);
    if (type === "back") {
      const filtered = bets.filter(
        (item: any) => item?.betType === "BACK" || item?.betType === "back"
      );
      setList(filtered);
    } else if (type === "lay") {
      const filtered = bets.filter(
        (item: any) => item?.betType === "LAY" || item?.betType === "lay"
      );
      setList(filtered);
    } else if (type === "delete") {
      const filtered = bets.filter((item: any) => item?.deleteReason != null);
      setList(filtered);
    } else {
      setList(bets);
    }
  };
  return (
    <div className="w-100 d-flex flex-column">
      <div className="w-100 d-flex flex-row justify-content-between">
        <div className="w-25 d-flex flex-row justify-content-around">
          <input
            type="radio"
            id={selected}
            name="betType"
            defaultChecked
            onChange={() => handleRadioChange("all")}
          />
          <label>All</label>
          <input
            type="radio"
            id={selected}
            name="betType"
            onChange={() => handleRadioChange("back")}
          />
          <label>Back</label>
          <input
            type="radio"
            id={selected}
            name="betType"
            onChange={() => handleRadioChange("lay")}
          />
          <label>Lay</label>
          <input
            type="radio"
            id={selected}
            name="betType"
            onChange={() => handleRadioChange("delete")}
          />
          <label>Deleted</label>
        </div>
        <div className="w-25 d-flex flex-row justify-content-around">
          <span>Total Bets: 1</span>
          <span>Total Amount: {total}</span>
        </div>
      </div>
    </div>
  );
};
export default ResultBetList;
