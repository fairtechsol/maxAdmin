import { memo, useEffect, useState } from "react";
import { Column, TableConfig } from "../../models/tableInterface";
import CustomTable from "../commonComponent/table";

const HeaderUserDetail = ({ data }: any) => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "username", label: "UserName" },
    { id: "exposure", label: "Exposure" },
    { id: "creditRefrence", label: "Creditref" },
    { id: "exposureLimit", label: "ExpoLimits" },
    { id: "currentBalance", label: "General" },
  ];

  return (
    <CustomTable
      CustomTableClass=""
      striped
      tHeadTheme="bg-transparent text-white"
      columns={columns}
      itemCount={10}
      setTableConfig={setTableConfig}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      {data?.map((item: any, index: number) => (
        <tr key={index}>
          <td>{item?.userName}</td>
          <td>{item?.userBal?.exposure}</td>
          <td>{item?.creditRefrence}</td>
          <td>{item?.exposureLimit}</td>
          <td>{item?.userBal?.currentBalance}</td>
        </tr>
      ))}
    </CustomTable>
  );
};

export default memo(HeaderUserDetail);
