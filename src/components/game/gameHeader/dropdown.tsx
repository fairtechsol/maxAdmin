import { useState } from "react";
import { Dropdown } from "react-bootstrap";

import CustomModal from "../../commonComponent/modal";

interface Props {
  name: string;
  options: any;
}

export default function GameHeaderDropdown({ name, options }: Props) {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChildren, setShowChildren] = useState(null);

  const handleMouseEnter = () => {
    setShow(true);
  };
  const handleMouseLeave = () => {
    setShow(false);
  };

  return (
    <>
      <Dropdown
        show={show}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options?.map((option: any, index: number) => (
            <Dropdown.Item
              key={index}
              onClick={() => {
                if (option?.name !== "All Deactive") {
                  setShowChildren(option?.children);
                  option?.clickHandle();
                  setShowModal(true);
                } else option?.clickHandle();
              }}
            >
              {option.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <CustomModal show={showModal} setShow={setShowModal} title="Active User">
        {showChildren}
      </CustomModal>
    </>
  );
}
