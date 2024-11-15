import { Form } from "react-bootstrap";
import CustomErrorMessage from "../input/CustomErrorMessage";
import "./style.scss";

const SelectSearch2 = (props: any) => {
  const {
    //id,
    options,
    value,
    onChange,
    //label,
    customClass,
    filedClass,
    SelectInline,
    onBlur,
    touched,
    errors,
  } = props;

  return (
    <>
      <Form.Group
        className={`customSelect ${SelectInline ? "SelectInline" : ""} ${
          customClass ?? ""
        }`}
      >
        {/* {label && <Form.Label>{label}</Form.Label>} */}
        <div className={`modal-chekbox ${filedClass}`}>
          <div className="custom-radio-group" >
            {options.map((option: any, index: number) => (
              <label className="custom-radio" key={index}>
                <input
                  type="radio"
                  name="customRadio"
                  value={value}
                  onChange={() => onChange(option)}
                  onBlur={onBlur}
                  defaultChecked={option.value === "PENDING"}
                />
                <span className="custom-radio-checkmark"></span>
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <CustomErrorMessage touched={touched} errors={errors} />
      </Form.Group>
    </>
  );
};

export default SelectSearch2;
