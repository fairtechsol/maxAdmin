import React, { ReactNode, useEffect, useState } from "react";
import "./style.scss";
import { MatchType } from "../../../utils/enum";
import { Modal } from "react-bootstrap";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getMarketLockAllChild,
  getMarketLockChildReset,
  getMarketUserBook,
  updateUserMarketLock,
} from "../../../store/actions/match/matchAction";
import { TableConfig } from "../../../models/tableInterface";
import CustomTable from "../../../components/commonComponent/table";
import { toast } from "react-toastify";
// import { RxCrossCircled } from "react-icons/rx";
// import { IoCloseCircleOutline } from "react-icons/io5";
import { AiOutlineCloseCircle } from "react-icons/ai";
interface props {
  bgColor?: string;
  title: string;
  padding?: string | number;
  style?: React.CSSProperties;
  customClass?: string;
  children?: ReactNode;
  type: string;
  data?: any;
  sessionType?: string;
  detail?: any;
}
const set1 = [
  "matchOdd",
  "bookmaker",
  "bookmaker2",
  "quickbookmaker1",
  "quickbookmaker2",
  "quickbookmaker3",
];
const set2 = ["tiedMatch1", "tiedMatch2", "tiedMatch3"];
const set3 = ["completeMatch", "completeMatch1", "completeManual"];
function MarketTableHeader({
  title,
  bgColor,
  padding,
  style,
  customClass,
  children,
  type,
  data,
  sessionType,
  detail,
}: props) {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  const toastOptions: any = {
    icon: <AiOutlineCloseCircle size={40} color={"#f27474"} />,
    style: { backgroundColor: "#ffc742", color: "#fff" },
  };
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [transactionPass, setTransactionPass] = useState<any>();
  const [allLock, setAllLock] = useState();
  const [updatedMatchLockAllChild, setUpdatedMatchLockAllChild] = useState<
    any[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [chekbox, setChekbox] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const mappedNats = data?.runners?.map((runner: any) => ({
    id: runner.nat.toLowerCase().replace(/\s+/g, ""),
    label: runner.nat,
  }));

  let columns = [
    { id: "userName", label: "User Name" },
    //{ id: detail?.teamA, label: detail?.teamA },
    { id: detail?.teamB, label: detail?.teamB },
    ...(detail?.teamC ? [{ id: detail.teamC, label: detail.teamC }] : []),
    ...(mappedNats ? mappedNats : []),
  ];

  const dispatch: AppDispatch = useDispatch();
  const {
    marketLockAllChild,
    userMatchBook,
    userMatchLockSuccess,
    userMatchLockError,
  } = useSelector((state: RootState) => state.match.placeBets);
  useEffect(() => {}, [tableConfig]);
  useEffect(() => {
    if (marketLockAllChild) {
      setAllLock(marketLockAllChild.every((item: any) => item.isLock === true));
      setUpdatedMatchLockAllChild(
        marketLockAllChild.map((item: any) => ({
          ...item,
          isChecked: false,
        }))
      );
    }
  }, [marketLockAllChild]);

  const handleButtonClick = () => {
    dispatch(
      getMarketLockAllChild({
        matchId: detail?.id,
        betId: data?.id,
        sessionType: type,
      })
    );
    setShowModal1(true);
  };

  useEffect(() => {
    setChekbox(false);
    if (userMatchLockSuccess) {
      setUpdatedMatchLockAllChild((prevUserData: any) => {
        if (selected?.count === "all") {
          setAllLock(selected?.lock);
          return prevUserData.map((user: any) => ({
            ...user,
            isLock: selected?.lock,
          }));
        } else {
          return prevUserData.map((user: any) =>
            user?.id === selected?.count
              ? { ...user, isLock: selected?.lock }
              : user
          );
        }
      });
    }
  }, [userMatchLockSuccess, userMatchLockError]);

  const handleUserBookClick = () => {
    if (set1.some((item) => data?.type.includes(item))) {
      dispatch(
        getMarketUserBook({
          id: detail?.id,
          type: "quickbookmaker1",
          betId: [
            detail?.quickBookmaker?.[0]?.id,
            detail?.matchOdd?.id ?? "",
            detail?.bookmaker?.id ?? "",
            detail?.bookmaker2?.id ?? "",
            detail?.quickBookmaker?.[1]?.id ?? "",
            detail?.quickBookmaker?.[2]?.id ?? "",
          ]
            .filter((id) => id)
            .map((id) => id?.trim?.())
            .join(","),
        })
      );
    } else if (set2.some((item) => data?.type.includes(item))) {
      dispatch(
        getMarketUserBook({
          id: detail?.id,
          type: "tiedMatch2",
          betId: [
            detail?.manualTiedMatch?.id ?? "",
            detail?.apiTideMatch2?.id ?? "",
            detail?.apiTideMatch?.id ?? "",
          ]
            .filter((id) => id)
            .map((id) => id?.trim?.())
            .join(","),
        })
      );
    } else if (set3.some((item) => data?.type.includes(item))) {
      dispatch(
        getMarketUserBook({
          id: detail?.id,
          type: "completeManual",
          betId: [
            detail?.manualCompleteMatch?.id ?? "",
            detail?.marketCompleteMatch1?.id ?? "",
            detail?.marketCompleteMatch?.id ?? "",
          ]
            .filter((id) => id)
            .map((id) => id?.trim?.())
            .join(","),
        })
      );
    } else {
      dispatch(
        getMarketUserBook({ id: detail?.id, type: data?.type, betId: data?.id })
      );
    }
    setShowModal2(true);
  };
  const handleClose1 = () => {
    setShowModal1(false);
    dispatch(getMarketLockChildReset());
    setTransactionPass("");
  };
  const handleClose2 = () => {
    setShowModal2(false);
  };
  const handleLock = (count: string, lock: boolean) => {
    if (
      transactionPass?.length === 0 ||
      transactionPass?.length === undefined
    ) {
      toast.warn("transaction code is required!", toastOptions);
      return false;
    }
    setChekbox(true);
    setSelected({ count, lock });
    let payload = {
      userId: count === "all" ? null : count,
      matchId: detail.id,
      betId: data.id,
      blockType: type === "cricketCasino" ? 2 : type === "matchOdds" ? 0 : 1,
      isLock: lock,
      sessionType: type !== "matchOdds" ? type : null,
      operationToAll: count === "all" ? true : false,
      transactionPassword: transactionPass,
    };
    dispatch(updateUserMarketLock(payload));
    // setTimeout(() => {
    //   dispatch(
    //     getMarketLockAllChild({
    //       matchId: detail?.id,
    //       betId: data?.id,
    //       sessionType: type,
    //     })
    //   );
    // }, 1000);
  };

  
 
  return (
    <>
      <div
        className={`tableHeader text-white d-flex f600 bg-${
          bgColor ? bgColor : "secondaryLight"
        } ${padding ? padding : "px-2"} ${customClass ?? ""}
      `}
        style={{ ...inlineStyle }}
      >
        <span className="title-14  text-white">{title}</span>
        {children}
        {type === MatchType.MATCH_ODDS ? (
          <div className="float-right">
            <button onClick={handleButtonClick} className="btn btn-back">
              Bet Lock
            </button>
            <button className="btn btn-back" onClick={handleUserBookClick}>
              User Book
            </button>
          </div>
        ) : (
          <div className="float-right">
            <button className="btn btn-back" onClick={handleButtonClick}>
              Bet Lock
            </button>
          </div>
        )}

        <Modal
          // {...props}
          show={showModal1}
          onHide={handleClose1}
          className={`customModal ${customClass} `}
        >
          <Modal.Header
            closeButton
            // className={`${headerStyle ? headerStyle : ""}`}
          >
            <Modal.Title className={`${"Betlock"}`}>{"Betlock"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="w-100 d-flex flex-column">
              <div className="d-flex justify-content-end mb-3 w-100">
                <input
                  type="text"
                  placeholder="Transaction Code"
                  className="form-control w-auto"
                  value={transactionPass}
                  onChange={(e) => setTransactionPass(e.target.value)}
                />
              </div>
              <div
                className="w-100 d-flex flex-row"
                style={{ border: "1px solid #eee" }}
              >
                <div className="custom-control w-25 d-flex justify-content-start align-items-start">
                  <input
                    className="custom-control-input d-none"
                    type="checkbox"
                    id={`custom-checkbox`}
                    checked={allLock}
                    disabled={chekbox}
                    onChange={(e) => handleLock("all", !allLock)}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={`custom-checkbox`}
                  ></label>
                </div>
                <div
                  className="w-75 d-flex justify-content-start align-items-start f-bold ps-1"
                  style={{ borderLeft: "1px solid #eee" }}
                >
                  All Account
                </div>
              </div>
              {updatedMatchLockAllChild?.length > 0 &&
                updatedMatchLockAllChild.map((item: any, index: number) => {
                  const { userName, id, isLock } = item;
                  return (
                    <div
                      className="w-100 d-flex flex-row"
                      style={{ border: "1px solid #eee" }}
                    >
                      <div className="custom-control w-25 d-flex justify-content-start align-items-start ">
                        <input
                          className="custom-control-input d-none"
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          checked={isLock}
                          disabled={chekbox}
                          onChange={(e) => handleLock(id, !isLock)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`custom-checkbox-${index}`}
                        ></label>
                      </div>
                      <div
                        className="w-75 d-flex"
                        style={{ borderLeft: "1px solid #eee" }}
                      >
                        {userName}
                      </div>
                    </div>
                  );
                })}
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          // {...props}
          show={showModal2}
          onHide={handleClose2}
          className={`customModal ${customClass} custom-modal-width`}
        >
          <Modal.Header
            closeButton
            // className={`${headerStyle ? headerStyle : ""}`}
          >
            <Modal.Title className={`${"Betlock"}`}>{"User Book"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="w-100 d-flex flex-column">
              <div>
                <CustomTable
                  className=""
                  striped
                  columns={columns}
                  itemCount={userMatchBook?.length || 0}
                  // data={rows || []}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  setTableConfig={setTableConfig}
                >
                  {userMatchBook?.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{item?.user?.userName}</td>
                      {item?.profitLoss &&
                        Object.entries(item?.profitLoss)?.map(
                          ([_, val]: any, index: number) =>
                            val !== "0" &&
                            val !== null && <td key={index}>{val}</td>
                        )}
                    </tr>
                  ))}
                </CustomTable>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default MarketTableHeader;
