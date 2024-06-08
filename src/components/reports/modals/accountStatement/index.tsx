import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Column, TableConfig } from "../../../../models/tableInterface";
import { getBetAccountStatementModal } from "../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../store/store";
import CustomTable from "../../../commonComponent/table";
import "../style.scss";
import TooltipCustom from "./tooltip";

const AccountStatementModal = ({ item }: any) => {
  const { betAccountStatementModal } = useSelector(
    (state: RootState) => state.match.reportList
  );
  const dispatch: AppDispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState("all");
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    // { id: "sr", label: "sr" },
    { id: "upLevel", label: "	UpLevel" },
    { id: "UserName", label: "UserName" },
    { id: "Nation", label: "Nation" },
    { id: "UserRate", label: "UserRate" },
    { id: "Amount", label: "Amount" },
    { id: "Winloss", label: "Winloss" },
    { id: "PlaceDate", label: "PlaceDate" },
    { id: "MatchDate", label: "MatchDate" },
    { id: "IP", label: "IP" },
    { id: "BrowseDetail", label: "BrowseDetail" },
  ];

  return (
    <div className="accountStatementModal">
      <Row>
        <Col sm={12}>
          <div className={`d-flex justify-content-between py-2 px-3`}>
            <div className="d-flex align-items-center">
              <Form.Check
                inline
                label="All"
                name="group1"
                type="radio"
                id="all"
                checked={selectedOption === "all"}
                onChange={() => {
                  setSelectedOption("all");
                  dispatch(
                    getBetAccountStatementModal({
                      id: item?.user?.id,
                      betId: item?.betId,
                      sort: "betPlaced.createdAt:DESC",
                    })
                  );
                }}
              />
              <Form.Check
                color="secondary"
                inline
                label="Matched"
                name="group1"
                type="radio"
                id="matched"
                checked={selectedOption === "matched"}
                onChange={() => {
                  setSelectedOption("matched");
                  dispatch(
                    getBetAccountStatementModal({
                      id: item?.user?.id,
                      betId: item?.betId,
                      status: "MATCHED",
                      sort: "betPlaced.createdAt:DESC",
                    })
                  );
                }}
              />
              <Form.Check
                color="secondary"
                inline
                label="Delete"
                name="group1"
                type="radio"
                id="delete"
                checked={selectedOption === "delete"}
                onChange={() => {
                  setSelectedOption("delete");
                  dispatch(
                    getBetAccountStatementModal({
                      id: item?.user?.id,
                      betId: item?.betId,
                      status: "DELETED",
                      sort: "betPlaced.createdAt:DESC",
                    })
                  );
                }}
              />
            </div>
          </div>
        </Col>
        <Col sm={12}>
          <CustomTable
            className="commonTable reportTable accountStatement-table"
            bordered={true}
            striped
            columns={columns}
            itemCount={10}
            setTableConfig={setTableConfig}
          >
            {betAccountStatementModal &&
              betAccountStatementModal?.rows?.map(
                (item: any, index: number) => {
                  const {
                    user,
                    teamName,
                    betType,
                    odds,
                    amount,
                    lossAmount,
                    winAmount,
                    result,
                    createdAt,
                    racingMatch,
                    match,
                    ipAddress,
                    browserDetail,
                  } = item;
                  return (
                    <tr key={index}>
                      <td
                        className={`${betType === "" ? "bg-blue3" : "bg-red1"}`}
                      >
                        {user?.createBy?.userName}
                      </td>
                      <td
                        className={`${betType === "" ? "bg-blue3" : "bg-red1"}`}
                      >
                        {user?.userName}
                      </td>
                      <td
                        className={`${betType === "" ? "bg-blue3" : "bg-red1"}`}
                      >
                        {teamName}
                      </td>
                      <td
                        className={`${betType === "" ? "bg-blue3" : "bg-red1"}`}
                      >
                        {odds}
                      </td>
                      <td
                        className={`${betType === "" ? "bg-blue3" : "bg-red1"}`}
                      >
                        {amount}
                      </td>
                      <td
                        className={`${betType === "" ? "bg-blue3" : "bg-red1"}`}
                        style={{
                          color:
                            result === "LOSS"
                              ? "red"
                              : result === "WIN"
                              ? "green"
                              : "",
                        }}
                      >
                        {result === "LOSS"
                          ? `-${lossAmount}`
                          : result === "WIN"
                          ? winAmount
                          : 0}
                      </td>
                      <td
                        className={`${betType === "" ? "bg-blue3" : "bg-red1"}`}
                      >
                        {moment(createdAt).format("YYYY-MM-DD hh:mm:ss")}
                      </td>
                      <td
                        className={`${betType === "" ? "bg-blue3" : "bg-red1"}`}
                      >
                        {match
                          ? moment(match?.startAt).format("YYYY-MM-DD hh:mm:ss")
                          : moment(racingMatch?.startAt).format(
                              "YYYY-MM-DD hh:mm:ss"
                            )}
                      </td>
                      <td
                        className={`${betType === "" ? "bg-blue3" : "bg-red1"}`}
                      >
                        {ipAddress}
                      </td>
                      <td
                        className={`${betType === "" ? "bg-blue3" : "bg-red1"}`}
                      >
                        <TooltipCustom title={browserDetail}>
                          <a href="#" title="">
                            Detail
                          </a>
                        </TooltipCustom>
                      </td>
                    </tr>
                  );
                }
              )}
          </CustomTable>
        </Col>
      </Row>
    </div>
  );
};

export default AccountStatementModal;
