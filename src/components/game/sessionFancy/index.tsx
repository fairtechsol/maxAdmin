
import { calculateMaxLoss, formatNumber, handleSize } from "../../../helpers";
import "./style.scss";
import isMobile from "../../../utils/screenDimension";

const SessionFancy = ({ title, data, detail }:any) => {
 
 
  const handlePrice = (rate: any) => {
    if (rate && rate != 0) {
      return rate;
    } else {
      return "-";
    }
  };
  return (
    <>
      <div
        className="sessionNormalContainer"
        style={{ marginTop: isMobile ? "" : "10px" }}
      >
        <div className="sessionNormalTitle">
          <span className="sessionNormalTitleTxt f-size15">{title}</span>
        </div>
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
            <div className="sessionYesNoBoxContainer" >
              <div
                className="sessionYesNoBox  rateBoxWidthNormal"
                // style={{ width: isLap ? "180px" : !isMobile ? "240px" : "" }}
              >
                <div className="sessionYesBox back1Background">
                  <span className={`f-size16 sessionBackTxt`}>Back</span>
                </div>
                <div className="sessionYesBox lay1Background">
                  <span className={`f-size16 sessionBackTxt`}>Lay</span>
                </div>
                <div className="sessionEmptyBox"></div>
              </div>
            </div>
            {data?.section?.map((item: any, index: any) => {
              return (
                <div className="sessionRateContainer" key={index}>
                  <div className="sessionRateName runnerWidthNormal"
                      style={{ overflow: "hidden" }}>
                    <span
                      className="teamFont"
                      style={{ fontWeight:"400", lineHeight: 1 }}
                    >
                      {item?.RunnerName}
                    </span>{" "}
                    <span
                      className={`${
                        calculateMaxLoss(
                          detail?.profitLossDataSession,
                          item?.id
                        ) < 0
                          ? "color-red"
                          : "color-red"
                      } title-14 fbold`}
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
                    {(item?.activeStatus != "live" ||
                      item?.GameStatus != "") && (
                      <div className="suspended-overlayRates">
                        <span
                          className={`suspendTextCmmn`}
                        >
                          {item?.GameStatus ?? "SUSPENDED"}
                        </span>
                      </div>
                    )}
                    <div
                      className={`sessionRateBox rateFont back1Background`}
                      style={{ cursor: "pointer" }}
                     
                    >
                      <span
                        className={`rateFont`}
                      >
                        {handlePrice(item?.ex?.availableToBack?.[0]?.price) ??
                          "-"}
                      </span>
                      <span
                        className={`f-size12 sessionRate2Box`}
                      >
                        {handleSize(item?.ex?.availableToBack?.[0]?.size)}
                      </span>
                    </div>
                    <div
                      className="sessionRateBox rateFont lay1Background"
                      style={{ cursor: "pointer" }}
                      
                    >
                      <span
                        className={`rateFont`}
                      >
                        {handlePrice(item?.ex?.availableToLay?.[0]?.price) ??
                          "-"}
                      </span>
                      <span
                        className={`${
                          !isMobile ? "f-size12" : "f-size11"
                        } sessionRate2Box`}
                      >
                        {handleSize(item?.ex?.availableToLay?.[0]?.size)}
                      </span>
                    </div>
                    <div className="sessionMinBoxContainer">
                      <span className={`sessionMinBox sessionMinMaxFont`}>
                        Min:{formatNumber(item?.min)}
                      </span>
                      <span className={`sessionMinBox sessionMinMaxFont`}>
                        Max:{formatNumber(item?.max)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
};
export default SessionFancy;
