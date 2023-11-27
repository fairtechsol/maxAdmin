import { useFormik } from "formik";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import SelectSearch from "../../components/commonComponent/SelectSearch";
import CustomInput from "../../components/commonComponent/input";
import { addAccountValidationSchema } from "../../utils/fieldValidations/addAccount";
import TableRow from "./TableRow";

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
}

const tableData = [
  ["Upline", "0"],
  ["Downline", "0"],
  ["Our", "0"],
];

const accountTypes = [
  { value: "- Select Your A/C. Type -", label: "- Select Your A/C. Type -" },
  { value: "master", label: "Master" },
  { value: "agent", label: "Agent" },
  { value: "user", label: "User" },
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
  creditReference: "",
  exposureLimit: "",
  minBet: "",
  maxBet: "",
  delay: "",
  transactionPassword: "",
};

const AddAccount = () => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addAccountValidationSchema,
    onSubmit: (values: Values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { handleSubmit, getFieldProps, touched, errors } = formik;

  const addAccountHedingStyle = {
    padding: "5px 10px",
  };
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
                      placeholder={"Transaction Password"}
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
                      value={formik.values.accountType.label}
                      onChange={(selectedOption: any) =>
                        formik.setFieldValue("accountType", selectedOption)
                      }
                      onBlur={formik.handleBlur}
                      touched={touched.accountType}
                      errors={errors.accountType?.label}
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
                    {tableData.map((rowData, index) => (
                      <TableRow key={index} data={rowData} />
                    ))}
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
                    {tableData.map((rowData, index) => (
                      <TableRow key={index} data={rowData} />
                    ))}
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
                      <td>100</td>
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
                      <td>100</td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: "middle" }}>
                        <CustomInput
                          id={"maxBet"}
                          type={"number"}
                          customstyle={"mb-3"}
                          {...getFieldProps("maxBet")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                        Delay
                      </td>
                      <td>5.00</td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: "middle" }}>
                        <CustomInput
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
