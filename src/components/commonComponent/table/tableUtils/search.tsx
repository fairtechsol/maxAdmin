import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  value: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const debouncedInputValue = useMemo(
    () =>
      debounce((query: string) => {
        onSearch(query);
      }, 500),
    [onSearch]
  );

  const handleButtonClick = () => {
    debouncedInputValue(keyword); // Trigger search with the current keyword
  };

  const handleReset = () => {
    setKeyword(""); // Clear the input field
    onSearch(""); // Trigger search with an empty query
  };

  useEffect(() => {
    if (value === "") {
      setKeyword(""); // Sync with external value prop
    }
  }, [value]);

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
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setKeyword(e.currentTarget.value)
          } // Directly update state without onChange
        />
      </InputGroup>
      <Button className="float-end ms-2" onClick={handleButtonClick}>
        Load
      </Button>
      <Button
        className="float-end ms-2"
        style={{ backgroundColor: "#74788d", border: "0" }}
        onClick={handleReset}
      >
        Reset
      </Button>
    </Form.Group>
  );
};

export default SearchBox;
