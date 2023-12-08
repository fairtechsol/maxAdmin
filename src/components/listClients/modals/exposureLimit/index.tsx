import { Col, Row, Stack } from "react-bootstrap";
import CustomInput from "../../../commonComponent/input";

const ExposureLimit = () => {
  return (
    <Stack className="listClientModals" gap={0}>
      <div className="input-container mt-3">
        <Row>
          <Col sm={4}>
            <span>Old Limit</span>
          </Col>
          <Col sm={8}>
            <CustomInput
              type="text"
              customStyle="input-box"
              bgColor="gray"
              disabled={true}
              id="oldLimitInput"
            />
          </Col>
        </Row>
      </div>
      <div className="input-container mt-3">
        <Row>
          <Col sm={4}>
            <span>New Limit</span>
          </Col>
          <Col sm={8}>
            <CustomInput
              type="number"
              customStyle="input-box"
              id="newLimitInput"
            />
          </Col>
        </Row>
      </div>
      <div className="input-container mt-3">
        <Row>
          <Col sm={4}>
            <span>Transaction password</span>
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

export default ExposureLimit;
