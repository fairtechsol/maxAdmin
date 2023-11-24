import { useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import CustomInput from "../../../commonComponent/input";
import Switch from "../../../commonComponent/switch";

const ChangeStatus = () => {
  const [activeUser, setActiveUser] = useState(false);
  const [activeBet, setActiveBet] = useState(false);

  return (
    <Stack gap={0}>
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
              <Col sm={6}>
                <Switch
                  onSwitchChange={setActiveUser}
                  isChecked={activeUser}
                  label="User Active"
                />
              </Col>
              <Col sm={6}>
                <Switch
                  onSwitchChange={setActiveBet}
                  isChecked={activeBet}
                  label="Bet Active"
                />
              </Col>
            </div>
          </Col>
          <Col sm={8}></Col>
        </Row>
      </div>
      <div className="input-container"></div>
      <div className="input-container">
        <p>Transaction password</p>
        <CustomInput
          type="password"
          customStyle="input-box"
          id="transactionPassword"
        />
      </div>
    </Stack>
  );
};

export default ChangeStatus;
