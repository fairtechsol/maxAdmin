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
  { id: "srNo", label: "Sr No" },
  { id: "name", label: "Name" },
  { id: "amount", label: "Amount" },
  { id: "srNo", label: "Sr No" },
  { id: "name", label: "Name" },
  { id: "amount", label: "Amount" },
];

const data: DataItem[] = [];

const options = [
  { value: "all", label: "All" },
  { value: "match", label: "Match" },
  { value: "fancy", label: "Fancy" },
];

const GameReport = () => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);

  useEffect(() => {}, [tableConfig]);
  return (
    <>
      <h5>Game Report</h5>
      <Form className="mb-4">
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
              label={"Type"}
            />
          </Col>
          <Col md={2}>
            <Form.Label className="invisible d-block">dasd</Form.Label>
            <Button>Game List</Button>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <SelectSearch defaultValue="all" options={options} />
          </Col>
          <Col md={2}>
            <div className="d-flex">
              <Button className="me-2">Show Game Report</Button>
              <Button>Master Game Report</Button>
            </div>
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

export default GameReport;
