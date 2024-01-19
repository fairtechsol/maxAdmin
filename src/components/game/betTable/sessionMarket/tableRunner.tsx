import { useEffect, useState } from "react";
import { Column, TableConfig } from "../../../../models/tableInterface";
import CustomTable from "../../../commonComponent/table";

const TableRunner = ({ runAmount }: any) => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "Run", label: "	Run" },
    { id: "Amount", label: "	Amount" },
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
        {runAmount.length === 0 && (
          <tr className="text-center">No Record Found!</tr>
        )}
        {runAmount.length > 0 &&
          runAmount?.map((item: any, index: number) => {
            const { profitLoss, odds } = item;
            return (
              <tr key={index}>
                <td className="bg-red1">{odds}</td>
                <td className="bg-red1">{profitLoss}</td>
              </tr>
            );
          })}
      </CustomTable>
    </div>
  );
};

export default TableRunner;
