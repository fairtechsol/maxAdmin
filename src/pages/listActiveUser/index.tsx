import React, { memo, useEffect, useState } from "react";
import { Col, Container, Form, Nav, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../assets/common.scss";
import CustomButton from "../../components/commonComponent/button";
import Loader from "../../components/commonComponent/loader";
import CustomModal from "../../components/commonComponent/modal";
import CustomTable from "../../components/commonComponent/table";
import SearchBox from "../../components/commonComponent/table/tableUtils/search";
import EventWiseExposureModal from "../../components/listClients/eventWiseExposureModal";
import EventWiseMatchListModal from "../../components/listClients/eventWiseMatchListModal";
import ListClientModals from "../../components/listClients/modals";
import "../../components/listClients/style.scss";
import { formatToINR } from "../../helpers";
import { Column } from "../../models/tableInterface";
import {
  dropdownSummary,
  getTotalBalance,
  getUsers,
  getUserWiseExposure,
  handleExport,
} from "../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../store/store";
import { ApiConstants } from "../../utils/Constants";
import "./style.scss";

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
  { id: "actions", label: "Actions" },
];

const ListActiveInactiveUser: React.FC = () => {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("active");
  const [tableConfig, setTableConfig] = useState<any>({
    keyword: "",
    page: 1,
    rowPerPage: 10,
    sort: { direction: "ASC", key: null },
  });
  const [eventDetails, setEventDetails] = useState({
    show: false,
    eventId: null,
    userData: null,
  });

  const [value, setValue] = useState<any>(50);
  const [keyword, setKeyWord] = useState<any>("");
  const [dataForMatchList, setDataForMatchList] = useState<any>({});
  const [showUserWiseExposureModal, setShowUserWiseExposureModal] =
    useState(false);
  const [showUserWiseMatchListModal, setShowUserWiseMatchListModal] =
    useState(false);
  const [userWiseExposureName, setUserWiseExposureName] = useState({
    name: "",
    id: "",
    roleName: "",
  });
  const [sort, setSort] = useState<any>({
    direction: "ASC",
    key: null,
  });
  const showEventModals = (id: any, userData: any) => {
    setEventDetails({
      show: true,
      eventId: id,
      userData: userData,
    });
  };

  const actionButtons = [
    { key: "deposit", id: "d", name: "D", onClick: showEventModals },
    { key: "withdraw", id: "w", name: "W", onClick: showEventModals },
    { key: "", id: "l", name: "L", onClick: showEventModals },
    { key: "creditReference", id: "c", name: "C", onClick: showEventModals },
    { key: "userPasswordChange", id: "p", name: "P", onClick: showEventModals },
    { key: "userLock", id: "s", name: "S", onClick: showEventModals },
  ];

  const { userList, loading } = useSelector(
    (state: RootState) => state.user.userList
  );
  const [localUserList, setLocalUserList] = useState([]);
  const { totalBalance, userDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const sortData = (key: string) => {
    try {
      let array = [...localUserList];
      if (array[0][key] > array[array?.length - 1][key]) {
        array.sort((a: any, b: any) => a[key] - b[key]);
      } else {
        array.sort((a: any, b: any) => b[key] - a[key]);
      }
      setLocalUserList(array);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (keyword: string) => {
    try {
      setTableConfig((prev: any) => {
        return { ...prev, keyword: keyword };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReportExport = (type: string) => {
    try {
      if (id) {
        dispatch(
          handleExport({
            endpoint: ApiConstants.USER.LIST,
            type: type,
            userId: id,
            userName: keyword || "",
            sort: sort?.key || "",
            order: sort?.direction || "DESC",
            name: "Users List",
            searchBy: "user.userName",
            activeTab: activeTab,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleActionButtonFilter = (item: any) => {
    if (item.key === "userLock") {
      if (userDetail?.permission) {
        const userLockPerm = userDetail?.permission?.userLock;
        const betLockPerm = userDetail?.permission?.betLock;
        if (!userLockPerm && !betLockPerm) {
          return false;
        }
        return true;
      } else return true;
    }

    if (item.key && userDetail?.permission?.[item.key] === false) {
      return false;
    }

    return true;
  };

  const handleActiveDeactiveTab = (val: string) => {
    dispatch(dropdownSummary({ summary: true }));
    setCurrentPage(1);
    setTableConfig((prev: any) => {
      return {
        ...prev,
        keyword: "",
      };
    });
    setActiveTab(val);
  };

  useEffect(() => {
    try {
      if (id) {
        dispatch(
          getUsers({
            userId: id,
            page: tableConfig?.page || 1,
            limit: value,
            userName: keyword || "",
            sort: tableConfig?.key || "",
            order: tableConfig?.direction || "DESC",
            activeTab: activeTab,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [id, tableConfig, value, keyword, activeTab]);

  useEffect(() => {
    try {
      if (keyword !== tableConfig?.keyword) {
        setKeyWord(tableConfig?.keyword);
      }
      if (
        sort.direction !== tableConfig?.sort?.direction ||
        sort.key !== tableConfig?.sort?.key
      ) {
        setSort(tableConfig?.sort);
      }
    } catch (error) {
      console.log(error);
    }
  }, [tableConfig]);

  useEffect(() => {
    try {
      if (activeTab === "active") {
        let filter = "&userBlock=eqfalse&betBlock=eqfalse";
        dispatch(
          getTotalBalance({
            userId: id,
            filter,
          })
        );
      } else {
        let filter = "&orVal=user.betBlock=true|or|userBlock=eqtrue";
        dispatch(
          getTotalBalance({
            userId: id,
            filter,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [activeTab]);

  useEffect(() => {
    try {
      if (userList?.list) {
        setLocalUserList(userList?.list);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userList]);

  return (
    <>
      {loading && <Loader />}
      <Container className="listClient listActiveUser" fluid>
        <Row>
          <Col>
            <p className="title-22">Account List</p>
            <div className="d-flex flex-row mb-1">
              <span className="title-12 me-1">Show</span>
              <select
                name="cars"
                id="cars"
                className="title-12"
                onChange={(e) => {
                  setCurrentPage(1);
                  setValue(e.target.value);
                }}
                value={value}
              >
                {[25, 50, 100, 250, 500, 750, 1000].map((item: number) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <span className="title-12 ms-1">entries</span>
            </div>
          </Col>
          <Col className="d-flex flex-column align-items-end">
            <CustomButton
              className="float-end mb-2"
              style={{ width: "100px" }}
              onClick={() => navigate(`/admin/add-account`)}
            >
              Add Account
            </CustomButton>
            <SearchBox value={tableConfig?.keyword} onSearch={handleSearch} />
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
                    onClick={() => handleActiveDeactiveTab("active")}
                  >
                    Active Users
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="rounded-0 "
                    eventKey="second"
                    onClick={() => handleActiveDeactiveTab("deactive")}
                  >
                    Deactive Users
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
                    itemCount={userList ? userList?.count : 1}
                    setTableConfig={setTableConfig}
                    enablePdfExcel={true}
                    isPagination={true}
                    showHeaderEntries={true}
                    sortData={sortData}
                    handleReportExport={handleReportExport}
                    tableConfig={tableConfig}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    value={value}
                  >
                    <tr>
                      {columns?.map((_, index) => {
                        return (
                          <td
                            colSpan={index === 0 ? 2 : undefined}
                            key={index}
                            className=" fw-bold text-end"
                            style={{
                              ...([6, 7].includes(index)
                                ? { padding: "0px 17px" }
                                : {}),
                            }}
                          >
                            {index === 1 &&
                              totalBalance &&
                              formatToINR(totalBalance?.totalCreditReference)}
                            {index === 2 &&
                              totalBalance &&
                              formatToINR(totalBalance?.currBalance)}
                            {index === 3 &&
                              totalBalance &&
                              formatToINR(totalBalance?.profitsum)}
                            {index === 4 &&
                              totalBalance &&
                              formatToINR(totalBalance?.totalExposure)}
                            {index === 5 &&
                              totalBalance &&
                              formatToINR(totalBalance?.availableBalance)}
                          </td>
                        );
                      })}
                    </tr>
                    {userList &&
                      localUserList?.map((userItem: any, index: number) => {
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
                            <td className="text-end">
                              {formatToINR(creditRefrence)}
                            </td>
                            <td className="text-end">{formatToINR(balance)}</td>
                            <td className="text-end">
                              {formatToINR(userBal?.profitLoss)}
                            </td>
                            <td
                              className="text-end"
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                dispatch(getUserWiseExposure(id));
                                setShowUserWiseExposureModal(true);
                                setUserWiseExposureName({
                                  name: userName,
                                  id: id,
                                  roleName: roleName,
                                });
                              }}
                            >
                              {formatToINR(userBal?.exposure)}
                            </td>
                            <td className="text-end">
                              {formatToINR(availableBalance)}
                            </td>
                            <td className="text-center multiLoginInputCont">
                              <Form>
                                <Form.Check
                                  disabled={true}
                                  checked={!userBlock}
                                  id={`opt${index}1`}
                                  aria-label="option 1"
                                />
                              </Form>
                            </td>
                            <td className="text-center multiLoginInputCont">
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
                              {formatToINR(exposureLimit)}
                            </td>
                            <td>0</td>
                            <td>{roleName}</td>
                            <td>
                              <div className="d-flex gap-1 border-right-0 border-left-0">
                                {type ? (
                                  <>
                                    {actionButtons
                                      .filter(handleActionButtonFilter)
                                      ?.map((item) => {
                                        return (
                                          (item.id === "d" ||
                                            item.id === "w") && (
                                            <CustomButton
                                              variant="dark"
                                              onClick={() => {
                                                item.onClick(
                                                  item?.id,
                                                  userItem
                                                );
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
                                    {actionButtons
                                      .filter(handleActionButtonFilter)
                                      ?.map((item) => {
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
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <CustomTable
                    tHeadTheme="border-0 bg-light"
                    customClass="listClientTable commonTable border-top-0 "
                    bordered
                    striped
                    showHeaderEntries={true}
                    columns={columns}
                    itemCount={userList ? userList?.count : 1}
                    setTableConfig={setTableConfig}
                    enablePdfExcel={true}
                    isPagination={true}
                    sortData={sortData}
                    handleReportExport={handleReportExport}
                    tableConfig={tableConfig}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    value={value}
                  >
                    <tr>
                      {columns?.map((_, index) => {
                        return (
                          <td
                            colSpan={index === 0 ? 2 : undefined}
                            key={index}
                            className=" fw-bold text-end"
                          >
                            {index === 1 &&
                              userList &&
                              formatToINR(
                                localUserList?.reduce(
                                  (acc: any, match: any) => {
                                    return acc + +match?.creditRefrence;
                                  },
                                  0
                                ) || 0
                              )}
                            {index === 2 &&
                              userList &&
                              formatToINR(
                                localUserList?.reduce(
                                  (acc: any, match: any) => {
                                    return acc + +match?.balance;
                                  },
                                  0
                                ) || 0
                              )}
                            {index === 3 &&
                              userList &&
                              formatToINR(
                                localUserList?.reduce(
                                  (acc: any, match: any) => {
                                    return acc + +match?.userBal?.profitLoss;
                                  },
                                  0
                                ) || 0
                              )}
                            {index === 4 &&
                              userList &&
                              formatToINR(
                                localUserList?.reduce(
                                  (acc: any, match: any) => {
                                    return acc + +match?.userBal?.exposure;
                                  },
                                  0
                                ) || 0
                              )}
                            {index === 5 &&
                              userList &&
                              formatToINR(
                                localUserList?.reduce(
                                  (acc: any, match: any) => {
                                    return acc + +match?.availableBalance;
                                  },
                                  0
                                ) || 0
                              )}
                          </td>
                        );
                      })}
                    </tr>
                    {userList &&
                      localUserList?.map((userItem: any, index: number) => {
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

                            <td className="text-end">
                              {formatToINR(creditRefrence)}
                            </td>
                            <td className="text-end">{formatToINR(balance)}</td>
                            <td className="text-end">
                              {formatToINR(userBal?.profitLoss)}
                            </td>
                            <td
                              className="text-end"
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                dispatch(getUserWiseExposure(id));
                                setShowUserWiseExposureModal(true);
                                setUserWiseExposureName({
                                  name: userName,
                                  id: id,
                                  roleName: roleName,
                                });
                              }}
                            >
                              {formatToINR(userBal?.exposure)}
                            </td>
                            <td className="text-end">
                              {formatToINR(availableBalance)}
                            </td>
                            <td className="text-center multiLoginInputCont">
                              <Form>
                                <Form.Check
                                  disabled={true}
                                  checked={!userBlock}
                                  id={`opt${index}1`}
                                  aria-label="option 1"
                                />
                              </Form>
                            </td>
                            <td className="text-center multiLoginInputCont">
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
                              {formatToINR(exposureLimit)}
                            </td>
                            <td>0</td>
                            <td>{roleName}</td>
                            {/* <td className="text-end">0</td> */}
                            <td>
                              <div className="d-flex gap-1 border-right-0 border-left-0">
                                {type ? (
                                  <>
                                    {actionButtons
                                      .filter(handleActionButtonFilter)
                                      ?.map((item) => {
                                        return (
                                          (item.id === "d" ||
                                            item.id === "w") && (
                                            <CustomButton
                                              variant="dark"
                                              onClick={() => {
                                                item.onClick(
                                                  item?.id,
                                                  userItem
                                                );
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
                                    {actionButtons
                                      .filter(handleActionButtonFilter)
                                      ?.map((item) => {
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
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
        {eventDetails.eventId && (
          <ListClientModals
            userId={id}
            page={tableConfig?.page || 1}
            limit={value}
            userName={keyword || ""}
            sort={tableConfig?.key || ""}
            order={tableConfig?.direction || "DESC"}
            activeTab={activeTab}
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
      <CustomModal
        customClass="modalFull-90 "
        title={[
          <>
            <span className="f400">
              {userWiseExposureName?.name} EventWise Expoure
            </span>
          </>,
        ]}
        show={showUserWiseExposureModal && !loading}
        setShow={setShowUserWiseExposureModal}
      >
        <EventWiseExposureModal
          userWiseExposureName={userWiseExposureName}
          setDataForMatchList={setDataForMatchList}
          setShowUserWiseMatchListModal={setShowUserWiseMatchListModal}
        />
      </CustomModal>
      <CustomModal
        customClass="modalFull-90 "
        title={[
          <>
            <span className="f400">
              {userWiseExposureName?.name} Match Wise Exposure
            </span>
          </>,
        ]}
        show={showUserWiseMatchListModal}
        setShow={setShowUserWiseMatchListModal}
      >
        <EventWiseMatchListModal
          userWiseExposureName={userWiseExposureName}
          data={dataForMatchList}
        />
      </CustomModal>
    </>
  );
};

export default memo(ListActiveInactiveUser);
