import React, { useState } from "react";
import CustomTable from "../../commonComponent/table";
import { TableConfig } from "../../../models/tableInterface";
import { formatToINR } from "../../../helpers";
import { useNavigate } from "react-router-dom";

interface Column {
  id: string;
  label: string;
}

const columns: Column[] = [
  { id: "eventType", label: "Event Type" },
  { id: "exposure", label: "Exposure" },
];

const EventWiseMatchListModal = ({ userWiseExposureName, data }: any) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [tableConfig, setTableConfig] = useState<TableConfig | null>({
    page: 1,
    sort: { direction: "ASC", key: null },
    rowPerPage: 10,
    keyword: "",
  });

  return (
    <>
      <CustomTable
        customClass="commonTable reportTable"
        striped
        columns={columns}
        itemCount={Object.keys(data?.value).length}
        setTableConfig={setTableConfig}
        tableConfig={tableConfig}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {Object.entries(data?.value).map(([key, value]: any) => (
          <tr
            style={{ cursor: "pointer" }}
            key={key}
            onClick={() => {
              if (data?.eventType === "card") {
                navigate(`/admin/casinoDetail/${value?.type}`, {
                  state: {
                    userId: userWiseExposureName?.id,
                    roleName: userWiseExposureName?.roleName,
                  },
                });
              } else {
                navigate(`/admin/market-analysis`, {
                  state: {
                    submit: true,
                    matchId: key,
                    userId: userWiseExposureName?.id,
                  },
                });
              }
            }}
          >
            <td>{value?.name}</td>
            <td>{formatToINR(value?.exposure) || 0}</td>
          </tr>
        ))}
      </CustomTable>
    </>
  );
};

export default EventWiseMatchListModal;
