import { Form } from "react-bootstrap";
import SelectSearch from "../../../commonComponent/SelectSearch";
import CustomInput from "../../../commonComponent/input";

const UserBetModalForm = (props: any) => {
  const amountOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div className={`UserBetModalForm ${props.customClass}`}>
      <div className="row">
        <div className="col-lg-4">
          <div className="row d-flex align-items-center">
            <div className="col-md-3">
              <Form.Label>Enter Code</Form.Label>
            </div>
            <div className="col-md-8">
              <SelectSearch
                defaultValue="- Select Your A/C. Type -"
                options={[]}
                placeholder="- Select Your A/C. Type -"
                // label={"Account Type"}
              />
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col-md-3">
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

        <div className="col-lg-6 offset-lg-2">
          <div className="row d-flex align-items-center">
            <div className="col-md-3">
              <Form.Label>Amount</Form.Label>
            </div>
            <div className="col-md-8">
              <div className="d-flex">
                <CustomInput customStyle="me-2 w-50" type={"text"} />
                <CustomInput customStyle=" w-50" type={"text"} />
              </div>
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col-md-3">
              <Form.Group>IP Address</Form.Group>
            </div>
            <div className="col-md-8">
              <SelectSearch
                defaultValue="- Select Your A/C. Type -"
                options={amountOptions}
                placeholder="All"
                isMultiOption={true}
                // label={"Account Type"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBetModalForm;
