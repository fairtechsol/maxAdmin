import { Stack } from "react-bootstrap";
import CustomInput from "../../../commonComponent/input";

const Credit = () => {
  return (
    <Stack gap={0}>
      <div className="input-container">
        <p>Old Credit</p>
        <CustomInput
          type="text"
          customStyle="input-box"
          disabled={true}
          id="oldCreditInput"
        />
      </div>
      <div className="input-container">
        <p>New Credit</p>
        <CustomInput
          type="number"
          customStyle="input-box"
          id="newCreditInput"
        />
      </div>
      <div className="input-container">
        <p>Transaction password</p>
        <CustomInput
          type="password"
          customStyle="input-box"
          id="transactionPasswordInput"
        />
      </div>
    </Stack>
  );
};

export default Credit;
