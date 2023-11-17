import { useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";

interface Props {
  isMultiOption?: boolean;
  isSearchableOptions?: boolean;
  placeholder?: string;
  options?: any;
  onChange?: any;
  defaultValue?: string;
  label?: string;
}

const SelectSearch = ({
  options,
  placeholder,
  isMultiOption,
  isSearchableOptions,
  onChange,
  defaultValue,
  label,
}: Props) => {
  return (
    <>
      <div className="App">
        <Form.Group className="mb-3" controlId="cityName">
          <Form.Label>{label}</Form.Label>
          <Select
            id="mySelect"
            defaultValue={defaultValue}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            isMulti={isMultiOption}
            isSearchable={isMultiOption == true ? isSearchableOptions : false}
          />
        </Form.Group>
      </div>
      {/* <Form.Control {...prop} /> */}
    </>
  );
};

export default SelectSearch;
