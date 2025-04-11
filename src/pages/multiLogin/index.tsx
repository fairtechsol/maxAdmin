import { useFormik } from "formik";
import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/common.scss";
import CustomInput from "../../components/commonComponent/input";
import CustomErrorMessage from "../../components/commonComponent/input/CustomErrorMessage";
import CustomModal from "../../components/commonComponent/modal";
import ChangeStatus from "../../components/multiLogin/modal/ChangeStatus";
import Password from "../../components/multiLogin/modal/Password";
import { Column } from "../../models/tableInterface";
import {
  addUserMultiLogin,
  getAlreadyUserExist,
  getUserMultiLoginList,
  resetAddSuccessMultiUser,
} from "../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../store/store";
import {
  addMultiLoginAccountValidationSchema,
  editMultiLoginAccountValidationSchema,
} from "../../utils/fieldValidations/multiLogin";
import "./style.scss";

const privelegeColumn = [
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
];

const columns: Column[] = [
  { id: "action", label: "Action" },
  { id: "username", label: "User Name" },
  { id: "fullName", label: "Full Name" },
  ...privelegeColumn
    .filter((item) => item.id !== "all")
    .map((item) => {
      return { id: item.id, label: item.name };
    }),
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
  privileges: privelegeColumn,
};

const MultiLogin: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState<any>({ status: false, data: null });
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [rowData, setRowData] = useState(null);

  const { userAlreadyExist } = useSelector(
    (state: RootState) => state.user.userList
  );
  const { addSuccess, multiLoginUserList } = useSelector(
    (state: RootState) => state.user.multiLogin
  );

  const validator = editMode?.status
    ? editMultiLoginAccountValidationSchema(userAlreadyExist)
    : addMultiLoginAccountValidationSchema(userAlreadyExist);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validator,
    onSubmit: (values: Values) => {
      try {
        let payload: any = {
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
        if (editMode?.status) {
          payload.id = editMode?.data?.id;
          delete payload.password;
          delete payload.confirmPassword;
        }
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

  const handleCheck = (e: any, item: any) => {
    const isChecked = e.target.checked;
    const updatedPrivileges = [...formik.values.privileges];

    if (item.id === "all") {
      const newPrivileges = updatedPrivileges.map((priv) => ({
        ...priv,
        active: isChecked,
      }));
      formik.setValues({
        ...formik.values,
        privileges: newPrivileges,
      });
    } else {
      const currElemIndex = updatedPrivileges.findIndex(
        (priv) => priv.id === item.id
      );
      updatedPrivileges[currElemIndex].active = isChecked;

      const allIndex = updatedPrivileges.findIndex((priv) => priv.id === "all");
      if (allIndex !== -1 && updatedPrivileges[allIndex].active) {
        updatedPrivileges[allIndex].active = false;
      }

      formik.setValues({
        ...formik.values,
        privileges: updatedPrivileges,
      });
    }
  };

  const handleUpdateUser = (item: any) => {
    try {
      setEditMode({
        status: true,
        data: item,
      });
      formik.setValues({
        ...formik.values,
        userName: item.userName,
        fullName: item.fullName,
        privileges: privelegeColumn?.map((items) => {
          return {
            ...items,
            active: item?.permission[items.id],
          };
        }),
      });
    } catch (error) {
      console.log(error);
    }
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
      setEditMode({
        status: false,
        data: null,
      });
      dispatch(getUserMultiLoginList());
    }
  }, [addSuccess]);

  useEffect(() => {
    dispatch(getUserMultiLoginList());
  }, []);

  return (
    <>
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
                  disabled={editMode.status}
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
              {!editMode.status && (
                <>
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
                </>
              )}
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
                            className=""
                            onChange={(e) => handleCheck(e, item)}
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
              <Col md={2}>
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
              <Col xs="auto" className="p-0">
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  style={{
                    backgroundColor: "#eff2f7",
                    borderColor: "#eff2f7",
                    color: "#000",
                  }}
                  onClick={() => {
                    formik.resetForm();
                    setEditMode({ status: false, data: null });
                  }}
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
                        [0, 1, 2].includes(index)
                          ? `fixed-col-${index + 1}`
                          : ""
                      }
                      key={column.id}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {multiLoginUserList?.map((item: any) => (
                  <tr key={item?.id}>
                    <td className="fixed-col-1">
                      <Button
                        style={{
                          backgroundColor: "#014421",
                          border: "none",
                          width: "30px",
                          height: "30px",
                          padding: 0,
                          marginRight: 3,
                        }}
                        onClick={() => handleUpdateUser(item)}
                      >
                        U
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#4dabf7",
                          border: "none",
                          width: "30px",
                          height: "30px",
                          padding: 0,
                          marginRight: 3,
                        }}
                        onClick={() => {
                          setShowChangeStatus(true);
                          setRowData(item);
                        }}
                      >
                        S
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#38d9a9",
                          border: "none",
                          width: "30px",
                          height: "30px",
                          padding: 0,
                        }}
                        onClick={() => {
                          setShow(true);
                          setRowData(item);
                        }}
                      >
                        P
                      </Button>
                    </td>
                    <td className="fixed-col-2">
                      {item?.userName}{" "}
                      <FaCheck color={!item?.userBlock ? "green" : "gray"} />
                    </td>
                    <td className="fixed-col-3">{item?.fullName}</td>
                    {privelegeColumn
                      .filter((items) => items.id !== "all")
                      .map((items) => (
                        <td key={items.id}>
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              height: "100%",
                            }}
                          >
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                backgroundColor: item?.permission[items.id]
                                  ? "#212121"
                                  : "transparent",
                                border: "2px solid #212121",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {item?.permission[items.id] && (
                                <FaCheck color="white" size={12} />
                              )}
                            </div>
                          </div>
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
      <CustomModal
        customClass="px-2"
        show={show}
        setShow={setShow}
        title="Password"
        titleStyle="fw-normal title-22"
      >
        <Password userData={rowData} setShow={setShow} />
      </CustomModal>
      <CustomModal
        customClass="px-2"
        show={showChangeStatus}
        setShow={setShowChangeStatus}
        title="Change User Status"
        titleStyle="fw-normal title-22"
      >
        <ChangeStatus userData={rowData} setShow={setShowChangeStatus} />
      </CustomModal>
    </>
  );
};

export default React.memo(MultiLogin);
