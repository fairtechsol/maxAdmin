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
  const { data } = props;
  const { id } = useParams();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [check, setCheck] = useState(false);
  const [selectAll, setSelectAll] = useState(false); // "Select All" checkbox state
  const [updatedMatchLockAllChild, setUpdatedMatchLockAllChild] = useState<
    any[]
  >([]); 
  const dispatch: AppDispatch = useDispatch();
  const { matchLockAllChild } = useSelector(
    (state: RootState) => state.match.placeBets
  );

  useEffect(() => {}, [tableConfig]);


  useEffect(() => {
    if (matchLockAllChild) {
      setUpdatedMatchLockAllChild(
        matchLockAllChild.map((item: any) => ({
          ...item,
          isChecked: false, 
        }))
      );
    }
  }, [matchLockAllChild]);

  useEffect(() => {
    dispatch(getMatchLockAllChild(id));
  }, [check]);

  const columns: Column[] = [
    {
      id: "selectAll",
      label: (
        <div
          className={`custom-checkbox custom-control ${
            selectAll ? "checked" : ""
          }`}
          onClick={() => handleSelectAll(!selectAll)}
        >
          <input
            type="checkbox"
            id={`custom-checkbox-input`}
            checked={selectAll}
            onChange={(e) => {
              setSelectAll(e.target.checked);
            }}
            className="custom-control-input d-none"
          />
          <label
            className="custom-control-label"
            htmlFor={`custom-checkbox-label`}
          >
            {selectAll && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8 8"
                fill="white"
              >
                <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
              </svg>
            )}
          </label>
        </div>
      ),
    },
    { id: "Checked", label: "All Account" },
  ];

  // Function to handle "Select All" logic
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setUpdatedMatchLockAllChild((prevState) =>
      prevState.map((item: any) => ({
        ...item,
        isChecked: checked,
      }))
    );
    setCheck((prev) => !prev); 
  };

  const handleIndividualCheck = (index: number, checked: boolean) => {
    setUpdatedMatchLockAllChild((prevState) =>
      prevState.map((item: any, idx: number) =>
        idx === index ? { ...item, isChecked: checked } : item
      )
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3 w-100">
        <input
          type="text"
          placeholder="Transaction Code"
          className="form-control w-auto"
        />
      </div>
      <CustomTable
        striped
        columns={columns}
        itemCount={updatedMatchLockAllChild.length}
        setTableConfig={setTableConfig}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {updatedMatchLockAllChild.map((item: any, index: number) => {
          const { userName, id, isChecked } = item;
          return (
            <UserLockMarketWise
              key={index}
              index={index}
              userName={userName}
              userId={id}
              lock={isChecked}
              data={data}
              setCheck={setCheck}
              onCheckChange={(checked: boolean) =>
                handleIndividualCheck(index, checked)
              } 
            />
          );
        })}
      </CustomTable>
    </div>
  );
};

export default React.memo(LockUser);
