import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomTable from "../../../components/commonComponent/table";
import { TableConfig } from "../../../models/tableInterface";
import { betReportAccountList } from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";

interface Column {
  id: string;
  label: string;
}

// Example usage
const columns: Column[] = [
  { id: "userName", label: "Username" },
  { id: "eventType", label: "Event Type" },
  { id: "eventName", label: "Event Name" },
  { id: "runnerName", label: "Runner Name" },
  { id: "betType", label: "Bet Type" },
  { id: "userRate", label: "User Rate" },
  { id: "amount", label: "Amount" },
  { id: "placeDate", label: "Place Date" },
  { id: "matchDate", label: "Match Date" },
];

const options = [
  { value: "MATCHED", label: "Matched" },
  { value: "UNMATCHED", label: "UnMatched" },
  { value: "DELETED", label: "Deleted" },
];

const CurrentBets = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [selectType, setSelectType] = useState({ value: "MATCHED", label: "Matched" });

  useEffect(() => { }, [tableConfig]);

  const { ReportBetList } = useSelector((state: RootState) => state.match.bettListSlice);

  useEffect(() => {
    dispatch(betReportAccountList({ status: selectType?.value }));
  }, []);

  const handleType = (type: any) => {
    setSelectType(type);
  };

  const handleLoad = (e: any) => {
    e.preventDefault();
    dispatch(betReportAccountList({ status: selectType?.value }));
  };

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
        itemCount={ReportBetList && ReportBetList?.count > 0 ? ReportBetList?.count : 0}
        setTableConfig={setTableConfig}
        enablePdfExcel={false}
      >
        {ReportBetList && ReportBetList?.count === 0 && <tr>No data available in table </tr>}
        {ReportBetList?.count > 0 &&
          ReportBetList?.list?.map((item: any, index: number) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.id}>{item[column.id]}</td>
                // <td key={index}>{item.userName}</td>
              ))}
            </tr>
          ))}
      </CustomTable>
    </div >
  );
};

export default CurrentBets;
