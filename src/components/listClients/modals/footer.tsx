import { FaUndo } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import CustomButton from "../../commonComponent/button";

const ModalFooter = ({ clickHandler }: any) => {
  return (
    <div className="d-flex gap-2">
      <CustomButton
        className="d-flex gap-2 align-items-center"
        variant="secondary"
        onClick={clickHandler}
      >
        <FaUndo />
        Back
      </CustomButton>
      <CustomButton className="d-flex gap-2 align-items-center" type="submit">
        Submit
        <IoMdExit />
      </CustomButton>
    </div>
  );
};

export default ModalFooter;
