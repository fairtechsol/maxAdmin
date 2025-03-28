import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Column, TableConfig } from "../../../../models/tableInterface";
import CustomTable from "../../../commonComponent/table";
import "../style.scss";

const ProfitLossModal = () => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "Sr", label: "	Sr.No" },
    { id: "TranDate", label: "TranDate" },
    { id: "Credit", label: "Credit" },
    { id: "Debit", label: "Debit" },
    { id: "Closing", label: "Closing" },
    { id: "Remarks", label: "Remarks" },
  ];

  const data: any = [
    {
      Sr: "1",
      TranDate: "25-12-2023",
      Credit: "500",
      Debit: "300",
      Closing: "250",
      Remarks: "When you render",
    },
    {
      Sr: "1",
      TranDate: "25-12-2023",
      Credit: "500",
      Debit: "300",
      Closing: "250",
      Remarks: "When you render",
    },
    {
      Sr: "1",
      TranDate: "25-12-2023",
      Credit: "500",
      Debit: "300",
      Closing: "250",
      Remarks: "When you render",
    },
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
                id={`All`}
              />
              <Form.Check
                color="secondary"
                inline
                label="Matched"
                name="group1"
                type="radio"
                id={`Matched`}
              />
              <Form.Check
                color="secondary"
                inline
                label="Delete"
                name="group1"
                type="radio"
                id={`Delete`}
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
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          >
            {data?.map((item: any, index: number) => {
              const { Sr, TranDate, Credit, Debit, Closing, Remarks } = item;
              return (
                <tr key={index}>
                  <td>{Sr}</td>
                  <td>{TranDate}</td>
                  <td>{Credit}</td>
                  <td>{Debit}</td>
                  <td>{Closing}</td>
                  <td>{Remarks}</td>
                </tr>
              );
            })}
          </CustomTable>
        </Col>
      </Row>
    </div>
  );
};

export default ProfitLossModal;
