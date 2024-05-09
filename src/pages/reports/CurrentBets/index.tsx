import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
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
  { id: "match.title", label: "Event Name" },
  { id: "teamName", label: "Runner Name" },
  { id: "betType", label: "Bet Type" },
  { id: "odds", label: "User Rate" },
  { id: "amount", label: "Amount" },
  { id: "createdAt", label: "Place Date" },
  { id: "match.startAt", label: "Match Date" },
];

const options = [
  { value: "PENDING", label: "Matched" },
  { value: "UNMATCHED", label: "UnMatched" },
  { value: "DELETED", label: "Deleted" },
];

const CurrentBets = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [selectType, setSelectType] = useState({
    value: "PENDING",
    label: "Matched",
  });

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {}, [tableConfig]);

  const { ReportBetList } = useSelector(
    (state: RootState) => state.match.bettListSlice
  );

  useEffect(() => {
    if (tableConfig) {
      dispatch(
        betReportAccountList({
          status: selectType?.value,
          page: tableConfig?.page,
          limit: tableConfig?.rowPerPage,
          searchBy: "user.userName",
          keyword: tableConfig?.keyword ?? "",
        })
      );
    }
  }, [tableConfig]);

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
          limit: tableConfig?.rowPerPage,
        })
      );
    } else if (selectType?.value === "UNMATCHED") {
      dispatch(betReportAccountListReset());
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="p-2 pt-0">
      <h5 className="title-22 fw-normal">Current Bets</h5>
      <Form onSubmit={(e) => handleLoad(e)}>
        <Row className="mb-4">
          <Col md={2}>
            <SelectSearch
              defaultValue={[selectType]}
              // defaultValue="matched"
              options={options}
              label={"Account Type"}
              value={selectType}
              onChange={handleType}
            />
          </Col>
          <Col md={2}>
            <Form.Label className="invisible d-block">dasd</Form.Label>
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
            <tr key={index}>
              {columns.map((column, index: number) => (
                <td key={index}>
                  {column?.id === "createdAt" || column?.id === "match.startAt"
                    ? moment(_.get(item, column?.id))
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
