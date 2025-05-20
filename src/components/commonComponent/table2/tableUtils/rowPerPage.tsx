import React, { memo } from "react";
import CustomInput from "../../input";

interface RowPerPageProps {
  value: number;
  onChange: (value: number) => void;
}

const RowPerPage: React.FC<RowPerPageProps> = ({ value, onChange }) => {
  const options = [
    {
      name: "10",
      value: 10,
    },
    {
      name: "20",
      value: 20,
    },
    {
      name: "30",
      value: 30,
    },
    {
      name: "40",
      value: 40,
    },
  ];

  return (
    <div className="d-flex align-items-center gap-2">
      <label>Show</label>
      <CustomInput
        type="select"
        value={value}
        onChange={(e: any) => onChange(Number(e.target.value))}
        customStyle="d-flex"
        options={options}
        isUnderlinedInput={false}
        inputClass="py-1"
      />
      <label>Entries</label>
    </div>
  );
};

export default memo(RowPerPage);
