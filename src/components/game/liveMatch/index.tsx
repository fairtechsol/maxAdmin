import { useState } from "react";
import { Button } from "react-bootstrap";

import BetTableHeader from "../../commonComponent/betTableHeader";
import CustomModal from "../../commonComponent/modal";

function LiveMatch() {
  const [show, setShow] = useState(false);
  return (
    <>
      <BetTableHeader customClass=" f-400" title="Live Match" />
      <div className="gameTable">
        <div className="bg-dark" style={{ height: "100px" }}>
          <p className="text-info text-center pt-4">Live match....</p>
          <Button variant="primary" onClick={() => setShow((prev) => !prev)}>
            Launch demo modal
          </Button>
        </div>

        <CustomModal show={show} setShow={setShow}>
          <h1>Children data</h1>
        </CustomModal>
      </div>
    </>
  );
}

export default LiveMatch;
