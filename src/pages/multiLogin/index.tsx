import { useFormik } from "formik";
import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/common.scss";
import CustomInput from "../../components/commonComponent/input";
import CustomErrorMessage from "../../components/commonComponent/input/CustomErrorMessage";
import ListClientModals from "../../components/listClients/modals";
import { Column } from "../../models/tableInterface";
import {
  addUserMultiLogin,
  getAlreadyUserExist,
  getUserMultiLoginList,
  resetAddSuccessMultiUser,
} from "../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../store/store";
import { addMultiLoginAccountValidationSchema } from "../../utils/fieldValidations/multiLogin";
import "./style.scss";

const columns: Column[] = [
  { id: "action", label: "Action" },
  { id: "username", label: "User Name" },
  { id: "fullName", label: "Full Name" },
  { id: "dashboard", label: "DashBoard" },
  { id: "marketAnalysis", label: "Market Analysis" },
  { id: "userList", label: "User List" },
  { id: "insertUser", label: "Insert User" },
  { id: "accountStatement", label: "Account Statement" },
  { id: "partyWinLoss", label: "Party Win Loss" },
  { id: "currentBets", label: "Current Bets" },
  { id: "casinoResult", label: "Casino Result" },
  { id: "liveCasinoResult", label: "Live Casino Result" },
  { id: "ourCasino", label: "Our Casino" },
  { id: "events", label: "Events" },
  { id: "marketSearchAnalysis", label: "Market Search Analysis" },
  { id: "loginUserCreation", label: "Login User creation" },
  { id: "withdraw", label: "Withdraw" },
  { id: "deposit", label: "Deposit" },
  { id: "creditReference", label: "Credit Reference" },
  { id: "userInfo", label: "User Info" },
  { id: "userPasswordChange", label: "User Password Change" },
  { id: "userLock", label: "User Lock" },
  { id: "betLock", label: "Bet Lock" },
  { id: "activeUser", label: "Active User" },
];

interface Values {
  userName: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  privileges: any;
  transactionPassword: string;
}

const initialValues = {
  userName: "",
  fullName: "",
  password: "",
  confirmPassword: "",
  transactionPassword: "",
  privileges: [
    { id: "all", name: "All", active: false },
    { id: "dashboard", name: "DashBoard", active: false },
    { id: "marketAnalysis", name: "Market Analysis", active: false },
    { id: "userList", name: "User List", active: false },
    { id: "insertUser", name: "Insert User", active: false },
    { id: "accountStatement", name: "Account Statement", active: false },
    { id: "partyWinLoss", name: "Party Win Loss", active: false },
    { id: "currentBets", name: "Current Bets", active: false },
    { id: "casinoResult", name: "Casino Result", active: false },
    { id: "liveCasinoResult", name: "Live Casino Result", active: false },
    { id: "ourCasino", name: "Our Casino", active: false },
    { id: "events", name: "Events", active: false },
    {
      id: "marketSearchAnalysis",
      name: "Market Search Analysis",
      active: false,
    },
    { id: "loginUserCreation", name: "Login User creation", active: false },
    { id: "withdraw", name: "Withdraw", active: false },
    { id: "deposit", name: "Deposit", active: false },
    { id: "creditReference", name: "Credit Reference", active: false },
    { id: "userInfo", name: "User Info", active: false },
    { id: "userPasswordChange", name: "User Password Change", active: false },
    { id: "userLock", name: "User Lock", active: false },
    { id: "betLock", name: "Bet Lock", active: false },
    { id: "activeUser", name: "Active User", active: false },
  ],
};

