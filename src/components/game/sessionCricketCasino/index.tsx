import { memo, useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { formatNumber, handleSize } from "../../../helpers";
import isMobile from "../../../utils/screenDimension";
import MarketTableHeader from "../../commonComponent/MarketWiseHeader";
import "./style.scss";

const SessionCricketCasino = ({
  title,
  data,
  detail,
  marketAnalysisDetail,
}: any) => {
  const [marketArr, setMarketArr] = useState<any>(data);
  useEffect(() => {
    if (!data?.section || !Array.isArray(data.section)) {
      const defaultArray = Array.from(
        { length: 10 },
        (_, i) => `Element ${i + 1}`
      );

      const newData = {
        ...data,
        section: defaultArray,
      };

      setMarketArr(newData);
    }
  }, []);

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
        type="cricketCasino"
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
          <div
            className="sessionCasinoMinMax"
            style={{ borderBottom: "1px solid #c7c8ca" }}
          >
            <div style={{ backgroundColor: "#f2f2f2", flexGrow: 1 }}>
              <span
                className={`sessionMinBox sessionMinMaxFont`}
                style={{ marginLeft: "1%" }}
              >
                Min:{formatNumber(marketArr?.min)} Max:
                {formatNumber(marketArr?.max)}
              </span>
            </div>
            <div
              className="sessionRateBox back1Background"
              style={{ width: !isMobile ? "81px" : "20%" }}
            >
              <span className={`f-size16 sessionBackTxt`}>Back</span>
            </div>
          </div>
          {marketArr?.section?.map((item: any, index: any) => {
            return (
              <div className="sessionRateContainer" key={index}>
                <div className="sessionRateName" style={{ flexGrow: 1 }}>
                  <span className="teamFont" style={{ fontWeight: "400" }}>
                    {index} Number
                  </span>
                  <span
                    className={`${
                      marketAnalysisDetail?.length
                        ? (parseFloat(
                            marketAnalysisDetail?.[0]?.betType?.session?.find(
                              (items: any) => items.betId == data?.id
                            )?.profitLoss?.betPlaced[index]
                          ) ?? 0) > 0
                          ? "color-green"
                          : "color-red"
                        : detail?.profitLossDataSession
                        ? detail?.profitLossDataSession?.filter(
                            (a: any) => a?.betId === data?.id
                          )
                          ? detail?.profitLossDataSession?.filter(
                              (a: any) => a?.betId === data?.id
                            )[0]?.profitLoss?.[index] > 0
                            ? "color-green"
                            : detail?.profitLossDataSession?.filter(
                                (a: any) => a?.betId === data?.id
                              )[0]?.profitLoss?.[index] < 0
                            ? "color-red"
                            : "color-red"
                          : 0
                        : 0
                    }`}
                  >
                    {marketAnalysisDetail?.length
                      ? marketAnalysisDetail?.[0]?.betType?.session?.find(
                          (items: any) => items.betId == data?.id
                        )?.profitLoss?.betPlaced[index] ?? 0
                      : detail?.profitLossDataSession
                      ? detail?.profitLossDataSession?.filter(
                          (a: any) => a?.betId === data?.id
                        )
                        ? detail?.profitLossDataSession?.filter(
                            (a: any) => a?.betId === data?.id
                          )[0]?.profitLoss?.[index]
                        : ""
                      : ""}
                  </span>
                </div>
                <div
                  className="sessionCCRateBoxContainer"
                  style={{ width: !isMobile ? "81px" : "" }}
                >
                  {item?.gstatus !== "" && (
                    <div className="suspended-overlayRates">
                      <FaLock color="#fff" />
                    </div>
                  )}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #c7c8ca",
                    }}
                  >
                    <div
                      className="sessionRateBox back1Background"
                      style={{ height: "45px" }}
                    >
                      <span className="rateFont">
                        {handlePrice(item?.odds?.[0]?.odds) ?? "-"}
                      </span>
                      <span
                        className={`${
                          !isMobile ? "f-size12" : "f-size11"
                        } sessionRate2Box`}
                      >
                        {handleSize(item?.odds?.[0]?.size)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default memo(SessionCricketCasino);
