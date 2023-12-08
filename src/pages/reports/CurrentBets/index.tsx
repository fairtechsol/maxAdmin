import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomTable from "../../../components/commonComponent/table";
import { TableConfig } from "../../../models/tableInterface";

interface Column {
  id: string;
  label: string;
}

interface DataItem {
  [key: string]: string | number;
}

// Example usage
const columns: Column[] = [
  { id: "eventType", label: "Event Type" },
  { id: "eventName", label: "Event Name" },
  { id: "Username", label: "Username" },
  { id: "runnerName", label: "Runner Name" },
  { id: "betType", label: "Bet Type" },
  { id: "userRate", label: "User Rate" },
  { id: "amount", label: "Amount" },
  { id: "placeDate", label: "Place Date" },
  { id: "matchDate", label: "Match Date" },
];

const data: DataItem[] = [];

const options = [
  { value: "matched", label: "Matched" },
  { value: "unmatched", label: "UnMatched" },
  { value: "deleted", label: "Deleted" },
];

const CurrentBets = () => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);

  useEffect(() => {}, [tableConfig]);
  return (
    <div className="p-2 pt-0">
      <h5 className="title-22 fw-normal">Current Bets</h5>
      <Form>
        <Row className="mb-4">
          <Col md={2}>
            <SelectSearch
              defaultValue="matched"
              options={options}
              label={"Account Type"}
            />
          </Col>
          <Col md={2}>
            <Form.Label className="invisible d-block">dasd</Form.Label>
            <Button>Load</Button>
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
        itemCount={data?.length}
        setTableConfig={setTableConfig}
        enablePdfExcel={false}
      >
        {data?.length === 0 && <tr>No data available in table </tr>}
        {data?.length > 0 &&
          data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.id}>{item[column.id]}</td>
              ))}
            </tr>
          ))}
      </CustomTable>
    </div>
  );
};

export default CurrentBets;
