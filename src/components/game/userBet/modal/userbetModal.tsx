import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Column, TableConfig } from "../../../../models/tableInterface";
import DeleteBetOverlay from "../../../commonComponent/deleteBetRow";
import CustomTable from "../../../commonComponent/table";
import TooltipCustom from "../../../reports/modals/accountStatement/tooltip";
import "./style.scss";

function UserBetModalTableCasino({
  selectedCheckedBet,
  setSelectedCheckedBet,
  list,
}: any) {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "sr", label: "S. NO" },
    { id: "username", label: "	User Name " },
    { id: "nation", label: "Nation " },
    { id: "amount", label: "Amount " },
    { id: "rate", label: "User Rate " },
    { id: "matchDate", label: "Place Date " },
    { id: "ip", label: "IP " },
    { id: "browserDetail", label: "Browser Details " },
  ];

  return (
    <div className="activeUsers-modal">
      <CustomTable
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
          list?.map((item: any, index: number) => {
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
              <tr key={id} className="position-relative">
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
                  {amount}
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

                <DeleteBetOverlay title={deleteReason} />
              </tr>
            );
          })}
      </CustomTable>
    </div>
  );
}

export default UserBetModalTableCasino;
