import React, { memo } from "react";
import { Form } from "react-bootstrap";

interface RowPerPageProps {
  value: number;
  onChange: (value: number) => void;
}

const RowPerPage: React.FC<RowPerPageProps> = ({ value, onChange }) => {
  const options = [25, 50, 100, 250, 500, 750, 1000];

  return (
    <Form.Group controlId="itemsPerPage" className="mb-3">
      <label>Show</label>
      <select
        className="rowPerPageSelect mx-2"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label>entries</label>
    </Form.Group>
  );
};

export default memo(RowPerPage);
