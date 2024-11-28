import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Column, TableConfig } from "../../../../models/tableInterface";
import { AppDispatch, RootState } from "../../../../store/store";
import { getMatchLockAllChild } from "../../../../store/actions/match/matchAction";
import CustomTable from "../../../../components/commonComponent/table";
import UserLockMarketWise from "./UserLockMarketWise";
const LockUser = (props: any) => {
  const { type, data } = props;
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
              <UserLockMarketWise
                data={data}
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

export default React.memo(LockUser);
