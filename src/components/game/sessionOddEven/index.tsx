import { memo } from "react";
import { calculateMaxLoss, formatNumber, handleSize } from "../../../helpers";
import isMobile from "../../../utils/screenDimension";
import MarketTableHeader from "../../commonComponent/MarketWiseHeader";
import "./style.scss";

const SessionOddEven = ({ title, data, detail, marketAnalysisDetail }: any) => {
  const handlePrice = (rate: any) => {
    if (rate && rate != 0) {
      return rate;
    } else {
      return "-";
    }
  };
  return (
    <div
      className="sessionNormalContainer"
      style={{ marginTop: isMobile ? "" : "10px" }}
    >
      <MarketTableHeader
        title={title}
        type={"oddEven"}
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
            <div className="sessionYesNoBox rateBoxWidthNormal">
              <div
                className="sessionYesBox back1Background"
                style={{ borderRight: "1px solid #c7c8ca" }}
              >
                <span className={`f-size16 sessionBackTxt`}>Odd</span>
              </div>
              <div className="sessionYesBox back1Background">
                <span className={`f-size16 sessionBackTxt`}>Even</span>
              </div>
              <div className="sessionEmptyBox"></div>
            </div>
          </div>
          {data?.section?.map((item: any, index: any) => {
            return (
              <div className="w-100 d-flex flex-column" key={index}>
                <div className="sessionOddEvenRateContainer">
                  <div
                    className="sessionRateName runnerWidthNormal"
                    style={{ overflow: "hidden" }}
                  >
                    <span
                      className="teamFont"
                      style={{
                        width: "60%",
                        fontWeight: "400",
                        lineHeight: 1,
                      }}
                    >
                      {item?.RunnerName}
                    </span>
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
                  <div className="sessionRateBoxContainer rateBoxWidthNormal">
                    {(item?.activeStatus != "live" ||
                      item?.GameStatus != "") && (
                      <div className="suspended-overlayRates">
                        <span className={`suspendTextCmmn`}>
                          {item?.GameStatus ?? "SUSPENDED"}
                        </span>
                      </div>
                    )}
                    <div
                      style={{
                        width: "33.33%",
                        display: "flex",
                        flexDirection: "column",
                        borderRight: "1px solid #c7c8ca",
                      }}
                    >
                      <div
                        className={`sessionRateBox back1Background`}
                        style={{ cursor: "pointer" }}
                      >
                        <span className={`rateFont`}>
                          {handlePrice(item?.ex?.availableToBack?.[0]?.price) ??
                            "-"}
                        </span>
                        <span className={`f-size12 sessionRate2Box`}>
                          {handleSize(item?.ex?.availableToBack?.[0]?.size)}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "33.33%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        className="sessionRateBox back1Background"
                        style={{ cursor: "pointer" }}
                      >
                        <span className={`rateFont`}>
                          {handlePrice(item?.ex?.availableToLay?.[0]?.price) ??
                            "-"}
                        </span>
                        <span className={`f-size12 sessionRate2Box`}>
                          {handleSize(item?.ex?.availableToLay?.[0]?.size)}
                        </span>
                      </div>
                    </div>
                    <div
                      className="sessionMinBoxContainer"
                      style={{ width: "33.33%" }}
                    >
                      <span className={`sessionMinBox sessionMinMaxFont`}>
                        Min:{formatNumber(item?.min)}
                      </span>
                      <span className={`sessionMinBox sessionMinMaxFont`}>
                        Max:{formatNumber(item?.max)}
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
  );
};
export default memo(SessionOddEven);
