import React from "react";
import { Card, Form, Row, Col, Button, Table } from "react-bootstrap";
import CustomInput from "../../components/commonComponent/input";
import TableRow from "./TableRow";

const tableData = [
  ["Upline", "0"],
  ["Downline", "0"],
  ["Our", "0"],
];

const AddAccount = () => {
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>Add Account</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              {/* Personal Details Section */}
              <Col md={6}>
                <h6 className="mb-3 bg-warning p-2">Personal Details</h6>
                <Row>
                  <Col md={6}>
                    <CustomInput
                      title={"Client Name:"}
                      placeholder={"Client Name:"}
                      type={"text"}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      title={"User Password"}
                      placeholder={"Enter User Password"}
                      type={"password"}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      title={"Retype Password"}
                      placeholder={"Retype Password"}
                      type={"password"}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      title={"Full Name"}
                      placeholder={"Enter Full Name"}
                      type={"text"}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      title={"City Name"}
                      placeholder={"Enter City Name"}
                      type={"text"}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      title={"Phone No"}
                      placeholder={"Enter Phone No"}
                      type={"tel"}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <h6 className="mb-3 bg-warning p-2">Account Details</h6>
                <Row>
                  <Col md={6}>
                    <CustomInput
                      title={"Account Type"}
                      placeholder={"Enter Account Type"}
                      type={"text"}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      title={"Credit Reference"}
                      placeholder={"Enter Credit Reference"}
                      type={"text"}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomInput
                      title={"Exposure Limit"}
                      placeholder={"Enter Exposure Limit"}
                      type={"text"}
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
