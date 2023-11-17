import React from "react";
import { Card, Form, Row, Col, Button, Table } from "react-bootstrap";
import CustomInput from "../../components/commonComponent/input";
import TableRow from "./TableRow";
import SelectSearch from "../../components/commonComponent/SelectSearch";

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

const handleSubmit = (e: any) => {
  e.preventDefault();
};

const AddAccount = () => {
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>Add Account</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <h6 className="mb-3 bg-warning p-2">Personal Details</h6>
                <Row>
                  <Col md={6}>
                    <CustomInput
                      title={"Client Name:"}
                      placeholder={"Client Name:"}
                      type={"text"}
                      customStyle={"mb-3"}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      title={"User Password"}
                      placeholder={"Transaction Password"}
                      type={"password"}
                      customStyle={"mb-3"}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      title={"Retype Password:"}
                      placeholder={"Retype Password"}
                      type={"password"}
                      customStyle={"mb-3"}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      title={"Full Name:"}
                      placeholder={"Full Name"}
                      type={"text"}
                      customStyle={"mb-3"}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      title={"City:"}
                      placeholder={"City"}
                      type={"text"}
                      customStyle={"mb-3"}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      title={"Phone:"}
                      placeholder={"Phone"}
                      type={"number"}
                      customStyle={"mb-3"}
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
                    <CustomInput
                      title={"Credit Reference"}
                      placeholder={"Enter Credit Reference"}
                      type={"number"}
                      customStyle={"mb-3"}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      title={"Exposure Limit"}
                      placeholder={"Enter Exposure Limit"}
                      type={"number"}
                      customStyle={"mb-3"}
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
                        <CustomInput type={"number"} customStyle={"mb-3"}/>
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
                        <CustomInput type={"number"} customStyle={"mb-3"}/>
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
                        <CustomInput type={"number"} customStyle={"mb-3"}/>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <CustomInput
                  title={"Transaction Password:"}
                  placeholder={"Transaction Password"}
                  type={"text"}
                  customStyle={" col-md-3 float-end"}
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
