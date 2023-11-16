import { useState } from "react";
import Select from "react-select";

interface Props {
  isMultiOption?: boolean;
  isSearchableOptions?: boolean;
}
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const SelectSearch = ({ isMultiOption, isSearchableOptions }: Props) => {
  const [value, setValue] = useState<any>(null);

  return (
    <div className="App">
      <Select
        defaultValue={value}
        onChange={setValue}
        options={options}
        placeholder="select"
        isMulti={isMultiOption}
        isSearchable={isMultiOption == true ? isSearchableOptions : false}
      />
    </div>
  );
};

export default SelectSearch;
