import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Formik, Form, FormikHelpers } from "formik";
import TableRow from "./TableRow";
import SelectSearch from "../../components/commonComponent/SelectSearch";
import { addAccountValidationSchema } from "../../utils/validationSchema";
import FormikInput from "../../components/commonComponent/input/FormikInput";

interface Values {
  clientName: string;
  userPassword: string;
  retypePassword: string;
  fullName: string;
  city: string;
  phoneNo: string;
  accountType: string;
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

const options = [
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
  accountType: "",
  creditReference: "",
  exposureLimit: "",
  minBet: "",
  maxBet: "",
  delay: "",
  transactionPassword: "",
};

const AddAccount = () => {
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>Add Account</Card.Title>
        </Card.Header>
        <Card.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={addAccountValidationSchema}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
          >
            <Form>
              <Row>
                <Col md={6}>
                  <h6 className="mb-3 bg-warning p-2">Personal Details</h6>
                  <Row>
                    <Col md={6}>
                      <FormikInput
                        id={"clientName"}
                        title={"Client Name:"}
                        placeholder={"Client Name:"}
                        type={"text"}
                        customstyle={"mb-3"}
                      />
                    </Col>
                    <Col md={6}>
                      <FormikInput
                        id={"userPassword"}
                        title={"User Password"}
                        placeholder={"Transaction Password"}
                        type={"password"}
                        customstyle={"mb-3"}
                      />
                    </Col>
                    <Col md={6}>
                      <FormikInput
                        id={"retypePassword"}
                        title={"Retype Password:"}
                        placeholder={"Retype Password"}
                        type={"password"}
                        customstyle={"mb-3"}
                      />
                    </Col>
                    <Col md={6}>
                      <FormikInput
                        id={"fullName"}
                        title={"Full Name:"}
                        placeholder={"Full Name"}
                        type={"text"}
                        customstyle={"mb-3"}
                      />
                    </Col>
                    <Col md={6}>
                      <FormikInput
                        id={"city"}
                        title={"City:"}
                        placeholder={"City"}
                        type={"text"}
                        customstyle={"mb-3"}
                      />
                    </Col>
                    <Col md={6}>
                      <FormikInput
                        id={"phoneNo"}
                        title={"Phone:"}
                        placeholder={"Phone"}
                        type={"number"}
                        customstyle={"mb-3"}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <h6 className="mb-3 bg-warning p-2">Account Details</h6>
                  <Row>
                    <Col md={6}>
                      <SelectSearch
                        defaultValue="- Select Your A/C. Type -"
                        options={options}
                        placeholder="- Select Your A/C. Type -"
                        label={"Account Type"}
                      />
                    </Col>
                    <Col md={6}>
                      <FormikInput
                        id={"creditReference"}
                        title={"Credit Reference"}
                        placeholder={"Enter Credit Reference"}
                        type={"number"}
                        customstyle={"mb-3"}
                      />
                    </Col>
                    <Col md={6}>
                      <FormikInput
                        id={"exposureLimit"}
                        title={"Exposure Limit"}
                        placeholder={"Enter Exposure Limit"}
                        type={"number"}
                        customstyle={"mb-3"}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <h6 className="mb-3 bg-warning p-2">Commission Settings</h6>
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
                  <h6 className="mb-3 bg-warning p-2">Partnership</h6>
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
                  <h6 className="mb-3 bg-warning p-2">Min Max Bet</h6>
                  <Table striped bordered>
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
                          <FormikInput
                            id={"minBet"}
                            type={"number"}
                            customstyle={"mb-3"}
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
                          <FormikInput
                            id={"maxBet"}
                            type={"number"}
                            customstyle={"mb-3"}
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
                          <FormikInput
                            id={"delay"}
                            type={"number"}
                            customstyle={"mb-3"}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormikInput
                    id={"transactionPassword"}
                    title={"Transaction Password:"}
                    placeholder={"Transaction Password"}
                    type={"text"}
                    customstyle={"mb-3 col-md-3 float-end"}
                  />
                </Col>
              </Row>

              <Button
                variant="primary"
                style={{ float: "right" }}
                type="submit"
              >
                Create Account
              </Button>
            </Form>
          </Formik>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddAccount;
