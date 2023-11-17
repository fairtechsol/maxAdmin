import { Stack } from "react-bootstrap";
import CustomInput from "../../../commonComponent/input";

const Password = () => {
  return (
    <Stack gap={0}>
      <div className="input-container">
        <p>New Password</p>
        <CustomInput
          type="password"
          customStyle="input-box"
          disabled={true}
          id="newPasswordInput"
        />
      </div>
      <div className="input-container">
        <p>Confirm Password</p>
        <CustomInput
          type="password"
          customStyle="input-box"
          id="confirmPasswordInput"
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

export default Password;
