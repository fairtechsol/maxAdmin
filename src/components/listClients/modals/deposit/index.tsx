import { Stack } from "react-bootstrap";
import CustomInput from "../../../commonComponent/input";

const Deposit = () => {
  return (
    <Stack gap={0}>
      <div className="input-container">
        <p>fmstr1</p>
        <div className="d-flex gap-2 input-inner-container">
          <CustomInput
            type="text"
            customClass="input-box"
            disabled={true}
            value={2}
            id="fmstr1Input1"
          />
          <CustomInput
            customClass="input-box"
            type="text"
            disabled={true}
            value={2}
            id="fmstr1Input2"
          />
        </div>
      </div>
      <div className="input-container">
        <p>Account</p>
        <div className="d-flex gap-2 input-inner-container">
          <CustomInput
            type="text"
            customClass="input-box"
            disabled={true}
            value={2}
            id="accountInput1"
          />
          <CustomInput
            customClass="input-box"
            type="text"
            disabled={true}
            value={2}
            id="accountInput2"
          />
        </div>
      </div>
      <div className="input-container">
        <p>Amount</p>
        <CustomInput type="number" customClass="input-box" id="amountInput" />
      </div>
      <div className="input-container">
        <p>Remark</p>
        <CustomInput
          type="textarea"
          as="textarea"
          rows={4}
          customClass="input-box"
          id="remarkInput"
        />
      </div>
      <div className="input-container">
        <p>Transition password</p>
        <CustomInput
          type="password"
          customClass="input-box"
          id="passwordInput"
        />
      </div>
    </Stack>
  );
};

export default Deposit;
