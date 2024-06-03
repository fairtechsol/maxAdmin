import { Modal } from "react-bootstrap";
import "./style.scss";
import { userModalReset } from "../../../store/actions/user/userActions";
import { useDispatch } from "react-redux";

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
  const handleClose =() => {
    setShow(false);
    dispatch(userModalReset());
  };
  return (
    <>
      <Modal
        {...props}
        show={show}
        onHide={handleClose}
        className={`customModal ${customClass}`}
      >
        <Modal.Header
          closeButton
          className={`${headerStyle ? headerStyle : ""}`}
        >
          <Modal.Title className={`${titleStyle}`}>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {footer ? (
          <Modal.Footer className="border-0 mt-3">{footer}</Modal.Footer>
        ) : (
          ""
        )}
      </Modal>
    </>
  );
}

export default CustomModal;
