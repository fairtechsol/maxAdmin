import { useEffect, useState } from "react";
import CustomTable from "../commonComponent/table";
import { Column, TableConfig } from "../../models/tableInterface";

const HeaderFancyBook = ({ data }: any) => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "eventName", label: "  EventName" },
    { id: "book", label: "  Book" },
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
            <td>{item?.eventname} </td>
            <td>{item?.totallossamount} </td>
          </tr>
        ))}
      </CustomTable>
    </>
  );
};

export default HeaderFancyBook;
