import { useEffect, useState } from "react";
import { Column, TableConfig } from "../../../../models/tableInterface";
import CustomTable from "../../../commonComponent/table";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import moment from "moment-timezone";
import TooltipCustom from "../../../reports/modals/accountStatement/tooltip";

function UserBetModalTable() {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { morePlacedBets } = useSelector(
    (state: RootState) => state.match.placeBets
  );
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "sr", label: "S. NO" },
    { id: "username", label: "	User Name " },
    { id: "nation", label: "Nation " },
    { id: "betType", label: "BetType " },
    { id: "amount", label: "Amount " },
    { id: "userRate", label: "UserRate " },
    { id: "placeDate", label: "PlaceDate " },
    { id: "matchDate", label: "MatchDate " },
    { id: "ip", label: "IP " },
    { id: "browserDetail", label: "BrowserDetail " },
  ];

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
        {morePlacedBets?.length === 0 && (
          <tr className="text-center">No Record Found!</tr>
        )}
        {morePlacedBets?.length > 0 &&
          morePlacedBets?.map((item: any, index: number) => {
            const {
              id,
              user,
              eventName,
              betType,
              amount,
              odds,
              createdAt,
              match,
              ipAddress,
              browserDetail,
            } = item;

            return (
              <tr key={id}>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                >
                  {index + 1}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                >
                  {user?.userName}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                >
                  {eventName}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                >
                  {betType}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                >
                  {amount}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                >
                  {odds}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                >
                  {moment(createdAt).format("YYYY-MM-DD hh:mm:ss")}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                >
                  {moment(match?.startAt).format("YYYY-MM-DD hh:mm:ss")}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                >
                  {ipAddress}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                >
                  <TooltipCustom title={browserDetail}>
                    <a href="#" title="">
                      Detail
                    </a>
                  </TooltipCustom>
                </td>
              </tr>
            );
          })}
      </CustomTable>
    </div>
  );
}

export default UserBetModalTable;
