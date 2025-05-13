import { memo, useEffect, useState } from "react";
import { Column, TableConfig } from "../../models/tableInterface";
import CustomTable from "../commonComponent/table";

const HeaderFancyBook = ({ data }: any) => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "eventName", label: "  EventName" },
    { id: "book", label: "  Book" },
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
          <td>{item?.eventname} </td>
          <td>{item?.totallossamount} </td>
        </tr>
      ))}
    </CustomTable>
  );
};

export default memo(HeaderFancyBook);
