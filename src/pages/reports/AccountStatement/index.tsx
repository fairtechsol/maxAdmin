import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomButton from "../../../components/commonComponent/button";
import CustomInput from "../../../components/commonComponent/input";
import CustomModal from "../../../components/commonComponent/modal";
import CustomTable from "../../../components/commonComponent/table";
import AccountStatementModal from "../../../components/reports/modals/accountStatement";
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
  { id: "date", label: "Date" },
  { id: "credit", label: "Credit" },
  { id: "debit", label: "Debit" },
  { id: "closing", label: "Closing" },
  { id: "description", label: "Description" },
  { id: "fromto", label: "Fromto" },
];

const data: DataItem[] = [
  {
    date: "John",
    credit: 25,
    debit: 30,
    closing: "New York",
    description: "Cricket/3.3 over run SS W/Fancy-25",
    fromto: JSON.stringify(new Date()),
  },
  {
    date: "Jane",
    credit: 30,
    debit: 30,
    closing: "New York",
    description: "TEEN/Teen Patti Rno. 231611124752/Teen-Player B",
    fromto: JSON.stringify(new Date()),
  },
  {
    date: "Bob",
    credit: 22,
    debit: 30,
    closing: "New York",
    description: "Cricket/3.3 over run SS W/Fancy-25",
    fromto: JSON.stringify(new Date()),
  },
  {
    date: "Bob",
    credit: 22,
    debit: 30,
    closing: "New York",
    description: "Cricket/3.3 over run SS W/Fancy-25",
    fromto: JSON.stringify(new Date()),
  },
  {
    date: "Bob",
    credit: 22,
    debit: 30,
    closing: "New York",
    description: "Cricket/3.3 over run SS W/Fancy-25",
    fromto: JSON.stringify(new Date()),
  },
];

const options = [
  { value: "all", label: "All" },
  { value: "balaceReport", label: "Balace Report" },
  { value: "gameReport", label: "Game Report" },
];

const AccountStatement = () => {
  const [AccountStatementModalShow, setAccountStatementModalShow] =
    useState(false);
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);

  useEffect(() => {}, [tableConfig]);
  return (
    <>
      <h5>Account Statement</h5>
      <Form>
        <Row>
          <Col md={2}>
            <SelectSearch
              defaultValue="All"
              options={options}
              placeholder="All"
              label={"Account Type"}
            />
          </Col>
          <Col md={2}>
            <SelectSearch
              defaultValue="All"
              label={"Game Name"}
              options={options}
              placeholder={"All"}
            />
          </Col>
          <Col md={2}>
            <SelectSearch
              defaultValue="All"
              label={"Search By Client Name"}
              options={options}
              placeholder={"Client Name:"}
              isMultiOption={true}
            />
          </Col>
          <Col md={2}>
            <CustomInput
              title={"From"}
              placeholder={""}
              customStyle={"mb-3"}
              type="date"
              bgColor="lightGray"
            />
          </Col>
          <Col md={2}>
            <CustomInput
              title={"To"}
              placeholder={""}
              customStyle={"mb-3"}
              type="date"
              bgColor="lightGray"
            />
          </Col>
          <Col md={2}>
            <Form.Label className="invisible d-block">dasd</Form.Label>
            <CustomButton>Load</CustomButton>
          </Col>
        </Row>
      </Form>
      <CustomTable
        striped
        customClass="mt-4 commonTable reportTable"
        columns={columns}
        isPagination={true}
        isSort={true}
        isSearch={true}
        itemCount={data?.length}
        setTableConfig={setTableConfig}
        enablePdfExcel={true}
      >
        {data.map((item, index) => {
          const { date, credit, debit, closing, description, fromto } = item;
          return (
            <tr key={index}>
              {/* {columns.map((column) => (
              <td key={column.id}>{item[column.id]}</td>
            ))} */}
              <td>{date}</td>
              <td>{credit}</td>
              <td>{debit}</td>
              <td>{closing}</td>
              <td>
                <CustomButton
                  className="actionBtn"
                  variant="dark"
                  onClick={() => setAccountStatementModalShow((prev) => !prev)}
                >
                  {description}
                </CustomButton>
              </td>
              <td>{fromto}</td>
            </tr>
          );
        })}
      </CustomTable>

      <CustomModal
        customClass="modalFull-90 "
        title={[
          <>
            <span className="f400">
              Client Ledger (Total Win Loss : 100) (Total Count : 1) (Total Soda
              : 1)
            </span>
          </>,
        ]}
        show={AccountStatementModalShow}
        setShow={setAccountStatementModalShow}
      >
        <AccountStatementModal />
      </CustomModal>
    </>
  );
};

export default AccountStatement;
