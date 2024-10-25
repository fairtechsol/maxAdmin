import { Form } from "react-bootstrap";
import CustomErrorMessage from "../input/CustomErrorMessage";
import "./style.scss";

const SelectSearch3 = (props: any) => {
  const {
    //id,
    options,
    value,
    onChange,
    //label,
    //customClass,
    //filedClass,
    //SelectInline,
    onBlur,
    touched,
    errors,
  } = props;

  return (
    <>
      <Form.Group>
        {/* {label && <Form.Label>{label}</Form.Label>} */}
        <div>
          <div className="custom-radio-group2">
            {options.map((option: any, index: number) => (
              <label className="custom-radio2" key={index}>
                <input
                  type="radio"
                  name="customRadio2"
                  value={value}
                  onChange={() => onChange(option)}
                  onBlur={onBlur}
                  defaultChecked={option.value === "ALL"}
                />
                <span className="custom-radio-checkmark2"></span>
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

export default SelectSearch3;
