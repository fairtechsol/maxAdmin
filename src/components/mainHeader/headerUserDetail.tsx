import { useEffect, useState } from "react";
import { Column, TableConfig } from "../../models/tableInterface";
import CustomTable from "../commonComponent/table";

const HeaderUserDetail = ({ data }: any) => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "username", label: "  UserName" },
    { id: "exposure", label: "  Exposer" },
    { id: "creditRefrence", label: "  Creditref" },
    { id: "exposureLimit", label: "  ExpoLimits" },
    { id: "currentBalance", label: "  General" },
  ];

  return (
    <>
      <CustomTable
        CustomTableClass=""
        striped
        tHeadTheme="bg-transparent text-white"
        columns={columns}
        itemCount={10}
        setTableConfig={setTableConfig}
      >
        {data?.map((item: any, index: number) => (
          <tr key={index}>
            <td>{item?.userName} </td>
            <td>{item?.userBal?.exposure} </td>
            <td>{item?.creditRefrence} </td>
            <td>{item?.exposureLimit} </td>
            <td>{item?.userBal?.currentBalance} </td>
          </tr>
        ))}
      </CustomTable>
    </>
  );
};

export default HeaderUserDetail;
