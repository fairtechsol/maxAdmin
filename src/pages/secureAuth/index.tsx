import { Button, Col, Form, Nav, Row, Tab } from "react-bootstrap";

import { TfiAndroid } from "react-icons/tfi";
import "./style.scss";

const SecureAuth = () => {
  return (
    <div className="secureAuth px-2">
      <h4 className="fw-normal m-0 mb-5 title-22">Secure Auth Verification</h4>
      <Row className="justify-content-center text-center">
        <Col lg={5}>
          <div className="secureAuth-status d-flex align-items-center justify-content-center">
            <h3 className="m-0 me-2 fw-normal title-24">
              Secure Auth Verification Status:{" "}
            </h3>
            <span className="bg-pdf title-16 fw-bold text-white text-uppercase px-2">
              Disabled
            </span>
          </div>
          <p className="title-14">
            Please select below option to enable secure auth verification
          </p>
          <Tab.Container id="left-tabs-example" defaultActiveKey="mobileApp">
            <Nav variant="pills" className="flex-row">
              <Nav.Item>
                <Nav.Link
                  className="rounded-0 bg-transparent p-0"
                  eventKey="mobileApp"
                >
                  <Button className="rounded-0 title-18" variant="">
                    {" "}
                    Enable Using Mobile App
                  </Button>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="rounded-0 bg-transparent p-0"
                  eventKey="telegram"
                >
                  <Button className="rounded-0 title-18" variant="">
                    {" "}
                    Enable Using Telegram
                  </Button>
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content className="my-2">
              <Tab.Pane eventKey="mobileApp">
                <p className=" title-14">
                  Please enter below auth code in your 'Secure Auth Verification
                  App'.
                </p>
                <div className="bg-gray p-5">
                  <h4>Counter</h4>
                </div>
                <p className="title-20">
                  If you haven't downloaded,
                  <span className="d-lg-block">
                    {" "}
                    please download 'Secure Auth Verification App' from below
                    link.{" "}
                  </span>
                </p>
                <p className="title-14 mt-3">
                  Using this app you will receive auth code during login
                  authentication
                </p>
                <div className="androidDwnloadCard d-flex align-items-center mx-auto justify-content-center bg-green">
                  <span className="text-white">
                    <TfiAndroid className="title-46 text-white" />
                  </span>
                  <div className="text-left">
                    <h4 className="mb-0">Download</h4>
                    <div className="mt-0 dtext">on the android</div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="telegram">
                <p className="title-14 mt-3">
                  Please enter your Transaction Password to continue
                </p>

                <Form className="getConection w-100">
                  <div className="d-flex  justify-content-center">
                    <Form.Control
                      className="w-auto"
                      type="email"
                      placeholder="Enter Transaction"
                    />
                    <Button className="ms-2 bg-defaultBlue border-0">
                      Get Connection Id
                    </Button>{" "}
                  </div>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </div>
  );
};

export default SecureAuth;
