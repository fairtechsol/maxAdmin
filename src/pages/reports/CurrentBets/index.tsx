import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
//import SelectSearch from "../../../components/commonComponent/SelectSearch";
import SelectSearch2 from "../../../components/commonComponent/SelectSearch2";
import CustomTable from "../../../components/commonComponent/table";
import { TableConfig } from "../../../models/tableInterface";
import {
  betReportAccountList,
  betReportAccountListReset,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import _ from "lodash";
import moment from "moment-timezone";
import SelectSearch3 from "../../../components/commonComponent/SelectSearch3";
import { Tabs, Tab } from "react-bootstrap";
import "./style.scss";

interface Column {
  id: string;
  label: string;
}

// Example usage
const columns: Column[] = [
  { id: "eventType", label: "Event Type" },
  { id: "eventName", label: "Event Name" },
  { id: "user.userName", label: "Username" },
  { id: "marketType", label: "M Name" },
  { id: "teamName", label: "Nation" },
  { id: "odds", label: "User Rate" },
  { id: "amount", label: "Amount" },
  { id: "createdAt", label: "Place Date" },
  // { id: "startAt", label: "Match Date" },
];

const options = [
  { value: "PENDING", label: "Matched" },
  // { value: "UNMATCHED", label: "UnMatched" },
  { value: "DELETED", label: "Deleted" },
];

const options2 = [
  { value: "ALL", label: "All" },
  { value: "BACK", label: "Back" },
  { value: "LAY", label: "Lay" },
];
const CurrentBets = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>({
    page: 1,
    sort: { direction: "ASC", key: null },
    rowPerPage: 25,
    keyword: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState<any>("");
  const [page, setPage] = useState<any>(1);
  const [rowPerPage, setRowPerPage] = useState<any>(25);
  const [tab, setTab] = useState<any>("neCARD");
  const [sort, setSort] = useState({
    direction: "ASC",
    key: null,
  });
  const [selectType, setSelectType] = useState({
    value: "PENDING",
    label: "Matched",
  });

  const [selectType2, setSelectType2] = useState({
    value: "ALL",
    label: "All",
  });
  const { ReportBetList } = useSelector(
    (state: RootState) => state.match.bettListSlice
  );
  const [betList, setBetList] = useState<any>(ReportBetList);
  useEffect(() => {
    setBetList(ReportBetList);
  }, [ReportBetList]);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// console.log('betList',betList);

  useEffect(() => {
    dispatch(
      betReportAccountList({
        status: selectType?.value,
        page: page,
        limit: rowPerPage,
        searchBy: "user.userName",
        keyword: keyword || "",
        marketBetType: tab,
        // betType: "BACK",
      })
    );
  }, [keyword, page, rowPerPage, tab]);

  const handleType = (type: any) => {
    setSelectType(type);
     const filteredBets = ReportBetList?.rows?.filter((bet:any) => bet.result === type.value);
     setBetList({
    ...ReportBetList,
    rows: filteredBets,
    count: filteredBets.length, 
  });
  };

  const handleType2 = (type: any) => {
    setSelectType2(type);
    if(type.value==="ALL"){
      setBetList(ReportBetList);
    }else{
      const filteredBets = ReportBetList?.rows?.filter((bet:any) => bet.betType === type.value);
      setBetList({
      ...ReportBetList,
      rows: filteredBets,
      count: filteredBets.length, 
    });
    }
  };

  const handleLoad = (e?: any) => {
    if (e) {
      e.preventDefault();
    }
    if (selectType?.value === "PENDING" || selectType?.value === "DELETED") {
      dispatch(
        betReportAccountList({
          status: selectType?.value,
          page: 1,
          limit: rowPerPage,
          searchBy: "user.userName",
          keyword: keyword || "",
          marketBetType: tab,
          // betType: "BACK",
        })
      );
      setCurrentPage(1);
    } else if (selectType?.value === "UNMATCHED") {
      dispatch(betReportAccountListReset());
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    if (page !== tableConfig?.page) {
      setPage(tableConfig?.page);
    }
    if (keyword !== tableConfig?.keyword) {
      setKeyword(tableConfig?.keyword);
    }
    if (
      sort?.direction !== tableConfig?.sort?.direction ||
      sort?.key !== tableConfig?.sort?.key
    ) {
      setSort(tableConfig?.sort);
    }
    if (rowPerPage !== tableConfig?.rowPerPage) {
      setRowPerPage(tableConfig?.rowPerPage);
    }
  }, [tableConfig]);
  const getStartAt = (item: any) => {
    return item?.match?.startAt || item?.racingMatch?.startAt;
  };

  const handleSelect = (k: any) => {
    if (k === "tab1") {
      setTab("neCARD");
    } else if (k === "tab2") {
      setTab("eqCARD");
    }
    console.log("Selected Tab Value:", tab);
  };

  return (
    <div className="p-2 pt-0">
      <h5 className="title-22 fw-normal">Current Bets</h5>

      <Tabs defaultActiveKey="tab1" id="betReportTabs" onSelect={handleSelect}>
        {/* Tab 1 */}
        <Tab eventKey="tab1" title="Sports">
          <Form onSubmit={(e) => handleLoad(e)} className="mt-1">
            <Row className="d-flex align-items-center">
              <Col md={3}>
                <SelectSearch2
                  defaultValue={"PENDING"}
                  options={options}
                  label={"Choose Type"}
                  value={selectType}
                  onChange={handleType}
                />
              </Col>
            </Row>
            <Row className="d-flex align-items-center">
              <Col md={3}>
                <SelectSearch3
                  defaultValue={"ALL"}
                  options={options2}
                  label={"Choose Type2"}
                  value={selectType2}
                  onChange={handleType2}
                />
              </Col>
              <Col md={2}>
                <Button type="submit">Load</Button>
              </Col>
              <Col md={{ span: 4 }} />
              <Col md={3} className="text-end">
                <span>
                  {`Total Soda: ${
                    betList?.rows?.length
                  } Total Amount: ${parseFloat(
                    betList?.rows?.reduce((acc: any, match: any) => {
                      return acc + +match?.amount;
                    }, 0) || "0.00"
                  ).toFixed(2)}`}
                </span>
              </Col>
            </Row>
          </Form>

          <CustomTable
            customClass="commonTable reportTable"
            // striped
            columns={columns}
            isPagination={true}
            // isSort={true}
            isSearch={true}
            itemCount={
              betList && betList?.count > 0
                ? betList?.count
                : 1
            }
            setTableConfig={setTableConfig}
            enablePdfExcel={false}
            tableConfig={tableConfig}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          >
            {betList && betList?.count === 0 && (
              <tr>
                <td colSpan={columns.length}>No data available in table</td>
              </tr>
            )}
            {betList?.count > 0 &&
              betList?.rows?.map((item: any, index: number) => {
                const isBackBet =
                  item?.betType === "BACK" || item?.betType === "YES";
                const isLayBet =
                  item?.betType === "LAY" || item?.betType === "NO";

                if (
                  (isBackBet && selectType2?.value === "BACK") ||
                  (isLayBet && selectType2?.value === "LAY") ||
                  selectType2?.value === "ALL"
                ) {
                  return (
                    <tr
                      key={index}
                      className={isBackBet ? "back-border" : "lay-border"}
                    >
                      {columns.map((column: any, columnIndex: number) => (
                        <td
                          style={{ fontSize: "14px" }}
                          key={columnIndex}
                          className={isBackBet ? "back-border" : "lay-border"}
                        >
                          {column?.id === "createdAt"
                            ? moment(_.get(item, column.id))
                                .tz(timezone)
                                .format("YYYY-MMM-DD h:mmA [IST]")
                            : column?.id === "startAt"
                            ? moment(getStartAt(item))
                                .tz(timezone)
                                .format("YYYY-MMM-DD h:mmA [IST]")
                            : _.get(item, column.id)}
                        </td>
                      ))}
                    </tr>
                  );
                }
                return null;
              })}
          </CustomTable>
        </Tab>

        {/* Tab 2 */}
        <Tab eventKey="tab2" title="Casino">
          {/* Render the same form and table, you can customize based on tab if necessary */}
          <Form onSubmit={(e) => handleLoad(e)} className="mt-1">
            <Row className="mb-4 d-flex align-items-center">
              <Col md={3}>
                <SelectSearch2
                  defaultValue={[selectType]}
                  options={options}
                  label={"Choose Type"}
                  value={selectType}
                  onChange={handleType}
                />
                <SelectSearch3
                  defaultValue={[selectType2]}
                  options={options2}
                  label={"Choose Type2"}
                  value={selectType2}
                  onChange={handleType2}
                />
              </Col>
              <Col md={2} className="d-flex align-items-center">
                <Form.Label className="invisible d-block mt-1">
                  Label
                </Form.Label>
                <Button type="submit">Load</Button>
              </Col>
            </Row>
          </Form>

          <CustomTable
            customClass="commonTable reportTable"
            striped
            columns={columns}
            isPagination={true}
            isSort={true}
            isSearch={true}
            itemCount={
              betList && betList?.count > 0
                ? betList?.count
                : 1
            }
            setTableConfig={setTableConfig}
            enablePdfExcel={false}
            tableConfig={tableConfig}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          >
            {betList && betList?.count === 0 && (
              <tr>
                <td colSpan={columns.length}>No data available in table</td>
              </tr>
            )}
            {betList?.count > 0 &&
              betList?.rows?.map((item: any, index: number) => {
                const isBackBet =
                  item?.betType === "BACK" || item?.betType === "YES";
                const isLayBet =
                  item?.betType === "LAY" || item?.betType === "NO";

                if (
                  (isBackBet && selectType2?.value === "BACK") ||
                  (isLayBet && selectType2?.value === "LAY") ||
                  selectType2?.value === "ALL"
                ) {
                  return (
                    <tr
                      key={index}
                      className={isBackBet ? "back-border" : "lay-border"}
                    >
                      {columns.map((column: any, columnIndex: number) => (
                        <td
                          key={columnIndex}
                          className={isBackBet ? "back-border" : "lay-border"}
                        >
                          {column?.id === "createdAt"
                            ? moment(_.get(item, column.id))
                                .tz(timezone)
                                .format("YYYY-MMM-DD h:mmA [IST]")
                            : column?.id === "startAt"
                            ? moment(getStartAt(item))
                                .tz(timezone)
                                .format("YYYY-MMM-DD h:mmA [IST]")
                            : _.get(item, column.id)}
                        </td>
                      ))}
                    </tr>
                  );
                }
                return null;
              })}
          </CustomTable>
        </Tab>
      </Tabs>
    </div>
  );
};

export default CurrentBets;
