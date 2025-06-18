import { memo } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  accountListModalReset,
  changePasswordReset,
} from "../../../store/actions/user/userActions";

interface NavigateModalProps {
  transactionMessage: string;
  modalTitle: string;
  buttonMessage: string;
  setShowModal: (val: boolean) => void;
  functionDispatch: () => void;
  navigateTo: string;
}

const NavigateModal = ({
  transactionMessage,
  modalTitle,
  buttonMessage,
  setShowModal,
  functionDispatch,
  navigateTo,
}: NavigateModalProps) => {
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

export default memo(NavigateModal);
