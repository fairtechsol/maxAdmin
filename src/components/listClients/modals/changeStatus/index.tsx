import { useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import Switch from "react-switch";
import CustomInput from "../../../commonComponent/input";

const ChangeStatus = () => {
  const [userChecked, setUserChecked] = useState(false);
  const [betChecked, setbetChecked] = useState(false);

  const handleChange = (newChecked: any) => {
    setUserChecked(newChecked);
  };
  const handleChange2 = (newChecked: any) => {
    setbetChecked(newChecked);
  };
  return (
    <Stack className="listClientModals" gap={0}>
      <div className="input-container">
        <Row>
          <Col sm={12}>
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="text-secondary title-20 fw-normal">
                ajay Duple...
              </h3>
              <h3 className="text-green title-14">Active</h3>
            </div>
            <div className="row">
              <Col sm={6} className="text-center">
                <p className="m-0 mb-1 title-14">User Active</p>
                <label>
                  <Switch
                    onChange={handleChange}
                    checked={userChecked}
                    uncheckedIcon={
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        OFF
                      </span>
                    }
                    checkedIcon={
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          fontSize: 12,
                          fontWeight: 600,
                          paddingRight: 2,
                        }}
                      >
                        ON
                      </span>
                    }
                    height={24}
                    width={60}
                  />
                </label>
              </Col>

              <Col sm={6} className="text-center">
                <p className="m-0 mb-1 title-14">Bet Active</p>
                <label>
                  <Switch
                    onChange={handleChange2}
                    checked={betChecked}
                    uncheckedIcon={
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        OFF
                      </span>
                    }
                    checkedIcon={
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          fontSize: 12,
                          fontWeight: 600,
                          paddingRight: 2,
                        }}
                      >
                        ON
                      </span>
                    }
                    height={24}
                    width={60}
                  />
                </label>
              </Col>
            </div>
          </Col>
          <Col sm={8}></Col>
        </Row>
      </div>
      <div className="input-container mt-5">
        <Row>
          <Col sm={4}>
            <span>Transaction password</span>
          </Col>
          <Col sm={8}>
            <CustomInput
              type="password"
              customStyle="input-box"
              id="transactionPassword"
            />
          </Col>
        </Row>
      </div>
    </Stack>
  );
};

export default ChangeStatus;
