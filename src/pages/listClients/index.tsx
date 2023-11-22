import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/commonComponent/button";
import CustomTable from "../../components/commonComponent/table";
import ListClientModals from "../../components/listClients/modals";
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
  const navigate = useNavigate();

  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [eventDetails, setEventDetails] = useState({
    show: false,
    eventId: null,
  });

  const showEventModals = (id: any) => {
    setEventDetails({
      show: true,
      eventId: id,
    });
  };

  useEffect(() => {}, [tableConfig]);

  const actionButtons = [
    {
      id: "d",
      name: "D",
      onClick: showEventModals,
    },
    {
      id: "w",
      name: "W",
      onClick: showEventModals,
    },
    {
      id: "l",
      name: "L",
      onClick: showEventModals,
    },
    {
      id: "c",
      name: "C",
      onClick: showEventModals,
    },
    {
      id: "p",
      name: "P",
      onClick: showEventModals,
    },
    {
      id: "s",
      name: "S",
      onClick: showEventModals,
    },
    {
      id: "more",
      name: "More",
      onClick: () => {},
    },
  ];

  return (
    <Container fluid>
      <Row>
        <Col>
          <p className="title-22">Account List</p>
        </Col>
        <Col>
          <CustomButton
            className="float-end"
            onClick={() => navigate(`/admin/add-account`)}
          >
            Add Account
          </CustomButton>
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomTable
            bordered
            striped
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
                    <CustomButton className="actionBtn" variant="dark">
                      {username}
                    </CustomButton>
                  </td>
                  <td>{creditReferance}</td>
                  <td>
                    <Form>
                      <Form.Check id={`opt${index}1`} aria-label="option 1" />
                    </Form>
                  </td>
                  <td>
                    <Form>
                      <Form.Check id={`opt${index}`} aria-label="option 1" />
                    </Form>
                  </td>
                  <td>{exposureLimit}</td>
                  <td>{defaultPer}</td>
                  <td>{accountType}</td>
                  <td>{casinoTotal}</td>
                  <td className="d-flex gap-1">
                    {actionButtons?.map((item) => {
                      return (
                        <CustomButton
                          variant="dark"
                          onClick={() => {
                            item.onClick(item?.id);
                          }}
                          key={item?.id}
                          className="actionBtn"
                        >
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
      <ListClientModals
        show={eventDetails.show}
        setShow={(data) => {
          setEventDetails((prev) => {
            return { ...prev, show: data };
          });
        }}
        id={eventDetails.eventId}
      />
    </Container>
  );
};

export default App;
