import { Col, Row, Stack } from "react-bootstrap";
import CustomInput from "../../../commonComponent/input";

const Credit = () => {
  return (
    <Stack className="listClientModals" gap={0}>
      <div className="input-container mt-3">
        <Row>
          <Col sm={4}>
            <span>Old Credit</span>
          </Col>
          <Col sm={8}>
            <CustomInput
              type="text"
              customStyle="input-box"
              bgColor="gray"
              disabled={true}
              id="oldCreditInput"
            />
          </Col>
        </Row>
      </div>
      <div className="input-container mt-3">
        <Row>
          <Col sm={4}>
            <span>New Credit</span>
          </Col>
          <Col sm={8}>
            <CustomInput
              type="number"
              customStyle="input-box"
              id="newCreditInput"
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

export default Credit;
