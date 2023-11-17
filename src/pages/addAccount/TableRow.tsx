import React from "react";

const TableRow = ({ data }: any) => {
  const [column1, column2] = data;

  return (
    <tr>
      <td>{column1}</td>
      {column1 === "Downline" ? (
        <td>
          <input
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "white",
              border: "0px",
            }}
            value={0}
            type="number"
            min={0}
            max={100}
            disabled
          />
        </td>
      ) : (
        <td>{column2}</td>
      )}
    </tr>
  );
};

export default TableRow;
