import { useFormik } from "formik";
import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SelectSearch from "../../components/commonComponent/SelectSearch";
import CustomInput from "../../components/commonComponent/input";
import {
  addSuccessReset,
  addUser,
  getAlreadyUserExist,
  successMessageReset,
} from "../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../store/store";
import { addAccountValidationSchema } from "../../utils/fieldValidations/addAccount";

interface Values {
  clientName: string;
  userPassword: string;
  retypePassword: string;
  fullName: string;
  city: string;
  phoneNo: string;
  accountType: {
    label: string;
    value: string;
  };
  creditReference: string;
  exposureLimit: string;
  minBet: string;
  maxBet: string;
  delay: string;
  uplinePartnership: number;
  transactionPassword: string;
  downlinePartnership: number;
  ourPartnership: number;
  commissionDownPartnership: number;
}

const AddAccount = () => {
  const dispatch: AppDispatch = useDispatch();
  const [accountTypes, setAccountTypes] = useState<any>([]);
  const [down, setDown] = useState<number>(0);
  const [errorHandle, setErrorHandle] = useState(false);
  const [successInsert, setSuccessInsert] = useState(false);
  const initialValues = {
    clientName: "",
    userPassword: "",
    retypePassword: "",
    fullName: "",
    city: "",
    phoneNo: "",
    accountType: {
      label: "- Select Your A/C. Type -",
      value: "",
    },
    commissionUpPartnership: 0,
    commissionDownPartnership: 0,
    ourCommissionPartnership: 0,
    uplinePartnership: 0,
    ourPartnership: 0,
    downlinePartnership: 0,
    creditReference: "",
    exposureLimit: "",
    minBet: "",
    maxBet: "",
    delay: "",
    transactionPassword: "",
  };

  const { userDetail, success } = useSelector(
    (state: RootState) => state.user.profile
  );
  const { userAlreadyExist } = useSelector(
    (state: RootState) => state.user.userList
  );
  const { addSuccess, successMessage, loading } = useSelector(
    (state: RootState) => state.user.userUpdate
  );
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addAccountValidationSchema(userAlreadyExist),
    onSubmit: (values: Values) => {
      try {
        if (loading) {
          return;
        }
        let payload = {
          userName: values.clientName,
          fullName: values.fullName,
          password: values.retypePassword,
          confirmPassword: values.retypePassword,
          phoneNumber: values.phoneNo ? JSON.stringify(values.phoneNo) : "",
          city: values.city,
          roleName: values.accountType.value,
          creditRefrence: values.creditReference,
          // commissionDownPartnership: values.commissionDownPartnership,
          myPartnership:
            values?.accountType.value === "user"
              ? values?.downlinePartnership
              : values.ourPartnership,
          transactionPassword: values?.transactionPassword,
        };
        if (values.accountType.value === "user") {
          let newPayload = {
            ...payload,
            exposureLimit: values.exposureLimit,
            maxBetLimit: values.maxBet,
            minBetLimit: values.minBet,
            delayTime: values.delay.toString(),
          };
          dispatch(addUser(newPayload));
        } else {
          dispatch(addUser(payload));
        }
      } catch (e) {
        console.log(e);
      }
    },
  });

  const { handleSubmit, getFieldProps, touched, errors } = formik;

  const addAccountHedingStyle = {
    padding: "5px 10px",
  };

  const setTypeForAccountType = () => {
    try {
      const roleName = userDetail?.roleName;

      const accountTypeMap: any = {
        superAdmin: [
          { value: "admin", label: "Admin" },
          { value: "superMaster", label: "Super Master" },
          { value: "master", label: "Master" },
          { value: "agent", label: "Agent" },
          { value: "user", label: "User" },
        ],
        admin: [
          { value: "superMaster", label: "Super Master" },
          { value: "master", label: "Master" },
          { value: "agent", label: "Agent" },
          { value: "user", label: "User" },
        ],
        superMaster: [
          { value: "master", label: "Master" },
          { value: "agent", label: "Agent" },
          { value: "user", label: "User" },
        ],
        master: [
          { value: "agent", label: "Agent" },
          { value: "user", label: "User" },
        ],
        agent: [{ value: "user", label: "User" }],
      };

      setAccountTypes(accountTypeMap[roleName] || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePartnershipChange = (event: any) => {
    try {
      const newValue = parseInt(event.target.value, 10);
      const remainingDownline = +down - +newValue;
      if (remainingDownline < 0) {
        return;
      }
      if (formik?.values.accountType.value === "user") {
        formik.setValues({
          ...formik.values,
          ourPartnership: newValue,
          downlinePartnership: 0,
        });
      } else {
        formik.setValues({
          ...formik.values,
          ourPartnership: remainingDownline,
          downlinePartnership: newValue,
        });
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleUpline = () => {
    try {
      const {
        aPartnership,
        saPartnership,
        smPartnership,
        faPartnership,
        fwPartnership,
        mPartnership,
        roleName,
      } = userDetail;

      const partnershipMap: any = {
        agent:
          smPartnership +
          aPartnership +
          saPartnership +
          faPartnership +
          fwPartnership +
          mPartnership,
        superMaster:
          aPartnership + saPartnership + faPartnership + fwPartnership,
        superAdmin: faPartnership + fwPartnership,
        master:
          smPartnership +
          aPartnership +
          saPartnership +
          faPartnership +
          fwPartnership,
        admin: saPartnership + faPartnership + fwPartnership,
        fairGameWallet: 0,
        fairGameAdmin: fwPartnership,
      };

      const thisUplinePertnerShip = partnershipMap[roleName] || 0;

      return thisUplinePertnerShip;
    } catch (e) {
      console.log(e);
    }
  };

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
    try {
      if (success) {
        if (userDetail && userDetail.roleName) {
          const res = handleUpline();
          formik.setValues({
            ...formik.values,
            uplinePartnership: res,
            downlinePartnership: 100 - res,
            ourPartnership: 0,
          });
          setDown(100 - res);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [userDetail, userDetail?.roleName, success, formik?.values?.accountType]);

  useEffect(() => {
    if (addSuccess) {
      formik.resetForm();
      dispatch(addSuccessReset());
    }
  }, [addSuccess]);

  useEffect(() => {
    setTypeForAccountType();
  }, [userDetail]);

  useEffect(() => {
    if (formik?.values?.accountType?.value === "user") {
      const res = handleUpline();
      formik.setValues({
        ...formik.values,
        minBet: "100",
        maxBet: "5000000",
        delay: "5",
        uplinePartnership: res,
        downlinePartnership: 0,
        ourPartnership: 100 - res,
      });
      setDown(100 - res);
    }
  }, [formik?.values?.accountType]);
  useEffect(() => {
    if (successMessage !== "") {
      setSuccessInsert(true);
      setTimeout(() => {
        dispatch(successMessageReset());
        setSuccessInsert(false);
      }, 2000);
    }
  }, [successMessage]);

  return (
    <>
      <Card className="addAccount  border-0">
        <Card.Header className="border-0 pb-0">
          <Card.Title className="title-28 fw-normal ">Add Account</Card.Title>
          {successInsert && (
            <div
              style={{
                backgroundColor: "#d4edda",
                height: "40px",
                alignItems: "center",
                display: "flex",
                paddingLeft: "5px",
              }}
            >
              {successMessage}
            </div>
          )}
        </Card.Header>

        <Card.Body className="bg-light">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
              if (formik.values.accountType.value === "user") {
                setErrorHandle(true);
              }

              const hasErrors = Object.keys(errors).length > 0;

              if (
                hasErrors ||
                (formik.values.accountType.value === "user" &&
                  formik.values.exposureLimit === "")
              ) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <Row>
              <Col md={6}>
                <h6
                  className="mb-3 bg-warning title-18 fw-bold text-white"
                  style={addAccountHedingStyle}
                >
                  Personal Details
                </h6>
                <Row>
                  <Col md={6}>
                    <CustomInput
                      id={"clientName"}
                      title={"Client Name*:"}
                      name={"clientName"}
                      onBlur={formik.handleBlur}
                      placeholder={"Client Name"}
                      type={"text"}
                      customstyle={"mb-3"}
                      value={formik.values.clientName}
                      onChange={handleUserNameChange}
                      touched={touched.clientName}
                      errors={errors.clientName}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      id={"userPassword"}
                      title={"User Password*:"}
                      placeholder={"User Password"}
                      type={"password"}
                      customstyle={"mb-3"}
                      {...getFieldProps("userPassword")}
                      touched={touched.userPassword}
                      errors={errors.userPassword}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      id={"retypePassword"}
                      title={"Retype Password*:"}
                      placeholder={"Retype Password"}
                      type={"password"}
                      customstyle={"mb-3"}
                      {...getFieldProps("retypePassword")}
                      touched={touched.retypePassword}
                      errors={errors.retypePassword}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      id={"fullName"}
                      title={"Full Name*:"}
                      placeholder={"Full Name"}
                      type={"text"}
                      customstyle={"mb-3"}
                      {...getFieldProps("fullName")}
                      touched={touched.fullName}
                      errors={errors.fullName}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      id={"city"}
                      title={"City:"}
                      placeholder={"City"}
                      type={"text"}
                      customstyle={"mb-3"}
                      {...getFieldProps("city")}
                      touched={touched.city}
                      errors={errors.city}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      id={"phoneNo"}
                      title={"Phone:"}
                      placeholder={"Phone"}
                      type={"number"}
                      style={{
                        MozAppearance: "none",
                        WebkitAppearance: "none",
                        appearance: "none",
                      }}
                      {...getFieldProps("phoneNo")}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <h6
                  className="mb-3 bg-warning title-18 fw-bold text-white "
                  style={addAccountHedingStyle}
                >
                  Account Details
                </h6>
                <Row>
                  <Col md={6}>
                    <SelectSearch
                      id="accountType"
                      name="accountType"
                      label={"Account Type*:"}
                      options={accountTypes}
                      placeholder={"- Select Your A/C. Type -"}
                      value={formik.values.accountType}
                      onChange={(accountTypes: any) =>
                        formik.setFieldValue("accountType", accountTypes)
                      }
                      onBlur={() => formik.setFieldTouched("accountType", true)}
                      touched={touched.accountType}
                      errors={errors.accountType?.value}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      id={"creditReference"}
                      title={"Credit Reference*:"}
                      placeholder={"Enter Credit Reference"}
                      type={"number"}
                      min={0}
                      customstyle={"mb-3"}
                      {...getFieldProps("creditReference")}
                      touched={touched.creditReference}
                      errors={errors.creditReference}
                    />
                  </Col>
                  {formik.values.accountType.value === "user" && (
                    <Col md={6}>
                      <CustomInput
                        id={"exposureLimit"}
                        title={"Exposure Limit*"}
                        placeholder={"Enter Exposure Limit"}
                        type={"number"}
                        min={0}
                        customstyle={"mb-3"}
                        {...getFieldProps("exposureLimit")}
                        touched={touched.exposureLimit}
                        errors={errors.exposureLimit}
                      />
                      {errorHandle && formik.values.exposureLimit === "" && (
                        <div className="text-danger">
                          Exposure Limit is required
                        </div>
                      )}
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h6
                  className="mb-3 bg-warning title-18 fw-bold text-white"
                  style={addAccountHedingStyle}
                >
                  Commission Settings
                </h6>
                <Table className="mb-3" striped bordered hover>
                  <tbody>
                    <tr>
                      <td className="w-25">Upline</td>
                      <td>
                        <CustomInput
                          disabled={true}
                          id={"commissionUpPartnership"}
                          type={"number"}
                          {...getFieldProps("commissionUpPartnership")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="w-25">Downline</td>
                      <td style={{ backgroundColor: "rgba(0, 0, 0, 0%)" }}>
                        <CustomInput
                          id={"commissionDownPartnership"}
                          type={"number"}
                          min={0}
                          {...getFieldProps("commissionDownPartnership")}
                          disabled={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="w-25">Our</td>
                      <td>
                        <CustomInput
                          disabled={true}
                          id={"ourCommissionPartnership"}
                          type={"number"}
                          {...getFieldProps("ourCommissionPartnership")}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h6
                  className="mb-3 bg-warning title-18 fw-bold text-white"
                  style={addAccountHedingStyle}
                >
                  Partnership
                </h6>
                <Table className="mb-3" striped bordered hover>
                  <tbody>
                    <tr>
                      <td className="w-25">Upline</td>
                      <td>
                        <CustomInput
                          disabled={true}
                          id={"uplinePartnership"}
                          type={"number"}
                          {...getFieldProps("uplinePartnership")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="w-25">Downline</td>
                      <td style={{ backgroundColor: "rgba(0, 0, 0, 0%)" }}>
                        <CustomInput
                          id={"downLinePartnership"}
                          min={0}
                          max={100}
                          type={"number"}
                          disabled={
                            formik.values.accountType.value === "user" ||
                            userDetail?.roleName === "agent"
                              ? true
                              : false
                          }
                          value={formik.values.downlinePartnership}
                          onChange={handlePartnershipChange}
                          // {...getFieldProps("downLinePartnership")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="w-25">Our</td>
                      <td>
                        <CustomInput
                          disabled={true}
                          id={"ourPartnership"}
                          type={"number"}
                          {...getFieldProps("ourPartnership")}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            {formik.values.accountType.value === "user" ? (
              <Row>
                <Col md={12}>
                  <h6
                    className="mb-3 bg-warning title-18 fw-bold "
                    style={addAccountHedingStyle}
                  >
                    Min Max Bet
                  </h6>

                  <Table striped bordered className="commonTable">
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                          Min Bet
                        </td>
                        <td>{formik.values.minBet || "0.00"}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            verticalAlign: "middle",
                            backgroundColor: "rgba(0, 0, 0, 0%)",
                          }}
                        >
                          <CustomInput
                            id={"minBet"}
                            type={"number"}
                            min={0}
                            customstyle={"mb-3"}
                            {...getFieldProps("minBet")}
                            touched={touched.minBet}
                            errors={errors.minBet}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                          Max Bet
                        </td>
                        <td>{formik.values.maxBet || "0.00"}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            verticalAlign: "middle",
                            backgroundColor: "rgba(0, 0, 0, 0%)",
                          }}
                        >
                          <CustomInput
                            id={"maxBet"}
                            type={"number"}
                            min={0}
                            customstyle={"mb-3"}
                            {...getFieldProps("maxBet")}
                            touched={touched.maxBet}
                            errors={errors.maxBet}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                          Delay
                        </td>
                        <td>{formik.values.delay || "0.00"}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            verticalAlign: "middle",
                            backgroundColor: "rgba(0, 0, 0, 0%)",
                          }}
                        >
                          <CustomInput
                            id={"delay"}
                            type={"number"}
                            min={0}
                            customstyle={"mb-3"}
                            {...getFieldProps("delay")}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            ) : null}
            <Row>
              <Col md={12}>
                <CustomInput
                  id={"transactionPassword"}
                  title={"Transaction Password:"}
                  placeholder={"Transaction Password"}
                  type={"password"}
                  customstyle={"mb-3 col-md-3 mt-2 float-end"}
                  {...getFieldProps("transactionPassword")}
                  touched={touched.transactionPassword}
                  errors={errors.transactionPassword}
                />
              </Col>
            </Row>

            <Button variant="primary" style={{ float: "right" }} type="submit">
              Create Account
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddAccount;
