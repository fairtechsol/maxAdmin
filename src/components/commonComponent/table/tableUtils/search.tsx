import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  value: string;
  load?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onSearch,
  load,
}: any) => {
  const [keyword, setKeyword] = useState("");

  const debouncedInputValue = useMemo(
    () =>
      debounce((query: string) => {
        onSearch(query);
      }, 500),
    [onSearch]
  );

  useEffect(() => {
    if (value === "") {
      setKeyword("");
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
      className="tableSearchBox mb-3 mt-2 d-flex align-items-center mr-4"
    >
      <Form.Label className="mb-0 me-2">Search:</Form.Label>
      <InputGroup>
        {load ? (
          <FormControl
            value={keyword}
            type="text"
            placeholder=""
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setKeyword(e.currentTarget.value)
            }
          />
        ) : (
          <FormControl
            value={keyword}
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
          />
        )}
      </InputGroup>
    </Form.Group>
  );
};

export default SearchBox;
