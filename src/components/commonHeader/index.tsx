import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import "./style.css";
const CommonHeader = () => {
  const [betLockBtn, setBetLockBtn] = useState(false);
  const [fancyLockBtn, setFancyLockBtn] = useState(false);

  const betLockMouseEnter = () => {
    setBetLockBtn(true);
  };
  const betLockMouseLeave = () => {
    setBetLockBtn(false);
  };
  const fancyLockMouseEnter = () => {
    setFancyLockBtn(true);
  };
  const fancyLockMouseLeave = () => {
    setFancyLockBtn(false);
  };

  const headerStyle = {
    gap: 20,
  };
  return (
    <div className="common-header">
      <div
        className="common-headerBox d-flex justify-content-end"
        style={headerStyle}
      >
        <Dropdown
          show={betLockBtn}
          onMouseEnter={betLockMouseEnter}
          onMouseLeave={betLockMouseLeave}
        >
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Bet Lock
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">All Actives</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Otherwise</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          show={fancyLockBtn}
          onMouseEnter={fancyLockMouseEnter}
          onMouseLeave={fancyLockMouseLeave}
        >
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Bet Lock
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">All Deactives</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Otherwise</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="secondary" type="submit">
          User Book
        </Button>
        <Button variant="secondary" type="submit">
          Bookmarkers Book
        </Button>
      </div>
    </div>
  );
};

export default CommonHeader;
