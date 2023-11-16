import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import CustomButton from "../../components/commonComponent/button";
import CustomTable from "../../components/commonComponent/table";
import { Column, TableConfig } from "../../models/tableInterface";

// Example usage
const columns: Column[] = [
  { id: "username", label: "User Name" },
  { id: "creditReferance", label: "Credit Referance" },
  { id: "ust", label: "U St" },
  { id: "bst", label: "B St" },
  { id: "exposureLimit", label: "Exposure Limit" },
  { id: "default%", label: "Default %" },
  { id: "accountType", label: "Account Type" },
  { id: "casinoTotal", label: "Casino Total" },
  { id: "actions", label: "Actions" },
];

const data: any = [
  {
    username: "Account",
    creditReferance: 25,
    exposureLimit: 12,
    defaultPer: 23,
    accountType: "Agent",
    casinoTotal: "20",
  },
  {
    username: "Account",
    creditReferance: 25,
    exposureLimit: 12,
    defaultPer: 23,
    accountType: "Agent",
    casinoTotal: "20",
  },
  {
    username: "Account",
    creditReferance: 25,
    exposureLimit: 12,
    defaultPer: 23,
    accountType: "Agent",
    casinoTotal: "20",
  },
];

const App: React.FC = () => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);

  useEffect(() => {}, [tableConfig]);

  const actionButtons = [
    {
      name: "D",
      onClick: (rowData: any) => {
        console.log(rowData);
      },
    },
    {
      name: "W",
      onClick: (rowData: any) => {
        console.log(rowData);
      },
    },
    {
      name: "L",
      onClick: (rowData: any) => {
        console.log(rowData);
      },
    },
    {
      name: "C",
      onClick: (rowData: any) => {
        console.log(rowData);
      },
    },
    {
      name: "P",
      onClick: (rowData: any) => {
        console.log(rowData);
      },
    },
    {
      name: "S",
      onClick: (rowData: any) => {
        console.log(rowData);
      },
    },
    {
      name: "More",
      onClick: (rowData: any) => {
        console.log(rowData);
      },
    },
  ];

  return (
    <Container fluid>
      <Row>
        <Col>
          <p className="title-22">Account List</p>
        </Col>
        <Col>
          <CustomButton className="float-end">Add Account</CustomButton>
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomTable
            columns={columns}
            itemCount={10}
            setTableConfig={setTableConfig}
            enablePdfExcel={true}
          >
            <tr>
              {columns?.map((item, index) => {
                return (
                  <td key={index} className=" fw-bold">
                    {index === 1 && 173398}
                  </td>
                );
              })}
            </tr>
            {data?.map((item: any, index: number) => {
              const {
                username,
                creditReferance,
                exposureLimit,
                defaultPer,
                accountType,
                casinoTotal,
              } = item;
              return (
                <tr key={index}>
                  <td>
                    <CustomButton className="actionBtn">
                      {username}
                    </CustomButton>
                  </td>
                  <td>{creditReferance}</td>
                  <td>
                    <Form>
                      <Form.Check aria-label="option 1" />
                    </Form>
                  </td>
                  <td>
                    <Form>
                      <Form.Check aria-label="option 1" />
                    </Form>
                  </td>
                  <td>{exposureLimit}</td>
                  <td>{defaultPer}</td>
                  <td>{accountType}</td>
                  <td>{casinoTotal}</td>
                  <td className="d-flex gap-1">
                    {actionButtons?.map((item) => {
                      return (
                        <CustomButton key={item?.name} className="actionBtn">
                          {item?.name}
                        </CustomButton>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </CustomTable>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
