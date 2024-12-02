import React, { ReactNode, useEffect, useState } from "react";
import "./style.scss";
import { MatchType } from "../../../utils/enum";
import { Modal } from "react-bootstrap";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateUserMarketLock } from "../../../store/actions/match/matchAction";
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
}

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
}: props) {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };

  const [showModal1, setShowModal1] = useState(false);
  // const [showModal2, setShowModal2] = useState(false);
  const [updatedMatchLockAllChild, setUpdatedMatchLockAllChild] = useState<
    any[]
  >([]);
  
  const dispatch: AppDispatch = useDispatch();
  const { matchLockAllChild } = useSelector(
    (state: RootState) => state.match.placeBets
  );

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

  const handleButtonClick = () => {
    setShowModal1(true);
  };

  const handleUserBookClick = () => {
    // setShowModal2(true);
  };

  const handleClose1 = () => {
    setShowModal1(false);
  };
const handleLock = (e:any, type:string) => {
  if(e.target.checked){
    let payload = {
      userId: type==="all" ? "" : type,
      matchId:  data.matchId,
      betId: data.id,
      blockType: type === "cricketCasino" ? 2 : type === "session" ? 1 : 0,
      isLock: true,
      sessionType: sessionType,
      operationToAll: type==="all" ? true : false,
    };
    dispatch(
      updateUserMarketLock(payload)
    );
    console.log(payload, "shbad", data);
  }
};
console.log("shbad", data);
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
          className={`customModal ${customClass}`}
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
                />
              </div>
              <div className="w-100 d-flex flex-row">
                <div className="custom-control w-25 d-flex justify-content-start align-items-start">
                  <input
                    className="custom-control-input d-none"
                    type="checkbox"
                    id={`custom-checkbox`}
                    // checked={userLock}
                    onChange={(e) => handleLock(e.target.checked, "all")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={`custom-checkbox`}
                  ></label>
                </div>
                <div className="w-75 d-flex justify-content-start align-items-start f-bold">
                  All Account
                </div>
              </div>
              {updatedMatchLockAllChild?.length > 0 &&
                updatedMatchLockAllChild.map((item: any, index: number) => {
                  const { userName, id, isChecked } = item;
                  return (
                    <div className="w-100 d-flex flex-row">
                      <div className="custom-control w-25 d-flex justify-content-start align-items-start border-top border-bottom">
                        <input
                          className="custom-control-input d-none"
                          type="checkbox"
                          id={`custom-checkbox-${id}`}
                          checked={isChecked}
                          onChange={(e) => handleLock(e.target.checked, id)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`custom-checkbox-${index}`}
                        ></label>
                      </div>
                      <div className="w-75 d-flex justify-content-start align-items-start border-top border-bottom">
                        {userName}
                      </div>
                    </div>
                  );
                })}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default MarketTableHeader;
