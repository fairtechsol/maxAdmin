import { memo } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { userModalReset } from "../../../store/actions/user/userActions";
import "./style.scss";

function CustomModal({
  show,
  setShow,
  customClass,
  title,
  children,
  footer,
  titleStyle,
  headerStyle,
  ...props
}: any) {
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
    dispatch(userModalReset());
  };
  return (
    <Modal
      {...props}
      show={show}
      onHide={handleClose}
      className={`customModal ${customClass}`}
    >
      <Modal.Header closeButton className={`${headerStyle ? headerStyle : ""}`}>
        <Modal.Title className={`${titleStyle}`}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer ? (
        <Modal.Footer className="border-0 mt-3">{footer}</Modal.Footer>
      ) : (
        ""
      )}
    </Modal>
  );
}

export default memo(CustomModal);
