import { useState } from "react";
import { Dropdown } from "react-bootstrap";

interface Props {
  name: string;
  options: Array<any>;
}

export default function GameHeaderDropdown({ name, options }: Props) {
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => {
    setShow(true);
  };
  const handleMouseLeave = () => {
    setShow(false);
  };

  return (
    <Dropdown
      show={show}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options?.map((option) => (
          <Dropdown.Item onClick={option.handleClick}>
            {option.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
