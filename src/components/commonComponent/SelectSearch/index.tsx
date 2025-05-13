import { memo } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import CustomErrorMessage from "../input/CustomErrorMessage";
import "./style.scss";

const SelectSearch = ({
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
  inputValue,
  onFocus,
}: any) => {
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
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
            }),

            menu: (provided) => ({
              ...provided,
              maxHeight: "72vh",
              overflowY: "auto",
              fontSize: "14px",
            }),
            menuList: (provided) => ({
              ...provided,
              maxHeight: "72vh",
              fontSize: "14px",
            }),

            dropdownIndicator: (provided, state) => ({
              ...provided,
              color: state.isFocused ? "#00000" : "#00000",
            }),
          }}
          inputValue={inputValue}
          minMenuHeight={100}
          maxMenuHeight={600}
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
          onFocus={onFocus}
        />
        <CustomErrorMessage touched={touched} errors={errors} />
      </Form.Group>
    </>
  );
};

export default memo(SelectSearch);
