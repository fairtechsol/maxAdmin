import CustomModal from "../../commonComponent/modal";
import ChangeStatus from "./changeStatus";
import Credit from "./credit";
import Deposit from "./deposit";
import ExposureLimit from "./exposureLimit";
import ModalFooter from "./footer";
import Password from "./password";
import "./style.scss";
import Withdraw from "./withdraw";

interface ListClientModalsProps {
  id: any;
  show: boolean;
  setShow: (value: boolean) => void;
}

const modalTitle: any = {
  d: { name: "Deposit", item: <Deposit /> },
  w: { name: "Withdraw", item: <Withdraw /> },
  l: { name: "Exposure Limit", item: <ExposureLimit /> },
  c: { name: "Credit", item: <Credit /> },
  p: { name: "Password", item: <Password /> },
  s: { name: "Change Status", item: <ChangeStatus /> },
};

const ListClientModals = ({ id, show, setShow }: ListClientModalsProps) => {
  return (
    <CustomModal
      customClass="px-2"
      show={show}
      setShow={setShow}
      title={modalTitle?.[id]?.name}
      titleStyle="fw-normal title-22"
      footer={
        <ModalFooter
          clickHandler={() => {
            setShow(false);
          }}
        />
      }
    >
      {modalTitle?.[id]?.item}
    </CustomModal>
  );
};

export default ListClientModals;
