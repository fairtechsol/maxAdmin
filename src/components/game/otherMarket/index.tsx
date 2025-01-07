import { useSelector } from "react-redux";
import { dummyArray, formatNumber } from "../../../helpers";
import { RootState } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import isMobile from "../../../utils/screenDimension";
import MarketTableHeader from "../../commonComponent/MarketWiseHeader";
import BetBox from "../betBox";
import "./style.scss";

const OtherMarket = ({ title, box, data, detail }: any) => {
  const { marketAnalysisDetail } = useSelector(
    (state: RootState) => state.match.marketAnalysis
  );

  const profitLossTeamA = marketAnalysisDetail?.length
    ? marketAnalysisDetail?.[0]?.betType?.match?.find(
        (item: any) => item.betId == data?.id
      )?.profitLoss?.a ?? 0
    : data?.type === "tiedMatch3"
    ? detail?.profitLossDataMatch?.[
        profitLossDataForMatchConstants?.[data?.type]?.A + "_" + detail?.id
      ]
    : detail?.profitLossDataMatch?.[
        profitLossDataForMatchConstants?.[data?.type]?.A +
          "_" +
          data?.id +
          "_" +
          detail?.id
      ];
  const profitLossTeamB = marketAnalysisDetail?.length
    ? marketAnalysisDetail?.[0]?.betType?.match?.find(
        (item: any) => item.betId == data?.id
      )?.profitLoss?.b ?? 0
    : data?.type === "tiedMatch3"
    ? detail?.profitLossDataMatch?.[
        profitLossDataForMatchConstants?.[data?.type]?.B + "_" + detail?.id
      ]
    : detail?.profitLossDataMatch?.[
        profitLossDataForMatchConstants?.[data?.type]?.B +
          "_" +
          data?.id +
          "_" +
          detail?.id
      ];
  const profitLossTeamC = marketAnalysisDetail?.length
    ? marketAnalysisDetail?.[0]?.betType?.match?.find(
        (item: any) => item.betId == data?.id
      )?.profitLoss?.c ?? 0
    : data?.type === "tiedMatch3"
    ? ""
    : detail?.profitLossDataMatch?.[
        profitLossDataForMatchConstants?.[data?.type]?.C +
          "_" +
          data?.id +
          "_" +
          detail?.id
      ];

  return (
    <>
      <div className="otherMarketContainer">
        <MarketTableHeader
          title={title}
          type={"matchOdds"}
          data={data}
          detail={detail}
        />

        <div className="otherMarketBackLayTab">
          <div className="otherMarketMinMaxBox">
            <span className="otherMarketMinMax">
              {data?.minBet === data?.maxBet
                ? `Max:${formatNumber(data?.maxBet)}`
                : `Min:${formatNumber(data?.minBet)} Max:${formatNumber(
                    data?.maxBet
                  )}`}
            </span>
          </div>
          <div
            className={
              box === 6
                ? "otherMarket1BackLayBoxContainer backLayBoxWidth"
                : "otherMarket2BackLayBoxContainer backLayBoxWidth2"
            }
          >
            <div
              className={
                box === 6 ? "otherMarket1BackBoxTab" : "otherMarket2BackBoxTab"
              }
            >
              <span className={`f-size16 otherMarketBackTxt`}>Back</span>
            </div>
            <div
              className={
                box === 6 ? "otherMarket1LayBoxTab" : "otherMarket2LayBoxTab"
              }
            >
              <span className={`f-size16 otherMarketBackTxt`}>Lay</span>
            </div>
            {box === 6 && <div className="otherMarketEmptyBox"></div>}
          </div>
        </div>

        <div className="otherMarketTeamTab">
          <div
            className="otherMarketTeam"
            style={isMobile && box === 6 ? { width: "28%" } : {}}
            // style={box === 6 ? { width: "28%" } : {}}
          >
            <span className={`teamFont otherMarketTeamTxt`}>
              {data?.type === "other"
                ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                : "Yes"}
            </span>
            <div className="d-flex flex-row justify-content-between w-100">
              <span
                className={`${
                  parseFloat(profitLossTeamA) > 0 ? "color-green" : "color-red"
                } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
              >
                {parseFloat(profitLossTeamA) ? parseFloat(profitLossTeamA) : ""}
              </span>
            </div>
          </div>
          <div
            className={
              box === 6
                ? "otherMarket1RateBox rateBoxWidth"
                : "otherMarket2RateBox rateBoxWidth2"
            }
          >
            {(data?.activeStatus !== "live" ||
              data?.runners?.[0]?.status !== "ACTIVE") && (
              <div className="suspended-overlayRatesotherMarket">
                <span
                  className={`suspendTextCmmn`}
                  style={{ textTransform: "uppercase" }}
                >
                  {data?.runners?.[0]?.status}
                </span>
              </div>
            )}
            {box === 6 ? (
              <>
                {(data?.runners?.[0]?.ex?.availableToBack?.length > 0
                  ? data?.runners?.[0]?.ex?.availableToBack
                  : dummyArray
                )?.map((item: any) => {
                  return (
                    <BetBox
                      data={item}
                      type={"back"}
                      detail={
                        data?.type === "other"
                          ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                          : "Yes"
                      }
                      runner={data?.runners?.[0]}
                    />
                  );
                })}
                {(data?.runners?.[0]?.ex?.availableToLay?.length > 0
                  ? data?.runners?.[0]?.ex?.availableToLay
                  : dummyArray
                )?.map((item: any) => {
                  return (
                    <BetBox
                      data={item}
                      type={"lay"}
                      detail={
                        data?.type === "other"
                          ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                          : "Yes"
                      }
                      runner={data?.runners?.[0]}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <BetBox
                  data={data?.runners?.[0]?.ex?.availableToBack?.[0]}
                  type={"back"}
                  detail={
                    data?.type === "other"
                      ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                      : "Yes"
                  }
                  runner={data?.runners?.[0]}
                />

                <BetBox
                  data={data?.runners?.[0]?.ex?.availableToLay?.[0]}
                  type={"lay"}
                  detail={
                    data?.type === "other"
                      ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                      : "Yes"
                  }
                  runner={data?.runners?.[0]}
                />
              </>
            )}
          </div>
        </div>

        <div className="otherMarketTeamTab">
          <div
            className="otherMarketTeam"
            style={isMobile && box === 6 ? { width: "28%" } : {}}
            // style={box === 6 ? { width: "28%" } : {}}
          >
            <span className={`teamFont otherMarketTeamTxt`}>
              {data?.type === "other"
                ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                : "No"}
            </span>
            <div className="d-flex flex-row justify-content-between w-100">
              <span
                className={`${
                  parseFloat(profitLossTeamB) > 0 ? "color-green" : "color-red"
                } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
              >
                {parseFloat(profitLossTeamB) ? parseFloat(profitLossTeamB) : ""}
              </span>
            </div>
          </div>
          <div
            className={
              box === 6
                ? "otherMarket1RateBox rateBoxWidth"
                : "otherMarket2RateBox rateBoxWidth2"
            }
          >
            {(data?.activeStatus !== "live" ||
              data?.runners?.[1]?.status !== "ACTIVE") && (
              <div className="suspended-overlayRatesotherMarket">
                <span
                  className={`suspendTextCmmn`}
                  style={{ textTransform: "uppercase" }}
                >
                  {data?.runners?.[1]?.status}
                </span>
              </div>
            )}
            {box === 6 ? (
              <>
                {(data?.runners?.[1]?.ex?.availableToBack?.length > 0
                  ? data?.runners?.[1]?.ex?.availableToBack
                  : dummyArray
                )?.map((item: any) => {
                  return (
                    <BetBox
                      data={item}
                      type={"back"}
                      detail={
                        data?.type === "other"
                          ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                          : "No"
                      }
                      runner={data?.runners?.[1]}
                    />
                  );
                })}
                {(data?.runners?.[1]?.ex?.availableToLay?.length > 0
                  ? data?.runners?.[1]?.ex?.availableToLay
                  : dummyArray
                )?.map((item: any) => {
                  return (
                    <BetBox
                      data={item}
                      type={"lay"}
                      detail={
                        data?.type === "other"
                          ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                          : "No"
                      }
                      runner={data?.runners?.[1]}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <BetBox
                  data={data?.runners?.[1]?.ex?.availableToBack?.[0]}
                  type={"back"}
                  detail={
                    data?.type === "other"
                      ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                      : "No"
                  }
                  runner={data?.runners?.[1]}
                />

                <BetBox
                  data={data?.runners?.[1]?.ex?.availableToLay?.[0]}
                  type={"lay"}
                  detail={
                    data?.type === "other"
                      ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                      : "No"
                  }
                  runner={data?.runners?.[1]}
                />
              </>
            )}
          </div>
        </div>

        {(data?.runners?.[2]?.nat || data?.metaData?.teamC) && (
          <div className="otherMarketTeamTab">
            <div
              className="otherMarketTeam"
              style={isMobile && box === 6 ? { width: "28%" } : {}}
              // style={box === 6 ? { width: "28%" } : {}}
            >
              <span className={`teamFont otherMarketTeamTxt`}>
                {data?.runners?.[2]?.nat || data?.metaData?.teamC}
              </span>{" "}
              <div className="d-flex flex-row justify-content-between w-100">
                <span
                  className={`${
                    parseFloat(profitLossTeamC) > 0
                      ? "color-green"
                      : "color-red"
                  } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
                >
                  {parseFloat(profitLossTeamC)
                    ? parseFloat(profitLossTeamC)
                    : 0}
                </span>
              </div>
            </div>
            <div
              className={
                box === 6
                  ? "otherMarket1RateBox rateBoxWidth"
                  : "otherMarket2RateBox rateBoxWidth2"
              }
            >
              {(data?.activeStatus !== "live" ||
                data?.runners?.[2]?.status !== "ACTIVE") && (
                <div className="suspended-overlayRatesotherMarket">
                  <span
                    className={`suspendTextCmmn`}
                    style={{ textTransform: "uppercase" }}
                  >
                    {data?.runners?.[2]?.status}
                  </span>
                </div>
              )}
              {box === 6 ? (
                <>
                  {(data?.runners?.[2]?.ex?.availableToBack?.length > 0
                    ? data?.runners?.[2]?.ex?.availableToBack
                    : dummyArray
                  )?.map((item: any) => {
                    return (
                      <BetBox
                        data={item}
                        type={"back"}
                        detail={detail?.teamC}
                        runner={data?.runners?.[2]}
                      />
                    );
                  })}
                  {(data?.runners?.[2]?.ex?.availableToLay?.length > 0
                    ? data?.runners?.[2]?.ex?.availableToLay
                    : dummyArray
                  )?.map((item: any) => {
                    return (
                      <BetBox
                        data={item}
                        type={"lay"}
                        detail={detail?.teamC}
                        runner={data?.runners?.[2]}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  <BetBox
                    data={data?.runners?.[2]?.ex?.availableToBack?.[0]}
                    type={"back"}
                    detail={detail?.teamC}
                    runner={data?.runners?.[2]}
                  />

                  <BetBox
                    data={data?.runners?.[2]?.ex?.availableToLay?.[0]}
                    type={"lay"}
                    detail={detail?.teamC}
                    runner={data?.runners?.[2]}
                  />
                </>
              )}
            </div>
          </div>
        )}
        {data?.rem && (
          <div className="otherMarketRemarkTab">
            <div className="remark-content">{data?.rem}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default OtherMarket;
