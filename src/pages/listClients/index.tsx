import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate,useParams } from "react-router-dom";
import "../../assets/common.scss";
import CustomButton from "../../components/commonComponent/button";
import CustomTable from "../../components/commonComponent/table";
import ListClientModals from "../../components/listClients/modals";
import "../../components/listClients/style.scss";
import { Column, TableConfig } from "../../models/tableInterface";
import { getUsers } from "../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../store/store";
import { ApiConstants } from "../../utils/Constants";

// Example usage
const columns: Column[] = [
  { id: "username", label: "User Name", colSpan: 4 },
  { id: "creditReferance", label: "Credit Reference" },
  { id: "ust", label: "U St" },
  { id: "bst", label: "B St" },
  { id: "exposureLimit", label: "Exposure Limit" },
  { id: "default%", label: "Default %" },
  { id: "accountType", label: "Account Type" },
  { id: "casinoTotal", label: "Casino Total" },
  { id: "actions", label: "Actions" },
];

const ListClent: React.FC = () => {
  const { id,type } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [eventDetails, setEventDetails] = useState({
    show: false,
    eventId: null,
    userData: null,
  });
  const { userList } = useSelector((state: RootState) => state.user.userList);
  const showEventModals = (id: any, userData: any) => {
    setEventDetails({
      show: true,
      eventId: id,
      userData: userData,
    });
  };

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
  ];
  useEffect(() => {
    dispatch(
      getUsers({
        userId: id,
        // page: tableConfig?.page || 1,
        // limit: tableConfig?.rowPerPage,
        userName: tableConfig?.keyword || "",
      })
    );
  }, [tableConfig]);

  return (
    <>
      <Container className="listClient" fluid>
        <Row>
          <Col>
            <p className="title-22">Account List</p>
          </Col>
          <Col>
            <CustomButton
              className="float-end mt-2"
              onClick={() => navigate(`/admin/add-account`)}
            >
              Add Account
            </CustomButton>
          </Col>
        </Row>
        <Row>
          <Col>
            <CustomTable
              tHeadTheme="border-0 bg-light"
              customClass="listClientTable commonTable border-top-0 "
              bordered
              striped
              columns={columns}
              itemCount={userList && userList?.count}
              setTableConfig={setTableConfig}
              enablePdfExcel={true}
              isSearch={true}
              endpoint={ApiConstants.USER.LIST}
              isPagination={false}
              // isSort={true}
            >
              <tr>
                {columns?.map((item, index) => {
                  return (
                    <td
                      colSpan={index === 0 ? 4 : undefined}
                      key={index}
                      className=" fw-bold text-end"
                    >
                      {index === 1 &&
                        userList &&
                        userList?.totalBalance?.totalCreditReference}
                    </td>
                  );
                })}
              </tr>
              {userList &&
                userList?.list?.map((userItem: any, index: number) => {
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
                      <td colSpan={4}>
                        {
                          roleName ==='user' || roleName === 'expert' ? 
                          <CustomButton className="actionBtn" variant="dark" >
                          {userName}
                        </CustomButton>  :
                        <Link to={`/admin/listClients/sub-user/${id}`} target="_blank" rel="noopener noreferrer">
                        <CustomButton className="actionBtn" variant="dark" >
                          {userName}
                        </CustomButton></Link>
                        }
                      
                      </td>
                      <td className="text-end">{creditRefrence}</td>
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
                      <td>{defaultPer}</td>
                      <td>{roleName}</td>
                      <td className="text-end">{casinoTotal}</td>
                      <td>
                        <div className="d-flex gap-1 border-right-0 border-left-0">

                          {type ? <>
                            {actionButtons?.map((item) => {
                            return (item.id ==='d' || item.id==='w') && (
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
                          </> :  <>
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
                          </> }
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </CustomTable>
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

export default React.memo(ListClent);
