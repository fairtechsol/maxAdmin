import { Modal } from "react-bootstrap";
import "./style.scss";
function CustomModal(props: any) {
  return (
    <>
      <Modal
        {...props}
        show={props?.show}
        onHide={() => props?.setShow((prev: any) => !prev)}
        className={`customModal ${props?.customStyle}`}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        {props.footer ? <Modal.Footer>{props.footer}</Modal.Footer> : ""}
      </Modal>
    </>
  );
}

export default CustomModal;
