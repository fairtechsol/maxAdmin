import { useEffect, useState } from "react";
import { Column, TableConfig } from "../../models/tableInterface";
import CustomTable from "../commonComponent/table";

const HeaderGameBook = ({ data }: any) => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "eventType", label: "GameType" },
    { id: "eventName", label: "EventName" },
    { id: "bookA", label: "BookA" },
    { id: "nationA", label: "NationA" },
    { id: "bookB", label: "BookB" },
    { id: "nationB", label: "NationB" },
    { id: "bookC", label: "BookC" },
    { id: "nationC", label: "NationC" },
    { id: "noOfBet", label: "NoOfBet" },
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
            <td>{item?.eventName} </td>
            <td>{item?.book} </td>
            <td>{item?.eventName} </td>
            <td>{item?.book} </td>
            <td>{item?.eventName} </td>
            <td>{item?.book} </td>
            <td>{item?.eventName} </td>
            <td>{item?.book} </td>
            <td>{item?.book} </td>
          </tr>
        ))}
      </CustomTable>
    </>
  );
};

export default HeaderGameBook;
