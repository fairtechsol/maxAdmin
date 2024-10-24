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
    onInputChange,
    isOptionDisabled,
    inputValue
  } = props;

  // const customStyles = {
  //   control: (provided: any, state: any) => ({
  //     ...provided,
  //     minHeight: "30px", // Adjust the minHeight to your desired height
  //   }),
  //   menu: (provided: any, state: any) => ({
  //     ...provided,
  //     paddingTop: 0,
  //     paddingBottom: 0,
  //   }),
  // };

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
          // styles={customStyles}
          // styles={{ minHeight: '20px' }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              // borderColor: state.isFocused ? "grey" : "red",
              // minHeight: 20,
              // maxHeight: "20px",
            }),
            dropdownIndicator: (provided, state) => ({
              ...provided,
              color: state.isFocused ? "#00000" : "#00000",
            }),
          }}
          inputValue={inputValue}
          minMenuHeight={20}
          maxMenuHeight={700}
          className={`selectSearch ${filedClass}`}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onInputChange={onInputChange}
          onBlur={onBlur}
          options={options}
          placeholder={placeholder}
          isMulti={isMultiOption}
          isSearchable={isMultiOption === undefined ? false : isSearchable}
          isOptionDisabled={isOptionDisabled}
        />
        <CustomErrorMessage touched={touched} errors={errors} />
      </Form.Group>
    </>
  );
};

export default SelectSearch;
