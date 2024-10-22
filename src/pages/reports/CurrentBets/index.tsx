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

interface Column {
  id: string;
  label: string;
}

// Example usage
const columns: Column[] = [
  { id: "user.userName", label: "Username" },
  { id: "eventType", label: "Event Type" },
  { id: "eventName", label: "Event Name" },
  { id: "teamName", label: "Runner Name" },
  { id: "betType", label: "Bet Type" },
  { id: "odds", label: "User Rate" },
  { id: "amount", label: "Amount" },
  { id: "createdAt", label: "Place Date" },
  { id: "startAt", label: "Match Date" },
];

const options = [
  { value: "PENDING", label: "Matched" },
  { value: "UNMATCHED", label: "UnMatched" },
  { value: "DELETED", label: "Deleted" },
];

const CurrentBets = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>({
    page: 1,
    sort: { direction: "ASC", key: null },
    rowPerPage: 10,
    keyword: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState<any>("");
  const [page, setPage] = useState<any>(1);
  const [rowPerPage, setRowPerPage] = useState<any>(10);
  const [sort, setSort] = useState({
    direction: "ASC",
    key: null,
  });
  const [selectType, setSelectType] = useState({
    value: "PENDING",
    label: "Matched",
  });

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const { ReportBetList } = useSelector(
    (state: RootState) => state.match.bettListSlice
  );

  useEffect(() => {
    dispatch(
      betReportAccountList({
        status: selectType?.value,
        page: page,
        limit: rowPerPage,
        searchBy: "user.userName",
        keyword: keyword || "",
      })
    );
  }, [keyword, page, rowPerPage, sort]);

  const handleType = (type: any) => {
    setSelectType(type);
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
  return (
    <div className="p-2 pt-0">
      <h5 className="title-22 fw-normal">Current Bets</h5>
      <Form onSubmit={(e) => handleLoad(e)}>
        <Row className="mb-4">
          <Col md={2}>
            <SelectSearch2
              defaultValue={[selectType]}
              // defaultValue="matched"
              options={options}
              label={"Choose Type"}
              value={selectType}
              onChange={handleType}
            />
          </Col>
          <Col md={2}>
            <Form.Label className="invisible d-block mt-1">dasd</Form.Label>
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
          ReportBetList && ReportBetList?.count > 0 ? ReportBetList?.count : 1
        }
        setTableConfig={setTableConfig}
        enablePdfExcel={false}
        tableConfig={tableConfig}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}

        
      >
        {ReportBetList && ReportBetList?.count === 0 && (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>No data available in table</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )}
        {ReportBetList?.count > 0 &&
          ReportBetList?.rows?.map((item: any, index: number) => (
            <tr key={index} >
              {columns.map((column, index: number) => (
                <td key={index}>
                  {column?.id === "createdAt"
                    ? moment(_.get(item, column?.id))
                        .tz(timezone)
                        .format("YYYY-MMM-DD h:mmA [IST]")
                    : column?.id === "startAt"
                    ? moment(getStartAt(item))
                        .tz(timezone)
                        .format("YYYY-MMM-DD h:mmA [IST]")
                    : _.get(item, column?.id)}
                </td>
              ))}
            </tr>
          ))}
      </CustomTable>
    </div>
  );
};

export default CurrentBets;
