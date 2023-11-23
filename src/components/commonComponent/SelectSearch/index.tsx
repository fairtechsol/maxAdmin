import { Form } from "react-bootstrap";
import Select from "react-select";
import CustomErrorMessage from "../input/CustomErrorMessage";
import "./style.scss";

const SelectSearch = (props: any) => {
  const {
    id,
    options,
    placeholder,
    isMultiOption,
    isSearchable,
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
      height: 40, // Set the height of the control
    }),
    menu: (provided: any) => ({
      ...provided,
      height: 200, // Set the max height of the dropdown menu
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
          isSearchable={isMultiOption === undefined ? false : isSearchable}
        />
        <CustomErrorMessage touched={touched} errors={errors} />
      </Form.Group>
    </>
  );
};

export default SelectSearch;
