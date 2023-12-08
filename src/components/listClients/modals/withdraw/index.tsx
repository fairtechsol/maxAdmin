import { Col, Row, Stack } from "react-bootstrap";
import CustomInput from "../../../commonComponent/input";

const Withdraw = () => {
  return (
    <Stack className="listClientModals" gap={0}>
      <div className="input-container w-100">
        <Row>
          <Col sm={4}>
            <span>fmstr1</span>
          </Col>
          <Col sm={8}>
            <div className="d-flex gap-2 input-inner-container">
              <CustomInput
                type="text"
                customStyle="input-box"
                bgColor="gray"
                disabled={true}
                value={2}
                id="fmstr1Input1"
              />
              <CustomInput
                customStyle="input-box"
                bgColor="gray"
                type="text"
                disabled={true}
                value={2}
                id="fmstr1Input2"
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="input-container mt-3">
        <Row>
          <Col sm={4}>
            <span>Account</span>
          </Col>
          <Col sm={8}>
            <div className="d-flex gap-2 input-inner-container">
              <CustomInput
                type="text"
                customStyle="input-box"
                bgColor="gray"
                disabled={true}
                value={2}
                id="accountInput1"
              />
              <CustomInput
                customStyle="input-box"
                bgColor="gray"
                type="text"
                disabled={true}
                value={2}
                id="accountInput2"
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="input-container mt-3">
        <Row>
          <Col sm={4}>
            <span>Amount</span>
          </Col>
          <Col sm={8}>
            <CustomInput
              customStyle="input-box"
              // bgColor="white"
              type="text"
              disabled={true}
              value={2}
              id="accountInput2"
            />
          </Col>
        </Row>
      </div>
      <div className="input-container mt-3">
        <Row>
          <Col sm={4}>
            <span>Remark</span>
          </Col>
          <Col sm={8}>
            <CustomInput
              type="textarea"
              as="textarea"
              rows={4}
              customStyle="input-box"
              id="remarkInput"
            />
          </Col>
        </Row>
      </div>

      <div className="input-container mt-3">
        <Row>
          <Col sm={4}>
            <span>Transition password</span>
          </Col>
          <Col sm={8}>
            <CustomInput
              type="password"
              customStyle="input-box"
              id="passwordInput"
            />
          </Col>
        </Row>
      </div>
    </Stack>
  );
};

export default Withdraw;
