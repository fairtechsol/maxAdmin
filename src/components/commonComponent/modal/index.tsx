import { Modal } from "react-bootstrap";

function CustomModal(props: any) {
  return (
    <>
      <Modal
        className={props.customClass}
        {...props}
        show={props?.show}
        onHide={() => props?.setShow((prev: any) => !prev)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        {props.footer ?? <Modal.Footer>{props.footer}</Modal.Footer>}
      </Modal>
    </>
  );
}

export default CustomModal;
