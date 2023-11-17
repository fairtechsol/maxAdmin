import SelectSearch from "../../../commonComponent/SelectSearch";
import CustomInput from "../../../commonComponent/input";

const UserBetModalForm = () => {
  return (
    <div className="UserBetModalForm">
      <div className="row">
        <div className="col-lg-4">
          <SelectSearch
            SelectInline={true}
            defaultValue="- Select Your A/C. Type -"
            options={[]}
            placeholder="- Select Your A/C. Type -"
            label={"Account Type"}
          />

          <CustomInput
            customStyle="mt-5"
            title={"User Password"}
            placeholder={"Enter User Password"}
            type={"text"}
            // formInline={true}
            labelCol="lg-4 aa "
            inputCol="lg-6"
          />
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default UserBetModalForm;
