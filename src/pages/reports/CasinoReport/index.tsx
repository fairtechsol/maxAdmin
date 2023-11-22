import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomInput from "../../../components/commonComponent/input";
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
  { id: "userName", label: "User Name" },
  { id: "casinoType", label: "Casino Type" },
  { id: "gameName", label: "Game Name" },
  { id: "transactionId", label: "Transaction Id" },
  { id: "transactionType", label: "Transaction Type" },
  { id: "gameId", label: "Game Id" },
  { id: "amount", label: "Amount" },
  { id: "date", label: "Date" },
];

const data: DataItem[] = [];

const options = [
  { value: "slotGame", label: "Slot Game" },
  { value: "liveCasino", label: "Live Casino" },
  { value: "liveCasino1", label: "Live Casino 1" },
  { value: "liveCasino2", label: "Live Casino 2" },
];

const CasinoReport = () => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);

  useEffect(() => {}, [tableConfig]);
  return (
    <>
      <h5>Casino Report</h5>
      <Form>
        <Row>
          <Col md={2}>
            <CustomInput
              title={"From"}
              placeholder={""}
              customStyle={"mb-3"}
              type="date"
            />
          </Col>
          <Col md={2}>
            <CustomInput
              title={"To"}
              placeholder={""}
              customStyle={"mb-3"}
              type="date"
            />
          </Col>
          <Col md={2}>
            <SelectSearch
              defaultValue="slotGame"
              options={options}
              label={"Game Type"}
            />
          </Col>
          <Col md={2}>
            <Form.Label className="invisible d-block">dasd</Form.Label>
            <Button>Submit</Button>
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
    </>
  );
};

export default CasinoReport;
