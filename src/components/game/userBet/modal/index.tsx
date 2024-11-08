import { useEffect, useState } from "react";
import { Column, TableConfig } from "../../../../models/tableInterface";
import CustomTable from "../../../commonComponent/table";
import "./style.scss";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../../store/store";
import moment from "moment-timezone";
import TooltipCustom from "../../../reports/modals/accountStatement/tooltip";
import DeleteBetOverlay from "../../../commonComponent/deleteBetRow";

function UserBetModalTable({
  selectedCheckedBet,
  setSelectedCheckedBet,
  list,
}: any) {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    // { id: "sr", label: "S. NO" },
    { id: "username", label: "	User Name " },
    { id: "nation", label: "Nation " },
    { id: "rate", label: "Rate " },
    { id: "amount", label: "Amount " },
    // { id: "userRate", label: "UserRate " },
    // { id: "placeDate", label: "PlaceDate " },
    { id: "matchDate", label: "Date " },
    { id: "ip", label: "IP " },
    { id: "browserDetail", label: "BrowserDetail " },
    { id: "action", label: "Action " },
  ];

  function handleCheckboxToggle(item: any) {
    setSelectedCheckedBet((prevSelected: any) =>
      prevSelected.includes(item)
        ? prevSelected.filter(
            (selectedItem: any) => selectedItem?.id !== item?.id
          )
        : [...prevSelected, item]
    );
  }

  return (
    <div className="activeUsers-modal">
      <CustomTable
        // striped
        columns={columns}
        itemCount={10}
        setTableConfig={setTableConfig}
        tHeadTheme=""
        customClass=""
        CustomTableClass=""
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {list?.length === 0 && (
          <tr className="text-center">
            <td colSpan={10}>No Record Found!</td>
          </tr>
        )}
        {list?.length > 0 &&
          list?.map((item: any) => {
            const {
              id,
              user,
              eventName,
              betType,
              amount,
              odds,
              // createdAt,
              match,
              ipAddress,
              browserDetail,
              deleteReason,
            } = item;

            return (
              <tr key={id} className="position-relative">
                {/* <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                >
                  {index + 1}
                </td> */}
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue1"
                  }
                >
                  {user?.userName}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue1"
                  }
                >
                  {eventName}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue1"
                  }
                >
                  {odds}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue1"
                  }
                >
                  {amount}
                </td>
                {/* <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                >
                  {odds}
                </td> */}
                {/* <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                >
                  {moment(createdAt).format("YYYY-MM-DD hh:mm:ss")}
                </td> */}
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue1"
                  }
                >
                  {moment(match?.startAt).format("YYYY-MM-DD hh:mm:ss")}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue1"
                  }
                >
                  {ipAddress}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue1"
                  }
                >
                  <TooltipCustom title={browserDetail}>
                    <a href="#" title="">
                      Detail
                    </a>
                  </TooltipCustom>
                </td>
                <td
                  className={`${
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue1"
                  } text-end`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCheckedBet?.includes(item)}
                    onClick={() => handleCheckboxToggle(item)}
                    className={`customCheckbox ${
                      selectedCheckedBet?.includes(item) ? "checkbox-bg" : ""
                    }`}
                  />
                </td>
                <DeleteBetOverlay title={deleteReason} />
              </tr>
            );
          })}
      </CustomTable>
    </div>
  );
}

export default UserBetModalTable;
