import React, { useEffect, useState } from "react";
import { Col, Container, Form, Nav, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../assets/common.scss";
import CustomButton from "../../components/commonComponent/button";
import CustomTable from "../../components/commonComponent/table";
import ListClientModals from "../../components/listClients/modals";
import "../../components/listClients/style.scss";
import { Column, TableConfig } from "../../models/tableInterface";
import {
  dropdownSummary,
  getTotalBalance,
  getUsers,
} from "../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../store/store";
import { ApiConstants } from "../../utils/Constants";
// Example usage
const columns: Column[] = [
  { id: "user.userName", label: "User Name", colSpan: 2 },
  { id: "user.creditRefrence", label: "Credit Reference" },
  { id: "balance", label: "Balance" },
  { id: "UB.profitLoss", label: "Client (P/L)" },
  { id: "UB.exposure", label: "Exposure" },
  { id: "availableBalance", label: "Available Balance" },
  { id: "ust", label: "U St" },
  { id: "accountType", label: "B St" },
  { id: "exposureLimit", label: "Exposure Limit" },
  { id: "default", label: "Default%" },
  { id: "user.roleName", label: "Account Type" },
  { id: "casino", label: "Casino Total" },
  { id: "actions", label: "Actions" },
];

const ListActiveInactiveUser: React.FC = () => {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [eventDetails, setEventDetails] = useState({
    show: false,
    eventId: null,
    userData: null,
  });
  const [activeUser, setActiveUser] = useState<any>([]);
  const [deactiveUser, setDeactiveUser] = useState<any>([]);
  const showEventModals = (id: any, userData: any) => {
    setEventDetails({
      show: true,
      eventId: id,
      userData: userData,
    });
  };
  useEffect(() => {
    dispatch(
      getUsers({
        userId: id,
        // page: tableConfig?.page || 1,
        // limit: tableConfig?.rowPerPage,
        userName: tableConfig?.keyword || "",
        sort: tableConfig?.sort?.key || "",
        order: tableConfig?.sort?.direction || "desc",
      })
    );
  }, [tableConfig]);

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
    // {
    //   id: "more",
    //   name: "More",
    //   onClick: () => { },
    // },
  ];

  const { userList } = useSelector((state: RootState) => state.user.userList);
  // const { totalBalance } = useSelector(
  //   (state: RootState) => state.user.profile
  // );

  useEffect(() => {
    dispatch(
      getUsers({
        userId: id,
      })
    );
    dispatch(getTotalBalance());
  }, []);

  // const activeUser: Array<object> = [];
  // const deactiveUser: Array<object> = [];
  useEffect(() => {
    const active: Array<object> = [];
    const deactive: Array<object> = [];

    userList?.list?.forEach((user: any) => {
      if (user.userBlock === false) {
        active.push(user);
      } else {
        deactive.push(user);
      }
    });

    // Update the state with the new active and deactive users
    setActiveUser(active);
    setDeactiveUser(deactive);
  }, [userList]);
  useEffect(() => {}, [activeUser]);

  const sortData = (key: string) => {
    let array = [...activeUser];

    if (array[0][key] > array[array?.length - 1][key]) {
      array.sort((a: any, b: any) => a[key] - b[key]);
    } else {
      array.sort((a: any, b: any) => b[key] - a[key]);
    }

    setActiveUser(array);
  };

  return (
    <>
      <Container className="listClient listActiveUser" fluid>
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
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Nav variant="pills" className="flex-row ">
                <Nav.Item>
                  <Nav.Link
                    className="rounded-0 "
                    eventKey="first"
                    onClick={() => dispatch(dropdownSummary({ summary: true }))}
                  >
                    Active User
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="rounded-0 "
                    eventKey="second"
                    onClick={() =>
                      dispatch(dropdownSummary({ summary: false }))
                    }
                  >
                    Deactivate User
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className="mt-3">
                <Tab.Pane eventKey="first">
                  <CustomTable
                    tHeadTheme="border bg-light"
                    customClass="listClientTable commonTable border-top-0 "
                    bordered
                    striped
                    columns={columns}
                    itemCount={userList && userList?.count}
                    setTableConfig={setTableConfig}
                    enablePdfExcel={true}
                    isSearch
                    isSort={true}
                    isPagination={false}
                    endpoint={ApiConstants.USER.LIST}
                    sortData={sortData}
                  >
                    <tr>
                      {columns?.map((item, index) => {
                        return (
                          <td
                            colSpan={index === 0 ? 2 : undefined}
                            key={index}
                            className=" fw-bold text-end"
                          >
                            {/* {index === 1 &&
                              totalBalance &&
                              totalBalance?.totalCreditReference}
                            {index === 2 &&
                              totalBalance &&
                              totalBalance?.currBalance}
                            {index === 3 &&
                              totalBalance &&
                              totalBalance?.profitsum}
                            {index === 4 &&
                              totalBalance &&
                              totalBalance?.totalExposure}
                            {index === 5 &&
                              totalBalance &&
                              totalBalance?.availableBalance} */}
                            {index === 1 &&
                              userList &&
                              (activeUser?.reduce((acc: any, match: any) => {
                                return acc + +match?.creditRefrence;
                              }, 0) ||
                                0)}
                            {index === 2 &&
                              userList &&
                              (activeUser?.reduce((acc: any, match: any) => {
                                return acc + +match?.balance;
                              }, 0) ||
                                0)}
                            {index === 3 &&
                              userList &&
                              (activeUser?.reduce((acc: any, match: any) => {
                                return acc + +match?.userBal?.profitLoss;
                              }, 0) ||
                                0)}
                            {index === 4 &&
                              userList &&
                              (activeUser?.reduce((acc: any, match: any) => {
                                return acc + +match?.userBal?.exposure;
                              }, 0) ||
                                0)}
                            {index === 5 &&
                              userList &&
                              (activeUser?.reduce((acc: any, match: any) => {
                                return acc + +match?.availableBalance;
                              }, 0) ||
                                0)}
                          </td>
                        );
                      })}
                    </tr>
                    {userList &&
                      activeUser.map((userItem: any, index: number) => {
                        const {
                          userName,
                          balance,
                          availableBalance,
                          creditRefrence,
                          exposureLimit,
                          roleName,
                          // matchCommission,
                          id,
                          userBlock,
                          betBlock,
                          userBal,
                        } = userItem;
                        return (
                          <tr key={id}>
                            <td colSpan={2}>
                              {roleName === "user" || roleName === "expert" ? (
                                <CustomButton
                                  className="actionBtn"
                                  variant="dark"
                                >
                                  {userName}
                                </CustomButton>
                              ) : (
                                <Link
                                  to={`/admin/active-inactive-user-list/sub-user/${id}`}
                                  target="_blank"
                                  state="second"
                                  rel="noopener noreferrer"
                                >
                                  <CustomButton
                                    className="actionBtn"
                                    variant="dark"
                                  >
                                    {userName}
                                  </CustomButton>
                                </Link>
                              )}
                            </td>

                            <td className="text-end">{creditRefrence}</td>
                            <td className="text-end">{balance}</td>
                            <td className="text-end">{userBal?.profitLoss}</td>
                            <td className="text-end">{userBal?.exposure}</td>
                            <td className="text-end">{availableBalance}</td>
                            <td className="text-center">
                              <Form>
                                <Form.Check
                                  disabled={true}
                                  checked={!userBlock}
                                  id={`opt${index}1`}
                                  aria-label="option 1"
                                />
                              </Form>
                            </td>
                            <td className="text-center">
                              <Form>
                                <Form.Check
                                  disabled={true}
                                  checked={!betBlock}
                                  id={`opt${index}`}
                                  aria-label="option 1"
                                />
                              </Form>
                            </td>
                            <td className="text-end">
                              {roleName === "user" ? exposureLimit : "NA"}
                            </td>
                            <td>0</td>
                            <td>{roleName}</td>
                            <td className="text-end">0</td>
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
                  {activeUser?.length > 0 &&( <div
                    style={{
                      width: "100%",
                      marginTop: "5px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      Showing 1 to {activeUser?.length} of {activeUser?.length} entries
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "5px",
                      }}
                    >
                      <CustomButton className={`actionBtn`} disabled>
                        Previous
                      </CustomButton>
                      <CustomButton className={`actionBtn`}>1</CustomButton>
                      <CustomButton className={`actionBtn`} disabled>
                        Next
                      </CustomButton>
                    </div>
                  </div>)}
                 
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <CustomTable
                    tHeadTheme="border-0 bg-light"
                    customClass="listClientTable commonTable border-top-0 "
                    bordered
                    striped
                    columns={columns}
                    itemCount={userList && userList?.count}
                    setTableConfig={setTableConfig}
                    enablePdfExcel={true}
                    isSearch
                    isPagination={false}
                    endpoint={ApiConstants.USER.LIST}
                    sortData={sortData}
                  >
                    <tr>
                      {columns?.map((item, index) => {
                        return (
                          <td
                            colSpan={index === 0 ? 2 : undefined}
                            key={index}
                            className=" fw-bold text-end"
                          >
                            {index === 1 &&
                              userList &&
                              (deactiveUser?.reduce((acc: any, match: any) => {
                                return acc + +match?.creditRefrence;
                              }, 0) ||
                                0)}
                            {index === 2 &&
                              userList &&
                              (deactiveUser?.reduce((acc: any, match: any) => {
                                return acc + +match?.balance;
                              }, 0) ||
                                0)}
                            {index === 3 &&
                              userList &&
                              (deactiveUser?.reduce((acc: any, match: any) => {
                                return acc + +match?.userBal?.profitLoss;
                              }, 0) ||
                                0)}
                            {index === 4 &&
                              userList &&
                              (deactiveUser?.reduce((acc: any, match: any) => {
                                return acc + +match?.userBal?.exposure;
                              }, 0) ||
                                0)}
                            {index === 5 &&
                              userList &&
                              (deactiveUser?.reduce((acc: any, match: any) => {
                                return acc + +match?.availableBalance;
                              }, 0) ||
                                0)}
                          </td>
                        );
                      })}
                    </tr>
                    {userList &&
                      deactiveUser.map((userItem: any, index: number) => {
                        const {
                          userName,
                          balance,
                          availableBalance,
                          creditRefrence,
                          exposureLimit,
                          roleName,
                          id,
                          userBlock,
                          betBlock,
                          userBal,
                        } = userItem;
                        return (
                          <tr key={id}>
                            <td colSpan={2}>
                              {roleName === "user" || roleName === "expert" ? (
                                <CustomButton
                                  className="actionBtn"
                                  variant="dark"
                                >
                                  {userName}
                                </CustomButton>
                              ) : (
                                <Link
                                  to={`/admin/active-inactive-user-list/sub-user/${id}`}
                                  state="second"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <CustomButton
                                    className="actionBtn"
                                    variant="dark"
                                  >
                                    {userName}
                                  </CustomButton>
                                </Link>
                              )}
                            </td>

                            <td className="text-end">{creditRefrence}</td>
                            <td className="text-end">{balance}</td>
                            <td className="text-end">{userBal?.profitLoss}</td>
                            <td className="text-end">{userBal?.exposure}</td>
                            <td className="text-end">{availableBalance}</td>
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
                            <td>0</td>
                            <td>{roleName}</td>
                            <td className="text-end">0</td>
                            <td>
                              <div className="d-flex gap-1 border-right-0 border-left-0">
                                {type ? (
                                  <>
                                    {actionButtons?.map((item) => {
                                      return (
                                        (item.id === "d" ||
                                          item.id === "w") && (
                                          <CustomButton
                                            variant="dark"
                                            onClick={() => {
                                              item.onClick(item?.id, userItem);
                                            }}
                                            key={item?.id}
                                            className={`actionBtn`}
                                          >
                                            {item?.name}
                                          </CustomButton>
                                        )
                                      );
                                    })}
                                  </>
                                ) : (
                                  <>
                                    {actionButtons?.map((item) => {
                                      return (
                                        <CustomButton
                                          variant="dark"
                                          onClick={() => {
                                            item.onClick(item?.id, userItem);
                                          }}
                                          key={item?.id}
                                          className={`actionBtn`}
                                        >
                                          {item?.name}
                                        </CustomButton>
                                      );
                                    })}
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </CustomTable>
                  {deactiveUser?.length > 0 &&(
                    <div
                    style={{
                      width: "100%",
                      marginTop: "5px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      Showing 1 to {deactiveUser?.length} of {deactiveUser?.length} entries
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "5px",
                      }}
                    >
                      <CustomButton className={`actionBtn`} disabled>
                        Previous
                      </CustomButton>
                      <CustomButton className={`actionBtn`}>1</CustomButton>
                      <CustomButton className={`actionBtn`} disabled>
                        Next
                      </CustomButton>
                    </div>
                  </div>
                  )}
                  
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
