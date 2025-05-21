import moment from "moment-timezone";
import { memo, useEffect, useRef, useState } from "react";
import { Column, TableConfig } from "../../../../models/tableInterface";
import CustomTable from "../../../commonComponent/table";
import TooltipCustom from "../../../reports/modals/accountStatement/tooltip";
import "./style.scss";

function UserBetModalTable({
  selectedCheckedBet,
  setSelectedCheckedBet,
  list,
}: any) {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const rowRef = useRef<HTMLTableRowElement>(null);
  const [rowHeight, setRowHeight] = useState(0);

  useEffect(() => {
    if (rowRef.current) {
      setRowHeight(rowRef.current.offsetHeight - 1);
    }
  }, [list]);

  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "username", label: "	User Name " },
    { id: "nation", label: "Nation " },
    { id: "rate", label: "Rate " },
    { id: "amount", label: "Amount " },
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
        columns={columns}
        itemCount={10}
        setTableConfig={setTableConfig}
        tHeadTheme=""
        customClass=""
        CustomTableClass="ovelay-bet"
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
              match,
              ipAddress,
              browserDetail,
              deleteReason,
            } = item;

            return (
              <tr ref={rowRef} key={id} className="position-relative">
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
                  } text-end position-relative`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCheckedBet?.includes(item)}
                    onChange={() => {}}
                    onClick={() => handleCheckboxToggle(item)}
                    className={`customCheckbox ${
                      selectedCheckedBet?.includes(item) ? "checkbox-bg" : ""
                    }`}
                  />
                </td>
                {deleteReason && (
                  <div
                    className="modal-betDeleteOverlay"
                    style={{ height: `${rowHeight}px` }}
                  >
                    <h5
                      className="text-uppercase"
                      title={`Bet Deleted  Due To ${deleteReason}`}
                    >
                      Bet <span> Deleted </span> Due To {deleteReason}
                    </h5>
                  </div>
                )}
              </tr>
            );
          })}
      </CustomTable>
    </div>
  );
}

export default memo(UserBetModalTable);
