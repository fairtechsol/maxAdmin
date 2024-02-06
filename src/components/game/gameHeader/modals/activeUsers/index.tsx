import React, { useEffect, useState } from "react";
import { Column, TableConfig } from "../../../../../models/tableInterface";
import CustomTable from "../../../../commonComponent/table";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import UserRow from "./UserRow";
import { getMatchLockAllChild } from "../../../../../store/actions/match/matchAction";
import { useParams } from "react-router-dom";

const ActiveUser = (props: any) => {
  const { type } = props;
  const { id } = useParams();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
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
