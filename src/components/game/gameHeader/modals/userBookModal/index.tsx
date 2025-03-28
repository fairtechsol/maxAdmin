import React, { useEffect, useState } from "react";
import CustomTable from "../../../../../components/commonComponent/table";
import { TableConfig } from "../../../../../models/tableInterface";
const UserBookModal = ({ data }: { data: any }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const columns = [
    { id: "userName", label: "User Name" },
    { id: "TEAMA", label: "TEAM A" },
    { id: "TEAMB", label: "TEAM B" },
  ];
  useEffect(() => {}, [tableConfig]);

  return (
    <div className="userbook">
      <CustomTable
        customClass="userbook"
        columns={columns}
        itemCount={1 || 0}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setTableConfig={setTableConfig}
      >
        <tr>
          <td>DFGDF</td>
          <td>{"userName"}</td>
          <td>{"userName"}</td>
        </tr>
      </CustomTable>
    </div>
  );
};

export default React.memo(UserBookModal);
