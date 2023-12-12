import CustomModal from "../../commonComponent/modal";
import ChangeStatus from "./changeStatus";
import Credit from "./credit";
import Deposit from "./deposit";
import ExposureLimit from "./exposureLimit";
import Password from "./password";
import "./style.scss";
import Withdraw from "./withdraw";

interface ListClientModalsProps {
  id: any;
  show: boolean;
  setShow: (value: boolean) => void;
  userData?: any;
}

const modalTitle: any = {
  d: { name: "Deposit", item: (props: any) => <Deposit {...props} /> },
  w: { name: "Withdraw", item: (props: any) => <Withdraw {...props} /> },
  l: {
    name: "Exposure Limit",
    item: (props: any) => <ExposureLimit {...props} />,
  },
  c: { name: "Credit", item: (props: any) => <Credit {...props} /> },
  p: { name: "Password", item: (props: any) => <Password {...props} /> },
  s: {
    name: "Change Status",
    item: (props: any) => <ChangeStatus {...props} />,
  },
};

const ListClientModals = ({
  id,
  show,
  setShow,
  userData,
}: ListClientModalsProps) => {
  const { item: ModalComponent } = modalTitle[id];

  return (
    <CustomModal
      customClass="px-2"
      show={show}
      setShow={setShow}
      title={modalTitle?.[id]?.name}
      titleStyle="fw-normal title-22"
      // footer={
      //   <ModalFooter
      //     clickHandler={() => {
      //       setShow(false);
      //     }}
      //   />
      // }
    >
      <ModalComponent userData={userData} setShow={setShow} />
    </CustomModal>
  );
};

export default ListClientModals;
