import React, { useEffect, useState } from "react";
import CustomTable from "../../commonComponent/table";
import { TableConfig } from "../../../models/tableInterface";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserWiseExposure,
  resetUserWiseExposureList,
} from "../../../store/actions/user/userActions";
import { formatToINR } from "../../../helpers";

interface Column {
  id: string;
  label: string;
}

const columns: Column[] = [
  { id: "eventType", label: "Event Type" },
  { id: "exposure", label: "Exposure" },
];

const EventWiseExposureModal = ({
  userWiseExposureName,
  setShowUserWiseMatchListModal,
  setDataForMatchList,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { userWiseExposureList } = useSelector(
    (state: RootState) => state.user.userList
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [tableConfig, setTableConfig] = useState<TableConfig | null>({
    page: 1,
    sort: { direction: "ASC", key: null },
    rowPerPage: 10,
    keyword: "",
  });

  useEffect(() => {
    dispatch(getUserWiseExposure(userWiseExposureName?.id));
    return () => {
      dispatch(resetUserWiseExposureList());
    };
  }, []);

  return (
    <>
      <CustomTable
        customClass="commonTable reportTable"
        striped
        columns={columns}
        itemCount={Object.keys(userWiseExposureList).length}
        setTableConfig={setTableConfig}
        tableConfig={tableConfig}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {Object.entries(userWiseExposureList).map(([key, value]: any) => (
          <tr
            key={key}
            onClick={() => {
              if (value?.match) {
                setShowUserWiseMatchListModal(true);
                setDataForMatchList({ eventType: key, value: value?.match });
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <td>{key}</td>
            <td>{formatToINR(value?.exposure) || 0}</td>
          </tr>
        ))}
      </CustomTable>
    </>
  );
};

export default EventWiseExposureModal;
