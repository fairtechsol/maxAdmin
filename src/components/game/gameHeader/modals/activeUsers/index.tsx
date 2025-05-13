import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Column, TableConfig } from "../../../../../models/tableInterface";
import { getMatchLockAllChild } from "../../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../../store/store";
import CustomTable from "../../../../commonComponent/table";
import "./style.scss";
import UserRow from "./UserRow";

const ActiveUser = (props: any) => {
  const { type } = props;
  const { id } = useParams();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [check, setCheck] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { matchLockAllChild } = useSelector(
    (state: RootState) => state.match.placeBets
  );
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "sr", label: "S. NO" },
    { id: "userName", label: "  User Name" },
    { id: "Checked", label: "Checked" },
  ];
  useEffect(() => {
    dispatch(getMatchLockAllChild(id));
  }, [check]);
  return (
    <div className="activeUsers-modal">
      <CustomTable
        striped
        columns={columns}
        itemCount={10}
        setTableConfig={setTableConfig}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {matchLockAllChild &&
          matchLockAllChild?.map((item: any, index: number) => {
            const { userName, id, sessionLock, matchLock } = item;
            return (
              <UserRow
                key={index}
                userName={userName}
                index={index}
                userId={id}
                lock={
                  type === "session"
                    ? sessionLock !== null
                      ? sessionLock
                      : false
                    : matchLock !== null
                    ? matchLock
                    : false
                }
                setCheck={setCheck}
                type={type}
              />
            );
          })}
      </CustomTable>
    </div>
  );
};

export default React.memo(ActiveUser);
