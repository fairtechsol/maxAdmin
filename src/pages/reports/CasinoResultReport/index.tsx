import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomInput from "../../../components/commonComponent/input";
import CustomModal from "../../../components/commonComponent/modal";
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
  { id: "roundId", label: "Round Id" },
  { id: "winner", label: "Winner" },
];

const data: DataItem[] = [
  { RoundID: "1001254", winner: "Teen B" },
  { RoundID: "1001254", winner: "Teen B" },
];

const options = [
  { value: "slotGame", label: "Slot Game" },
  { value: "liveCasino", label: "Live Casino" },
  { value: "liveCasino1", label: "Live Casino 1" },
  { value: "liveCasino2", label: "Live Casino 2" },
];

const CasinoResultReport = () => {
  const [casinoModalShow, setCasinoModalShow] = useState(false);
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);

  useEffect(() => {}, [tableConfig]);
  return (
    <div className="p-2 pt-0">
      <h5 className="title-22 fw-normal">Casino Result Report</h5>
      <Form>
        <Row>
          <Col md={2}>
            <CustomInput placeholder={""} customstyle={"mb-3"} type="date" />
          </Col>
          <Col md={2}>
            <SelectSearch defaultValue="slotGame" options={options} />
          </Col>
          <Col md={2}>
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
          data.map((item, index) => {
            const { RoundID, winner } = item;
            return (
              // <tr key={index}>
              //   {columns.map((column) => (
              //     <td key={column.id}>
              //       {item[column.id]}
              //     </td>
              //   ))}
              // </tr>
              <tr key={index}>
                <td>
                  <div onClick={() => setCasinoModalShow((prev) => !prev)}>
                    <Link to="">{RoundID}</Link>
                  </div>
                </td>
                <td>{winner}</td>
              </tr>
            );
          })}
      </CustomTable>
      <CustomModal
        show={casinoModalShow}
        setShow={setCasinoModalShow}
        title="Result Detail"
        titleStyle="fw-normal"
      >
        <h1>APi Fetch</h1>
      </CustomModal>
    </div>
  );
};

export default CasinoResultReport;
