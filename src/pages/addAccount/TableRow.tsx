const TableRow = ({ data }: any) => {
  const [column1, column2] = data;

  return (
    <tr>
      <td className="w-25">{column1}</td>
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
          />
        </td>
      ) : (
        <td>{column2}</td>
      )}
    </tr>
  );
};

export default TableRow;