const MultiLogin: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [eventDetails, setEventDetails] = useState({
    show: false,
    eventId: null,
    userData: null,
  });
  const { userAlreadyExist } = useSelector(
    (state: RootState) => state.user.userList
  );
  const { addSuccess } = useSelector(
    (state: RootState) => state.user.multiLogin
  );

  const validator = addMultiLoginAccountValidationSchema(userAlreadyExist);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validator,
    onSubmit: (values: Values) => {
      try {
        let payload = {
          userName: values.userName,
          fullName: values.fullName,
          password: values.password,
          confirmPassword: values.confirmPassword,
          transactionPassword: values.transactionPassword,
          permission: values.privileges.reduce((acc: any, curr: any) => {
            acc[curr.id] = curr.active;
            return acc;
          }, {} as Record<string, boolean>),
        };
        dispatch(addUserMultiLogin(payload));
      } catch (e) {
        console.log(e);
      }
    },
  });
  const { getFieldProps, touched, errors, handleSubmit } = formik;

  const debouncedInputValue = useMemo(() => {
    return debounce((value) => {
      dispatch(getAlreadyUserExist(value));
    }, 500);
  }, []);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    formik.handleChange(e);
    debouncedInputValue(query);
  };

  useEffect(() => {
    if (formik.values.userName) {
      formik.validateForm();
    }
  }, [userAlreadyExist]);

  useEffect(() => {
    if (addSuccess) {
      dispatch(resetAddSuccessMultiUser());
      formik.resetForm();
      dispatch(getUserMultiLoginList());
    }
  }, [addSuccess]);

  useEffect(() => {
    dispatch(getUserMultiLoginList());
  }, []);

  return (
    <Container className="multiAccountLogin" fluid>
      <Row>
        <Col>
          <p className="title-22">Multi Login Account</p>
        </Col>
      </Row>
      <Container className="multiAccountLoginInt" fluid>
        <form onSubmit={handleSubmit}>
          <Row className="p-2">
            <p className="m-0">Personal Information</p>
          </Row>
          <Row className="px-2">
            <Col md={3}>
              <CustomInput
                id="userName"
                title="Client ID"
                name="userName"
                onBlur={formik.handleBlur}
                placeholder="Client ID"
                type="text"
                customstyle="mb-3"
                value={formik.values.userName}
                onChange={handleUserNameChange}
                touched={touched.userName}
                errors={errors.userName}
              />
            </Col>
            <Col md={3}>
              <CustomInput
                id="fullName"
                title="Full Name"
                placeholder="Full Name"
                type="text"
                customstyle="mb-3"
                {...getFieldProps("fullName")}
                touched={touched.fullName}
                errors={errors.fullName}
              />
            </Col>
            <Col md={3}>
              <CustomInput
                id="password"
                title="Password"
                placeholder="Password"
                type="password"
                customstyle="mb-3"
                {...getFieldProps("password")}
                touched={touched.password}
                errors={errors.password}
              />
            </Col>
            <Col md={3}>
              <CustomInput
                id="confirmPassword"
                title="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                customstyle="mb-3"
                {...getFieldProps("confirmPassword")}
                touched={touched.confirmPassword}
                errors={errors.confirmPassword}
              />
            </Col>
          </Row>
          <Row className="p-2">
            <Col md={12}>
              <p className="custom-label m-0">Privileges</p>
              <Container className="multiLoginInputCont" fluid>
                <Row className="py-2">
                  {formik.values?.privileges?.map(
                    (item: any, index: number) => (
                      <Col md={2} sm={4} xs={12} key={item.id}>
                        <Form.Check
                          key={item.id}
                          checked={item.active}
                          id={`opt${index + 1}`}
                          aria-label={item.name}
                          label={item.name}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const updatedPrivileges = [
                              ...formik.values.privileges,
                            ];

                            if (item.id === "all") {
                              const newPrivileges = updatedPrivileges.map(
                                (priv) => ({
                                  ...priv,
                                  active: isChecked,
                                })
                              );
                              formik.setValues({
                                ...formik.values,
                                privileges: newPrivileges,
                              });
                            } else {
                              const currElemIndex = updatedPrivileges.findIndex(
                                (priv) => priv.id === item.id
                              );
                              updatedPrivileges[currElemIndex].active =
                                isChecked;

                              const allIndex = updatedPrivileges.findIndex(
                                (priv) => priv.id === "all"
                              );
                              if (
                                allIndex !== -1 &&
                                updatedPrivileges[allIndex].active
                              ) {
                                updatedPrivileges[allIndex].active = false;
                              }

                              formik.setValues({
                                ...formik.values,
                                privileges: updatedPrivileges,
                              });
                            }
                          }}
                        />
                      </Col>
                    )
                  )}
                </Row>
              </Container>
              <CustomErrorMessage touched={true} errors={errors.privileges} />
            </Col>
          </Row>
          <Row className="p-2 justify-content-end">
            <Col md={3}>
              <CustomInput
                id="transactionPassword"
                placeholder="Transaction Code"
                type="password"
                customstyle="mb-3"
                {...getFieldProps("transactionPassword")}
                touched={touched.transactionPassword}
                errors={errors.transactionPassword}
              />
            </Col>
            <Col xs="auto">
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Col>

            <Col xs="auto">
              <Button
                variant="outline-secondary"
                onClick={() => formik.resetForm()}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
      <div className="outer">
        <div className="inner">
          <Table bordered hover size="sm">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    className={
                      [0, 1, 2].includes(index) ? `fixed-col-${index + 1}` : ""
                    }
                    key={column.id}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fixed-col-1">1</td>
                <td className="fixed-col-2">1</td>
                <td className="fixed-col-3">1</td>
                <td className="">1</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
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
          sort="user.createdAt"
          order="DESC"
          activeTab="active"
        />
      )}
    </Container>
  );
};

export default React.memo(MultiLogin);
