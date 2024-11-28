import { useEffect, useState } from "react";
import { calculateMaxLoss, formatNumber, handleSize } from "../../../helpers";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";
import MarketTableHeader from "../../commonComponent/MarketWiseHeader";

const SessionNormal = ({ title, data, detail, manual }: any) => {
  const [marketArr, setMarketArr] = useState(data?.section || []);

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
         <MarketTableHeader title={title} type={"matchOdds"} data={data} />
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
                      >
                        {item?.RunnerName || item?.name}
                      </span>{" "}
                      <span
                        className={`${
                          calculateMaxLoss(
                            detail?.profitLossDataSession,
                            item?.id
                          ) < 0
                            ? "color-red"
                            : "color-red"
                        }  title-14 fbold`}
                      >
                        {calculateMaxLoss(
                          detail?.profitLossDataSession,
                          item?.id
                        ) !== 0
                          ? `-${calculateMaxLoss(
                              detail?.profitLossDataSession,
                              item?.id
                            )}`
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
    </>
  );
};
export default SessionNormal;
