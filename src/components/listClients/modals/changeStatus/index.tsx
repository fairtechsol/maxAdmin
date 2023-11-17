import { useState } from "react";
import { Stack } from "react-bootstrap";
import CustomInput from "../../../commonComponent/input";
import Switch from "../../../commonComponent/switch";

const ChangeStatus = () => {
  const [activeUser, setActiveUser] = useState(false);
  const [activeBet, setActiveBet] = useState(false);

  return (
    <Stack gap={0}>
      <div className="input-container">
        <h1 className="">Account</h1>
        <span>Active</span>
      </div>
      <div className="input-container">
        <Switch
          onSwitchChange={setActiveUser}
          isChecked={activeUser}
          label="User Active"
        />
        <Switch
          onSwitchChange={setActiveBet}
          isChecked={activeBet}
          label="Bet Active"
        />
      </div>
      <div className="input-container">
        <p>Transaction password</p>
        <CustomInput
          type="password"
          customStyle="input-box"
          id="transactionPassword"
        />
      </div>
    </Stack>
  );
};

export default ChangeStatus;
