import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import SelectSearch from "../../components/commonComponent/SelectSearch";
import CustomInput from "../../components/commonComponent/input";
import { addAccountValidationSchema } from "../../utils/fieldValidations/addAccount";
import { useFormik } from "formik";
import { addUser } from "../../store/actions/user/userActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useEffect } from "react";

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
  transactionPassword: string;
  downlinePartnership: number;
}

const accountTypes = [
  { value: "admin", label: "Admin", level: 1 },
  { value: "superMaster", label: "Super Master", level: 2 },
  { value: "master", label: "Master", level: 3 },
  { value: "agent", label: "Agent", level: 4 },
  { value: "user", label: "User", level: 5 },
];

const initialValues = {
  clientName: "",
  userPassword: "",
  retypePassword: "",
  fullName: "",
  city: "",
  phoneNo: "",
  accountType: {
    label: "",
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

const AddAccount = () => {
  const dispatch: AppDispatch = useDispatch();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addAccountValidationSchema,
    onSubmit: (values: Values) => {
      debugger;
      let payload = {
        userName: values.clientName,
        fullName: values.fullName,
        password: values.retypePassword,
        confirmPassword: values.retypePassword,
        phoneNumber: JSON.stringify(values.phoneNo),
        city: values.city,
        roleName: values.accountType.value,
        creditRefrence: values.creditReference,
        exposureLimit: values.exposureLimit,
        maxBetLimit: values.maxBet,
        minBetLimit: values.minBet,
        myPartnership: 89,
      };
      dispatch(addUser(payload));
    },
  });

  const { handleSubmit, getFieldProps, touched, errors } = formik;

  const addAccountHedingStyle = {
    padding: "5px 10px",
  };

  useEffect(() => { }, []);
  return (
    <>
      <Card className="addAccount  border-0">
        <Card.Header className="border-0 pb-0">
          <Card.Title className="title-28 fw-normal ">Add Account</Card.Title>
        </Card.Header>
        <Card.Body className="bg-light">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <h6
                  className="mb-3 bg-warning title-18 fw-bold"
                  style={addAccountHedingStyle}
                >
                  Personal Details
                </h6>
                <Row>
                  <Col md={6}>
                    <CustomInput
                      id={"clientName"}
                      title={"Client Name:"}
                      placeholder={"Client Name:"}
                      type={"text"}
                      customstyle={"mb-3"}
                      {...getFieldProps("clientName")}
                      touched={touched.clientName}
                      errors={errors.clientName}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      id={"userPassword"}
                      title={"User Password"}
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
                      title={"Retype Password:"}
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
                      title={"Full Name:"}
                      placeholder={"Full Name"}
                      type={"text"}
                      customstyle={"mb-3"}
                      {...getFieldProps("fullName")}
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
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      id={"phoneNo"}
                      title={"Phone:"}
                      placeholder={"Phone"}
                      type={"number"}
                      customstyle={"mb-3"}
                      {...getFieldProps("phoneNo")}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <h6
                  className="mb-3 bg-warning title-18 fw-bold "
                  style={addAccountHedingStyle}
                >
                  Account Details
                </h6>
                <Row>
                  <Col md={6}>
                    <SelectSearch
                      id="accountType"
                      label={"Account Type"}
                      options={accountTypes}
                      placeholder={"- Select Your A/C. Type -"}
                      value={accountTypes.find(
                        (option: any) =>
                          option.value === formik.values.accountType.value
                      )}
                      onChange={(accountTypes: any) =>
                        formik.setFieldValue("accountType", accountTypes)
                      }
                      onBlur={formik.handleBlur}
                      touched={touched.accountType}
                      errors={errors.accountType}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      id={"creditReference"}
                      title={"Credit Reference"}
                      placeholder={"Enter Credit Reference"}
                      type={"number"}
                      customstyle={"mb-3"}
                      {...getFieldProps("creditReference")}
                      touched={touched.creditReference}
                      errors={errors.creditReference}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      id={"exposureLimit"}
                      title={"Exposure Limit"}
                      placeholder={"Enter Exposure Limit"}
                      type={"number"}
                      customstyle={"mb-3"}
                      {...getFieldProps("exposureLimit")}
                      touched={touched.exposureLimit}
                      errors={errors.exposureLimit}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h6
                  className="mb-3 bg-warning title-18 fw-bold "
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
                      <td>
                        <CustomInput
                          id={"commissionDownPartnership"}
                          type={"number"}
                          {...getFieldProps("commissionDownPartnership")}
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
                  className="mb-3 bg-warning title-18 fw-bold "
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
                      <td>
                        <CustomInput
                          id={"downLinePartnership"}
                          type={"number"}
                          {...getFieldProps("downLinePartnership")}
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
                      <tr></tr>
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
                      <td style={{ verticalAlign: "middle" }}>
                        <CustomInput
                          id={"minBet"}
                          type={"number"}
                          customstyle={"mb-3"}
                          {...getFieldProps("minBet")}
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
                      <td style={{ verticalAlign: "middle" }}>
                        <CustomInput
                          id={"maxBet"}
                          type={"number"}
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
                      <td style={{ verticalAlign: "middle" }}>
                        <CustomInput
                          disabled={true}
                          id={"delay"}
                          type={"number"}
                          customstyle={"mb-3"}
                          {...getFieldProps("delay")}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
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
