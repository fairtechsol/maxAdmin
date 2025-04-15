import { useEffect, useState } from "react";
import { Button, Card, Tab, Tabs } from "react-bootstrap";
import { FaAndroid } from "react-icons/fa";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import {
  generateAuthToken,
  getAuthenticator,
  removeAuthenticator,
  resendTokenToDisable,
} from "../../store/actions/auth/authActions";
import { AppDispatch, RootState } from "../../store/store";
import { serviceUrl } from "../../utils/Constants";
import "./style.scss";

const SecureAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [password, setPassword] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const { authToken, authenticatedData } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      generateAuthToken({
        type: 1,
        password: password,
      })
    );
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleOtpChange = (otpValue: any) => {
    setOtp(otpValue);
  };

  const handleSelect = (k: any) => {
    if (k === "1") {
      dispatch(
        generateAuthToken({
          type: 2,
        })
      );
    }
    setSelectedValue(k);
    setShowDetails(false);
  };

  useEffect(() => {
    dispatch(getAuthenticator());
  }, []);

  useEffect(() => {
    if (otp.length === 6) {
      dispatch(
        removeAuthenticator({
          authToken: otp,
        })
      );
    }
  }, [otp]);

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
        </div>
      </div>
      <Card>
        <Card.Body>
          <div className="text-center">
            <b>Secure Auth Verification Status:</b>{" "}
            <span
              className={`${
                authenticatedData ? "badge-success" : "badge-danger"
              } badge pointer`}
              onClick={() => {
                if (authenticatedData?.type === 1) {
                  dispatch(resendTokenToDisable());
                }
                if (authenticatedData) {
                  setShowOtp(true);
                }
              }}
            >
              {authenticatedData ? "Enabled" : "Disabled"}
            </span>
          </div>
          {showOtp && (
            <div
              className="p-4 d-flex flex-column"
              style={{ backgroundColor: "#fff" }}
            >
              <span
                className="text-center"
                style={{ fontSize: "22px", color: "#004a25" }}
              >
                Security Code Verification
              </span>
              <span className="title-16 text-center">
                Enter the 6-digit code to disbale Secure Auth
              </span>
              <form onSubmit={handleSubmit}>
                <OTPInput
                  value={otp}
                  onChange={handleOtpChange}
                  numInputs={6}
                  shouldAutoFocus
                  inputStyle={{
                    width: "60px",
                    height: "60px",
                    margin: "0 0.5rem",
                    fontSize: "1.5rem",
                    textAlign: "center",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  containerStyle={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                  renderInput={(props: any) => <input {...props} />}
                />
              </form>
            </div>
          )}
          {!authenticatedData && (
            <>
              <div className="mt-1 text-center">
                Please select below option to enable secure auth verification
              </div>
              <div className="casino-report-tabs mt-2">
                <Tabs
                  activeKey={selectedValue}
                  onSelect={handleSelect}
                  className="mb-3 text-center"
                >
                  <Tab eventKey="1" title="Enable Using Mobile App">
                    <div className="text-center">
                      <div className="mt-3">
                        Please enter below auth code in your 'Secure Auth
                        Verification App'.
                      </div>
                      <div className="mt-3">
                        <div className="verify-code">{authToken}</div>
                      </div>
                      <div className="mt-3 lh-1">
                        <b>
                          If you haven't downloaded, <br />
                          please download 'Secure Auth Verification App' from
                          the link below.
                        </b>
                      </div>
                      <div className="mt-2">
                        Using this app, you will receive an auth code during
                        login authentication.
                      </div>
                      <div className="mt-3">
                        <a
                          href={`${serviceUrl}/SecureAuthApp.apk`}
                          target="_blank"
                        >
                          <Button variant="primary">
                            <FaAndroid /> Download on Android
                          </Button>
                        </a>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="2" title="Enable Using Telegram">
                    <div className="text-center">
                      <b>Please enter your login password to continue</b>{" "}
                      <div className="form-group-s mt-3 secure-password">
                        <input
                          type="password"
                          placeholder="Enter your login password"
                          className="form-control-s"
                          value={password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          className="btn btn-primary ms-2 vt"
                          onClick={(e: any) => {
                            handleSubmit(e);
                            setShowDetails(true);
                          }}
                        >
                          Get Connection ID
                        </button>
                      </div>{" "}
                    </div>
                    {showDetails && (
                      <div className="mt-3 follow-instruction text-center">
                        <h4 className="title-20 fbold mb-3">
                          Please follow below instructions for the telegram
                          2-step verification
                        </h4>
                        <p className="title-16">
                          Find{" "}
                          <a target="_blank" href="https://t.me/Auth07_bot">
                            @Auth07_bot
                          </a>{" "}
                          in your telegram and type<kbd>/start</kbd> command.
                          Bot will respond you.
                        </p>
                        <p className="title-16">
                          After this type <kbd>/connect {authToken}</kbd> and
                          send it to BOT.
                        </p>
                        <p className="title-16">
                          Now your telegram account will be linked with your
                          website account and 2-Step verification will be
                          enabled.
                        </p>
                      </div>
                    )}
                  </Tab>
                </Tabs>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default SecureAuth;
