import { useState } from "react";
import { Dropdown } from "react-bootstrap";

import CustomModal from "../../commonComponent/modal";

interface Props {
  name: string;
  options: Array<any>;
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
          {options?.map((option, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => {
                if (option?.name !== "All Deactivate") {
                  setShowChildren(option?.children);
                  setShowModal(true);
                } else alert("abcdf");
              }}
            >
              {option.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <CustomModal
        show={showModal}
        setShow={setShowModal}
        title="View More Bet"
      >
        {showChildren}
      </CustomModal>
    </>
  );
}
