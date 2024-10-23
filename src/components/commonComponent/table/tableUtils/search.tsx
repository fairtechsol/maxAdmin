import { debounce } from "lodash";
import React, { useEffect, useState,useMemo } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  value: string;
  load?:boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onSearch,load }:any) => {
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
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setKeyword(query);
    debouncedInputValue(query);
  };
  return (
    <Form.Group
      controlId="searchBox"
      className="tableSearchBox mb-3 d-flex align-items-center mr-4"
      style={{marginRight:"20px"}}
    >
      <Form.Label className="mb-0">Search:</Form.Label>
      <InputGroup>
      {load ? <FormControl
          value={keyword}
          type="text"
          placeholder=""
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setKeyword(e.currentTarget.value)
          } // Directly update state without onChange
        /> : 
        <FormControl
          value={keyword}
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
        />}
        {/* <FormControl
          value={keyword}
          type="text"
          placeholder=""
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setKeyword(e.currentTarget.value)
          } // Directly update state without onChange
        /> */}
      </InputGroup>
      {/* <Button className="float-end ms-2" onClick={handleButtonClick}>
        Load
      </Button>
      <Button
        className="float-end ms-2"
        style={{ backgroundColor: "#74788d", border: "0" }}
        onClick={handleReset}
      >
        Reset
      </Button> */}
    </Form.Group>
  );
};

export default SearchBox;
