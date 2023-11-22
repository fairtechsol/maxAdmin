import { Form } from "react-bootstrap";
import Select from "react-select";
import "./style.scss";
import CustomErrorMessage from "../input/CustomErrorMessage";

const SelectSearch = (props: any) => {
  const {
    id,
    options,
    placeholder,
    isMultiOption,
    onChange,
    value,
    defaultValue,
    label,
    customClass,
    filedClass,
    SelectInline,
    onBlur,
    touched,
    errors,
  } = props;

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: "33.10px",
      height: "33.10px",
    }),
  };

  return (
    <>
      <Form.Group
        className={`customSelect ${SelectInline ? "SelectInline" : ""} ${
          customClass ?? ""
        }`}
      >
        {label ? <Form.Label>{label}</Form.Label> : ""}
        <Select
          id={id}
          styles={customStyles}
          className={`selectSearch ${filedClass}`}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          options={options}
          placeholder={placeholder}
          isMulti={isMultiOption}
        />
        <CustomErrorMessage touched={touched} errors={errors} />
      </Form.Group>
    </>
  );
};

export default SelectSearch;
