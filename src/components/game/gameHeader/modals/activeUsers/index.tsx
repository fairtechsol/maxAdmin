import React, { useEffect, useState } from "react";
import { Column, TableConfig } from "../../../../../models/tableInterface";
import CustomTable from "../../../../commonComponent/table";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import UserRow from "./UserRow";

const ActiveUser = (props: any) => {
  const { type } = props;
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);

  const { matchLockAllChild } = useSelector(
    (state: RootState) => state.match.placeBets
  );
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "sr", label: "S. NO" },
    { id: "userName", label: "  User Name" },
    { id: "Checked", label: "Checked" },
  ];

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
                type={type}
              />
            );
          })}
      </CustomTable>
    </div>
  );
};

export default React.memo(ActiveUser);
