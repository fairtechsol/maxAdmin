import { Col, Row, Stack } from "react-bootstrap";
import CustomInput from "../../../commonComponent/input";

const Password = () => {
  return (
    <Stack className="listClientModals" gap={0}>
      <div className="input-container">
        <Row>
          <Col sm={4}>
            <span>New Password</span>
          </Col>
          <Col sm={8}>
            <CustomInput
              type="password"
              customStyle="input-box"
              bgColor="gray"
              disabled={true}
              id="newPasswordInput"
            />
          </Col>
        </Row>
      </div>
      <div className="input-container mt-3">
        <Row>
          <Col sm={4}>
            <span>Confirm Password</span>
          </Col>
          <Col sm={8}>
            <CustomInput
              type="password"
              customStyle="input-box"
              id="confirmPasswordInput"
            />
          </Col>
        </Row>
      </div>
      <div className="input-container mt-3">
        <Row>
          <Col sm={4}>
            <span>Transaction Password</span>
          </Col>
          <Col sm={8}>
            <CustomInput
              type="password"
              customStyle="input-box"
              id="transactionPasswordInput"
            />
          </Col>
        </Row>
      </div>
    </Stack>
  );
};

export default Password;
