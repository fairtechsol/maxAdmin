import { useEffect, useState } from "react";
import { Column, TableConfig } from "../../../../models/tableInterface";
import CustomTable from "../../../commonComponent/table";

const TableRunner = ({ runAmount }: any) => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "Run", label: "	Run" },
    { id: "Amount", label: "	Amount" },
  ];

  return (
    <div className="activeUsers-modal">
      <CustomTable
        bordered={true}
        columns={columns}
        itemCount={10}
        setTableConfig={setTableConfig}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {runAmount?.length === 0 && (
          <tr className="text-center">
            <td colSpan={10}>No Record Found!</td>
          </tr>
        )}
        {runAmount?.length > 0 &&
          runAmount?.map((item: any, index: number) => {
            const { profitLoss, odds } = item;
            return (
              <tr key={index}>
                <td className={+profitLoss >= 0 ? "bg-blue1" : "bg-red1"}>
                  {odds}
                </td>
                <td className={+profitLoss >= 0 ? "bg-blue1" : "bg-red1"}>
                  {profitLoss}
                </td>
              </tr>
            );
          })}
      </CustomTable>
    </div>
  );
};

export default TableRunner;
