import { useEffect, useState } from "react";
import { Column, TableConfig } from "../../../../models/tableInterface";
import CustomTable from "../../../commonComponent/table";

const TableRunner = () => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    // { id: "sr", label: "sr" },
    { id: "Run", label: "	Run" },
    { id: "Amount", label: "	Amount" },
  ];

  const data: any = [
    {
      run: "115",
      amount: "2541.00",
    },
  ];

  return (
    <div className="activeUsers-modal">
      <CustomTable
        bordered={true}
        // striped
        columns={columns}
        itemCount={10}
        setTableConfig={setTableConfig}
      >
        {data?.map((item: any, index: number) => {
          const { amount, run } = item;
          return (
            <tr key={index}>
              <td>{run}</td>
              <td>{amount}</td>
            </tr>
          );
        })}
      </CustomTable>
    </div>
  );
};

export default TableRunner;
