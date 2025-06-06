import { debounce } from "lodash";
import React, { useMemo, useState } from "react";
import CustomInput from "../../input";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  value: string;
  placeHolder?:any;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch,placeHolder }) => {
  const [keyword, setKeyword] = useState("");

  const debouncedInputValue = useMemo(() => {
    return debounce((value:any) => {
      onSearch(value);
    }, 500);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setKeyword(query);
    debouncedInputValue(query);
  };

  return (
    <CustomInput
      title="Search:"
      value={keyword}
      type="text"
      onChange={handleSearchChange}
      placeholder={placeHolder ?? "Type your search"}
      inputClass={`${ "p-1"}`}
      customStyle={`${
         "flex-row align-items-center"
      } `}
      isUnderlinedInput={false}
    />
  );
};

export default SearchBox;
