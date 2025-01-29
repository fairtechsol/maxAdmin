import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateMaxLoss, formatNumber, handleSize } from "../../../helpers";
import {
  getRunAmount,
  getRunAmountMeter,
  resetRunAmount,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import { sessionBettingType } from "../../../utils/Constants";
import isMobile from "../../../utils/screenDimension";
import MarketTableHeader from "../../commonComponent/MarketWiseHeader";
import CustomModal from "../../commonComponent/modal";
import TableRunner from "../betTable/sessionMarket/tableRunner";
import "./style.scss";

const SessionNormal = ({ title, data, detail, manual, mtype }: any) => {
  const [marketArr, setMarketArr] = useState(data?.section || []);
  const [runnerModalShow, setRunnerModalShow] = useState(false);
  const { marketAnalysisDetail } = useSelector(
    (state: RootState) => state.match.marketAnalysis
  );
  const { runAmount } = useSelector(
    (state: RootState) => state.match.placeBets
  );
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const newMarketArr = [...(data?.section || []), ...(manual || [])];
    setMarketArr(newMarketArr);
  }, [data, manual]);

  const handlePrice = (rate: any) => {
    if (rate && rate != 0) {
      return rate;
    } else {
      return "-";
    }
  };
  const handleStatus = (activeStatus: any, gStaus: any, status: any) => {
    if (activeStatus === "live") {
      if (
        gStaus != undefined &&
        (gStaus === "" || gStaus === "OPEN" || gStaus === "open")
      ) {
        return false;
      } else if (status === "active") {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  return (
    <>
      <div
        className="sessionNormalContainer"
        style={{ marginTop: isMobile ? "" : "10px" }}
      >
        <MarketTableHeader
          title={title}
          type={mtype}
          data={data}
          detail={detail}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div className="sessionYesNoBoxContainer">
              <div
                className="sessionYesNoBox rateBoxWidthNormal"
                // style={{ width: isLap ? "180px" : !isMobile ? "240px" : "" }}
              >
                <div className="sessionYesBox lay1Background">
                  <span className={`f-size16 sessionBackTxt`}>No</span>
                </div>
                <div className="sessionYesBox back1Background">
                  <span className={`f-size16 sessionBackTxt`}>Yes</span>
                </div>
                <div className="sessionEmptyBox"></div>
              </div>
            </div>
            {marketArr?.map((item: any, index: any) => {
              return (
                <div className="w-100 d-flex flex-column">
                  <div className="sessionRateContainer" key={index}>
                    <div
                      className="sessionRateName runnerWidthNormal"
                      style={{ overflow: "hidden" }}
                    >
                      <span
                        className="teamFont"
                        style={{ fontWeight: "400", lineHeight: 1 }}
                        onClick={() => {
                          // console.log("first", item);
                          if (item.activeStatus === "save") {
                            return true;
                          } else if (
                            calculateMaxLoss(
                              detail?.profitLossDataSession,
                              item?.id
                            ) === 0
                          ) {
                            return;
                          } else {
                            if (
                              ![
                                sessionBettingType.fancy1,
                                sessionBettingType.oddEven,
                              ].includes(mtype)
                            ) {
                              dispatch(resetRunAmount());
                              setRunnerModalShow((prev) => !prev);
                              if (title === "meter") {
                                dispatch(getRunAmountMeter(item?.id));
                              } else {
                                dispatch(getRunAmount(item?.id));
                              }
                            }
                          }
                        }}
                      >
                        {item?.RunnerName || item?.name}
                      </span>{" "}
                      <span
                        className={`${
                          (marketAnalysisDetail?.length
                            ? marketAnalysisDetail?.[0]?.betType?.session?.find(
                                (items: any) => items.betId == item?.id
                              )?.profitLoss?.maxLoss ?? 0
                            : calculateMaxLoss(
                                detail?.profitLossDataSession,
                                item?.id
                              )) < 0
                            ? "color-red"
                            : "color-red"
                        }  title-14 fbold`}
                      >
                        {(marketAnalysisDetail?.length
                          ? marketAnalysisDetail?.[0]?.betType?.session?.find(
                              (items: any) => items.betId == item?.id
                            )?.profitLoss?.maxLoss ?? 0
                          : calculateMaxLoss(
                              detail?.profitLossDataSession,
                              item?.id
                            )) !== 0
                          ? `-${
                              marketAnalysisDetail?.length
                                ? marketAnalysisDetail?.[0]?.betType?.session?.find(
                                    (items: any) => items.betId == item?.id
                                  )?.profitLoss?.maxLoss ?? 0
                                : calculateMaxLoss(
                                    detail?.profitLossDataSession,
                                    item?.id
                                  )
                            }`
                          : ""}
                      </span>
                    </div>
                    <div
                      className="sessionRateBoxContainer rateBoxWidthNormal"
                      // style={{
                      //   width: isLap ? "180px" : !isMobile ? "240px" : "",
                      // }}
                    >
                      {handleStatus(
                        item?.activeStatus,
                        item?.GameStatus,
                        item?.status
                      ) && (
                        <div className="suspended-overlayRates">
                          <span className={`suspendTextCmmn`}>
                            {(
                              item?.GameStatus || item?.status
                            )?.toUpperCase() ?? "SUSPENDED"}
                          </span>
                        </div>
                      )}
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          // borderRight: "1px solid #c7c8ca",
                        }}
                      >
                        <div
                          className={`sessionRateBox rateFont lay1Background`}
                          style={{ cursor: "pointer" }}
                        >
                          <span className={`rateFont`}>
                            {handlePrice(
                              item?.ex?.availableToLay?.[0]?.price ||
                                item?.noRate
                            ) ?? "-"}
                          </span>
                          <span className={`f-size12 sessionRate2Box`}>
                            {handleSize(item?.ex?.availableToLay?.[0]?.size) ||
                              item?.noPercent}
                          </span>
                        </div>
                        {item?.ex?.availableToLay?.length > 1 && (
                          <div
                            className={`sessionRateBox rateFont lay1Background`}
                            style={{ cursor: "pointer" }}
                          >
                            <span className={`rateFont`}>
                              {handlePrice(
                                item?.ex?.availableToLay?.[1]?.price
                              ) ?? "-"}
                            </span>
                            <span className={`f-size12 sessionRate2Box`}>
                              {handleSize(item?.ex?.availableToLay?.[1]?.size)}
                            </span>
                          </div>
                        )}
                        {item?.ex?.availableToLay?.length > 2 && (
                          <div
                            className={`sessionRateBox lay1Background`}
                            style={{ cursor: "pointer" }}
                          >
                            <span className={`rateFont`}>
                              {handlePrice(
                                item?.ex?.availableToLay?.[2]?.price
                              ) ?? "-"}
                            </span>
                            <span className={`f-size12 sessionRate2Box`}>
                              {handleSize(item?.ex?.availableToLay?.[2]?.size)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          className="sessionRateBox back1Background"
                          style={{ cursor: "pointer" }}
                        >
                          <span className={`rateFont`}>
                            {handlePrice(
                              item?.ex?.availableToBack?.[0]?.price ||
                                item?.yesRate
                            ) ?? "-"}
                          </span>
                          <span className={`f-size12 sessionRate2Box`}>
                            {handleSize(item?.ex?.availableToBack?.[0]?.size) ||
                              item?.yesPercent}
                          </span>
                        </div>
                        {item?.ex?.availableToBack?.length > 1 && (
                          <div
                            className="sessionRateBox back1Background"
                            style={{ cursor: "pointer" }}
                          >
                            <span className={`rateFont`}>
                              {handlePrice(
                                item?.ex?.availableToBack?.[1]?.price
                              ) ?? "-"}
                            </span>
                            <span className={`f-size12 sessionRate2Box`}>
                              {handleSize(item?.ex?.availableToBack?.[1]?.size)}
                            </span>
                          </div>
                        )}
                        {item?.ex?.availableToBack?.length > 2 && (
                          <div
                            className="sessionRateBox back1Background"
                            style={{ cursor: "pointer" }}
                          >
                            <span className={`rateFont`}>
                              {handlePrice(
                                item?.ex?.availableToBack?.[2]?.price
                              ) ?? "-"}
                            </span>
                            <span className={`f-size12 sessionRate2Box`}>
                              {handleSize(item?.ex?.availableToBack?.[2]?.size)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="sessionMinBoxContainer">
                        <span className={`sessionMinBox sessionMinMaxFont`}>
                          Min:{formatNumber(item?.min || item?.minBet)}
                        </span>
                        <span className={`sessionMinBox sessionMinMaxFont`}>
                          Max:{formatNumber(item?.max || item?.maxBet)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {item?.rem && (
                    <div
                      className="w-100 text-start"
                      style={{
                        fontSize: "11px",
                        color: "#097c93",
                        backgroundColor: "#f2f2f2",
                        borderBottom: "1px solid #c7c8ca",
                      }}
                    >
                      {item?.rem}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
        <CustomModal show={runnerModalShow} setShow={setRunnerModalShow}>
          <TableRunner runAmount={runAmount} />
        </CustomModal>
    </>
  );
};
export default SessionNormal;
