import React, { useEffect, useState } from "react";
import { Col, Container, Form, Nav, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../assets/common.scss";
import CustomButton from "../../components/commonComponent/button";
import CustomTable from "../../components/commonComponent/table";
import ListClientModals from "../../components/listClients/modals";
import "../../components/listClients/style.scss";
import { Column, TableConfig } from "../../models/tableInterface";
import { getUsers } from "../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../store/store";
// Example usage
const columns: Column[] = [
  { id: "username", label: "User Name", colSpan: 2 },
  { id: "creditReferance", label: "Credit Referance" },
  { id: "balance", label: "Balance" },
  { id: "client", label: "Client" },
  { id: "exposure", label: "Exposure" },
  { id: "availBal", label: "Avialable Balance" },
  { id: "ust", label: "U St" },
  { id: "accountType", label: "B St" },
  { id: "exposureLimit", label: "Exposure Limit" },
  { id: "default", label: "Default%" },
  { id: "AccountType", label: "Account Type" },
  { id: "casinoTotal", label: "Casino Total" },
  { id: "actions", label: "Actions" },
];

const ListActiveInactiveUser: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [eventDetails, setEventDetails] = useState({
    show: false,
    eventId: null,
    userData: null,
  });

  const showEventModals = (id: any, userData: any) => {
    setEventDetails({
      show: true,
      eventId: id,
      userData: userData,
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

  const { userList } = useSelector((state: RootState) => state.user.userList);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <Container className="listClient listActiveUser" fluid>
        <Row>
          <Col>
            <p className="title-22">Account List </p>
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
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Nav variant="pills" className="flex-row ">
                <Nav.Item>
                  <Nav.Link className="rounded-0" eventKey="first">
                    Active User
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="rounded-0" eventKey="second">
                    Deactivate User
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content className="mt-3">
                <Tab.Pane eventKey="first">
                  <CustomTable
                    tHeadTheme="border-0 bg-light"
                    customClass="listClientTable commonTable border-top-0 "
                    bordered
                    striped
                    columns={columns}
                    itemCount={10}
                    setTableConfig={setTableConfig}
                    enablePdfExcel={true}
                    isSearch
                  >
                    <tr>
                      {columns?.map((item, index) => {
                        return (
                          <td
                            colSpan={index === 0 ? 2 : undefined}
                            key={index}
                            className=" fw-bold text-end"
                          >
                            {index === 1 && 173398}
                          </td>
                        );
                      })}
                    </tr>
                    {userList &&
                      userList.list.map((userItem: any, index: number) => {
                        const {
                          userName,
                          creditRefrence,
                          exposureLimit,
                          defaultPer,
                          roleName,
                          casinoTotal,
                          id,
                          userBlock,
                          betBlock,
                        } = userItem;
                        return (
                          <tr key={id}>
                            <td colSpan={2}>
                              <CustomButton
                                className="actionBtn"
                                variant="dark"
                              >
                                {userName}
                              </CustomButton>
                            </td>

                            <td className="text-end">{creditRefrence}</td>
                            <td className="text-end">...</td>
                            <td className="text-end">...</td>
                            <td className="text-end">...</td>
                            <td className="text-end">...</td>
                            <td className="text-center">
                              <Form>
                                <Form.Check
                                  disabled={true}
                                  checked={userBlock}
                                  id={`opt${index}1`}
                                  aria-label="option 1"
                                />
                              </Form>
                            </td>
                            <td className="text-center">
                              <Form>
                                <Form.Check
                                  disabled={true}
                                  checked={betBlock}
                                  id={`opt${index}`}
                                  aria-label="option 1"
                                />
                              </Form>
                            </td>
                            <td className="text-end">{exposureLimit}</td>
                            <td>{defaultPer}</td>
                            <td>{roleName}</td>
                            <td className="text-end">{casinoTotal}</td>
                            <td>
                              <div className="d-flex gap-1 border-right-0 border-left-0">
                                {actionButtons?.map((item) => {
                                  return (
                                    <CustomButton
                                      variant="dark"
                                      onClick={() => {
                                        item.onClick(item?.id, userItem);
                                      }}
                                      key={item?.id}
                                      className="actionBtn"
                                    >
                                      {item?.name}
                                    </CustomButton>
                                  );
                                })}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </CustomTable>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <CustomTable
                    tHeadTheme="border-0 bg-light"
                    customClass="listClientTable commonTable border-top-0 "
                    bordered
                    striped
                    columns={columns}
                    itemCount={10}
                    setTableConfig={setTableConfig}
                    enablePdfExcel={true}
                    isSearch
                  >
                    <tr>
                      {columns?.map((item, index) => {
                        return (
                          <td
                            colSpan={index === 0 ? 2 : undefined}
                            key={index}
                            className=" fw-bold text-end"
                          >
                            {index === 1 && 173398}
                          </td>
                        );
                      })}
                    </tr>
                    {userList &&
                      userList.list.map((userItem: any, index: number) => {
                        const {
                          userName,
                          creditRefrence,
                          exposureLimit,
                          defaultPer,
                          roleName,
                          casinoTotal,
                          id,
                          userBlock,
                          betBlock,
                        } = userItem;
                        return (
                          <tr key={id}>
                            <td colSpan={2}>
                              <CustomButton
                                className="actionBtn"
                                variant="dark"
                              >
                                {userName}
                              </CustomButton>
                            </td>

                            <td className="text-end">{creditRefrence}</td>
                            <td className="text-end">...</td>
                            <td className="text-end">...</td>
                            <td className="text-end">...</td>
                            <td className="text-end">...</td>
                            <td className="text-center">
                              <Form>
                                <Form.Check
                                  disabled={true}
                                  checked={userBlock}
                                  id={`opt${index}1`}
                                  aria-label="option 1"
                                />
                              </Form>
                            </td>
                            <td className="text-center">
                              <Form>
                                <Form.Check
                                  disabled={true}
                                  checked={betBlock}
                                  id={`opt${index}`}
                                  aria-label="option 1"
                                />
                              </Form>
                            </td>
                            <td className="text-end">{exposureLimit}</td>
                            <td>{defaultPer}</td>
                            <td>{roleName}</td>
                            <td className="text-end">{casinoTotal}</td>
                            <td>
                              <div className="d-flex gap-1 border-right-0 border-left-0">
                                {actionButtons?.map((item) => {
                                  return (
                                    <CustomButton
                                      variant="dark"
                                      onClick={() => {
                                        item.onClick(item?.id, userItem);
                                      }}
                                      key={item?.id}
                                      className="actionBtn"
                                    >
                                      {item?.name}
                                    </CustomButton>
                                  );
                                })}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </CustomTable>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
        {eventDetails.eventId && (
          <ListClientModals
            userData={eventDetails.userData}
            show={eventDetails.show}
            setShow={(data) => {
              setEventDetails((prev) => {
                return { ...prev, show: data };
              });
            }}
            id={eventDetails.eventId}
          />
        )}
      </Container>
    </>
  );
};

export default ListActiveInactiveUser;
