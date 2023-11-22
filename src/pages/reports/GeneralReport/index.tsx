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
  { id: "srNo", label: "Sr No" },
  { id: "name", label: "Name" },
  { id: "amount", label: "Amount" },
  { id: "srNo", label: "Sr No." },
  { id: "name", label: "Name" },
  { id: "amount", label: "Amount" },
];

const data: DataItem[] = [];

const options = [
  { value: "generalReport", label: "General Report" },
  { value: "creditRefference", label: "Credit Refference" },
];

const GeneralReport = () => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);

  useEffect(() => {}, [tableConfig]);
  return (
    <>
      <h5>General Report</h5>
      <Form>
        <Row className="mb-4">
          <Col md={2}>
            <SelectSearch
              defaultValue="generalReport"
              options={options}
              label={"Select Type"}
              placeholder={"All"}
            />
          </Col>
          <Col md={2}>
            <Form.Label className="invisible d-block">dasd</Form.Label>
            <Button>Load</Button>
          </Col>
        </Row>
      </Form>
      <CustomTable
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

export default GeneralReport;
