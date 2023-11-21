import { Form } from "react-bootstrap";
import Select from "react-select";
import "./style.scss";
interface Props {
  isMultiOption?: boolean;
  // isSearchableOptions?: boolean;
  placeholder?: string;
  options?: any;
  onChange?: any;
  defaultValue?: string;
  label?: string;
  customClass?: string;
  filedClass?: string;
  SelectInline?: boolean;
}

const SelectSearch = ({
  options,
  placeholder,
  isMultiOption,
  // isSearchableOptions,
  onChange,
  defaultValue,
  label,
  customClass,
  filedClass,
  SelectInline,
}: Props) => {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: "33.10px", // Adjust the height as needed
      height: "33.10px", // Adjust the height as needed
    }),
  };

  return (
    <>
      <Form.Group
        className={`customSelect ${SelectInline ? "SelectInline" : ""} ${
          customClass ?? ""
        }`}
        controlId="cityName"
      >
        {label ? <Form.Label>{label}</Form.Label> : ""}
        <Select
          styles={customStyles}
          id="mySelect"
          className={`selectSearch ${filedClass}`}
          defaultValue={defaultValue}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          isMulti={isMultiOption}
          // isSearchable={isMultiOption === true ? isSearchableOptions : false}
        />
      </Form.Group>
      {/* <Form.Control {...prop} /> */}
    </>
  );
};

export default SelectSearch;
