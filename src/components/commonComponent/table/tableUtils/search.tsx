import { debounce } from "lodash";
import React, { useMemo, useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
/***** */
interface SearchBoxProps {
  onSearch: (query: string) => void;
  value: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const debouncedInputValue = useMemo(() => {
    return debounce((value:any) => {
      onSearch(value);
    }, 500);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearch(query);
    setKeyword(query);
    debouncedInputValue(query);
  };

  return (
    <Form.Group
      controlId="searchBox"
      className="tableSearchBox mb-3 d-flex align-items-center"
    >
      <Form.Label className="mb-0">Search:</Form.Label>
      <InputGroup>
        <FormControl
          value={keyword}
          type="text"
          placeholder=""
          onChange={handleSearchChange}
        />
      </InputGroup>
    </Form.Group>
  );
};

export default SearchBox;
