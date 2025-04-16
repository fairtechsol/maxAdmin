import { memo } from "react";
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
  userId?: string;
  page?: number;
  limit?: number;
  userName?: string;
  sort?: string;
  order?: string;
  activeTab?: string;
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
  userId,
  page,
  limit,
  userName,
  sort,
  order,
  activeTab,
}: ListClientModalsProps) => {
  const { item: ModalComponent } = modalTitle[id];

  return (
    <CustomModal
      customClass="px-2"
      show={show}
      setShow={setShow}
      title={modalTitle?.[id]?.name}
      titleStyle="fw-normal title-22"
    >
      <ModalComponent
        userData={userData}
        setShow={setShow}
        userId={userId}
        page={page}
        limit={limit}
        userName={userName}
        sort={sort}
        order={order}
        activeTab={activeTab}
      />
    </CustomModal>
  );
};

export default memo(ListClientModals);
