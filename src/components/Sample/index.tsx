import React, { useEffect, useState } from "react";
import { TableConfig } from "../../models/tableInterface";
import CustomTable from "../commonComponent/table";

interface Column {
  id: string;
  label: string;
}

interface DataItem {
  [key: string]: string | number;
}

// Example usage
const columns: Column[] = [
  { id: "name", label: "Name" },
  { id: "age", label: "Age" },
  { id: "city", label: "City" },
];

const data: DataItem[] = [
  { name: "John", age: 25, city: "New York" },
  { name: "Jane", age: 30, city: "San Francisco" },
  { name: "Bob", age: 22, city: "Los Angeles" },
];

const App: React.FC = () => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);

  useEffect(() => {}, [tableConfig]);

  return (
    <CustomTable
      columns={columns}
      isPagination={true}
      isSort={true}
      isSearch={true}
      itemCount={data?.length}
      setTableConfig={setTableConfig}
      enablePdfExcel={true}
    >
      {data.map((item, index) => (
        <tr key={index}>
          {/* Table cells with data */}
          {columns.map((column) => (
            <td key={column.id}>{item[column.id]}</td>
          ))}
        </tr>
      ))}
    </CustomTable>
  );
};

export default App;
