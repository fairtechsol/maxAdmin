import { Col, Modal, Row, Stack } from "react-bootstrap";
import CustomInput from "../../../commonComponent/input";
import ModalFooter from "../footer";

const Credit = ({ setShow }: any) => {
  return (
    <>
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
      </Stack>
      <Modal.Footer className="border-0 mt-3">
        <ModalFooter
          clickHandler={() => {
            setShow(false);
          }}
        />
      </Modal.Footer>
    </>
  );
};

export default Credit;
