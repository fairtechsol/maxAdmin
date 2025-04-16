import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatToINR } from "../../../helpers";
import { TableConfig } from "../../../models/tableInterface";
import CustomTable from "../../commonComponent/table";

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
              if (data?.eventType === "virtual") {
                return;
              }
              if (data?.eventType === "card") {
                navigate(`/admin/casinoDetail/${value?.type}`, {
                  state: {
                    userId: userWiseExposureName?.id,
                    roleName: userWiseExposureName?.roleName,
                  },
                });
              } else if (data?.eventType === "cricket") {
                navigate(`/admin/match_details/${key}`, {
                  state: {
                    submit: true,
                    matchId: key,
                    userId: userWiseExposureName?.id,
                  },
                });
              } else {
                navigate(
                  `/admin/other_match_detail/${data?.eventType}/${key}/44c1a5c9-e1ee-4706-8359-c692f25bdb1f`,
                  {
                    state: {
                      submit: true,
                      matchId: key,
                      userId: userWiseExposureName?.id,
                    },
                  }
                );
              }
            }}
          >
            <td>
              {value?.name}
              {value?.type ? ` (${value?.type})` : ""}
            </td>
            <td>{formatToINR(value?.exposure) || 0}</td>
          </tr>
        ))}
      </CustomTable>
    </>
  );
};

export default memo(EventWiseMatchListModal);
