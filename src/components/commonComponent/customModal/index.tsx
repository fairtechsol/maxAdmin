import { Button, Modal } from "react-bootstrap";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  accountListModalReset,
  changePasswordReset,
} from "../../../store/actions/user/userActions";
import { useDispatch } from "react-redux";

const NavigateModal = ({
  transactionMessage,
  modalTitle,
  buttonMessage,
  setShowModal,
  closeBtn,
  functionDispatch,
  navigateTo,
}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Modal
      show={true}
      onHide={() => {
        setShowModal(false);
        dispatch(changePasswordReset());
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton={closeBtn}>
        {closeBtn && (
          <IoCloseCircle
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              color: "#fff",
              fontSize: "28px",
            }}
          />
        )}
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ marginBottom: "20px", color: "#000" }}>
            {transactionMessage
              ? `Your Transaction Password is: ${transactionMessage}`
              : modalTitle}
          </p>
          <Button
            variant="success"
            onClick={() => {
              setShowModal(false);
              functionDispatch();
              dispatch(accountListModalReset());
              navigate(navigateTo);
            }}
          >
            {buttonMessage}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NavigateModal;
