import { Button, Card, Tab, Tabs } from "react-bootstrap";

import "./style.scss";
import { FaAndroid } from "react-icons/fa";

const SecureAuth = () => {
  return (
    <>
      <div data-v-61537a09="" className="security-auth">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0 f400">Secure Auth Verification</h4>{" "}
              <div className="page-title-right"></div>
            </div>
          </div>
        </div>{" "}
      </div>
      <Card>
        <Card.Body>
          <div className="text-center">
            <b>Secure Auth Verification Status:</b>{" "}
            <span className="badge-danger badge">Disabled</span>
          </div>

          <div className="mt-1 text-center">
            Please select below option to enable secure auth verification
          </div>

          <div className="casino-report-tabs mt-2">
            <Tabs defaultActiveKey="mobile-app" className="mb-3 text-center ">
              <Tab eventKey="mobile-app" title="Enable Using Mobile App">
                <div className="text-center">
                  <div className="mt-3">
                    Please enter below auth code in your 'Secure Auth
                    Verification App'.
                  </div>
                  <div className="mt-3">
                    <div className="verify-code">233558</div>
                  </div>
                  <div className="mt-3 lh-1">
                    <b>
                      If you haven't downloaded, <br />
                      please download 'Secure Auth Verification App' from the
                      link below.
                    </b>
                  </div>
                  <div className="mt-2">
                    Using this app, you will receive an auth code during login
                    authentication.
                  </div>
                  <div className="mt-3">
                    <a href="#">
                      <Button variant="primary">
                        <FaAndroid /> Download on Android
                      </Button>
                    </a>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="telegram" title="Enable Using Telegram">
                <div className="text-center">
                  <b>Please enter your login password to continue</b>{" "}
                  <div className="form-group-s mt-3 secure-password">
                    <input
                      type="password"
                      placeholder="Enter your login password"
                      className="form-control-s"
                    />{" "}
                    <button className="btn btn-primary ms-2 vt">
                      Get Connection ID
                    </button>
                  </div>{" "}
                </div>
              </Tab>
            </Tabs>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default SecureAuth;
