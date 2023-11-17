import { Stack } from "react-bootstrap";
import CustomInput from "../../../commonComponent/input";

const ExposureLimit = () => {
  return (
    <Stack gap={0}>
      <div className="input-container">
        <p>Old Limit</p>
        <CustomInput
          type="text"
          customClass="input-box"
          disabled={true}
          id="oldLimitInput"
        />
      </div>
      <div className="input-container">
        <p>New Limit</p>
        <CustomInput type="number" customClass="input-box" id="newLimitInput" />
      </div>
      <div className="input-container">
        <p>Transaction password</p>
        <CustomInput
          type="password"
          customClass="input-box"
          id="transactionPasswordInput"
        />
      </div>
    </Stack>
  );
};

export default ExposureLimit;
