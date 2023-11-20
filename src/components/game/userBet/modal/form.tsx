import { Form } from "react-bootstrap";
import SelectSearch from "../../../commonComponent/SelectSearch";
import CustomInput from "../../../commonComponent/input";

const UserBetModalForm = () => {
  return (
    <div className="UserBetModalForm">
      <div className="row">
        <div className="col-lg-4">
          <SelectSearch
            defaultValue="- Select Your A/C. Type -"
            options={[]}
            placeholder="- Select Your A/C. Type -"
            label={"Account Type"}
          />
          <div className="row align-items-center mt-4">
            <div className="col-md-4">
              <Form.Group>IP Address</Form.Group>
            </div>
            <div className="col-md-8">
              <CustomInput
                customStyle=""
                placeholder={"Enter User Password"}
                type={"text"}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default UserBetModalForm;
