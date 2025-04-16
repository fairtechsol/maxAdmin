import { memo } from "react";
import { Form } from "react-bootstrap";
import CustomErrorMessage from "../input/CustomErrorMessage";
import "./style.scss";

const SelectSearch2 = ({
  options,
  value,
  onChange,
  customClass,
  filedClass,
  SelectInline,
  onBlur,
  touched,
  errors,
}: any) => {
  return (
    <Form.Group
      className={`customSelect ${SelectInline ? "SelectInline" : ""} ${
        customClass ?? ""
      }`}
    >
      <div className={`modal-chekbox ${filedClass}`}>
        <div className="custom-radio-group">
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
              <span className="custom-radio-checkmark" />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <CustomErrorMessage touched={touched} errors={errors} />
    </Form.Group>
  );
};

export default memo(SelectSearch2);
