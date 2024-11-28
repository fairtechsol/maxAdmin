// import { useDispatch } from "react-redux";
// import { selectedBetAction } from "../../../store/actions/match/matchListAction";
// import { isMobile } from "../../../utils/screenDimension";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";
// import { AppDispatch, RootState } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import { dummyArray, formatNumber } from "../../../helpers";
import BetBox from "../betBox";
import MarketTableHeader from "../../commonComponent/MarketWiseHeader";
// import { useSelector } from "react-redux";

const MarketBox = ({
  title,
  box,
  data,
  detail,
  teamARates,
  teamBRates,
}: any) => {
  const bookRatioB: any = (() => {
    if (teamARates === 0) {
      return 0;
    } else {
      const bookRatio = teamBRates != 0 ? teamARates / teamBRates || 0 : 0;
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      return formattedRatio;
    }
  })();

  const bookRatioA: any = (() => {
    if (teamBRates === 0) {
      return 0;
    } else {
      const bookRatio = teamARates != 0 ? teamBRates / teamARates || 0 : 0;
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      return formattedRatio;
    }
  })();
  return (
    <>
      <div className="bookmakerContainer">
     <MarketTableHeader title={title} type={"matchOdds"} data={data} />

        <div className="bookmakerBackLayTab">
          <div className="bookmakerMinMaxBox">
            <span className="bookmakerMinMax">
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
                ? "bookmaker1BackLayBoxContainer backLayBoxWidth"
                : "bookmaker2BackLayBoxContainer backLayBoxWidth2"
            }
          >
            <div
              className={
                box === 6 ? "bookmaker1BackBoxTab" : "bookmaker2BackBoxTab"
              }
            >
              <span className={`f-size16 bookmakerBackTxt`}>Back</span>
            </div>
            <div
              className={
                box === 6 ? "bookmaker1LayBoxTab" : "bookmaker2LayBoxTab"
              }
            >
              <span className={`f-size16 bookmakerBackTxt`}>Lay</span>
            </div>
            {box === 6 && <div className="bookmakerEmptyBox"></div>}
          </div>
        </div>

        <div className="bookmakerTeamTab">
          <div
            className="bookmakerTeam"
            style={isMobile && box === 6 ? { width: "28%" } : {}}
            // style={box === 6 ? { width: "28%" } : {}}
          >
            <span className={`teamFont bookmakerTeamTxt`}>
              {(data?.runners?.[0]?.nat || detail?.teamA)?.length > 25
                ? `${(data?.runners?.[0]?.nat || detail?.teamA)?.slice(
                    0,
                    25
                  )}...`
                : data?.runners?.[0]?.nat || detail?.teamA}
            </span>
            <div className="d-flex flex-row w-100">
              <span
                className={`${
                  parseFloat(
                    detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.A +
                        "_" +
                        detail?.id
                    ]
                  ) > 0
                    ? "color-green"
                    : "color-red"
                } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
              >
                {detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.A +
                    "_" +
                    detail?.id
                ]
                  ? detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.A +
                        "_" +
                        detail?.id
                    ] === "0"
                    ? ""
                    : parseFloat(
                        detail?.profitLossDataMatch?.[
                          profitLossDataForMatchConstants[data?.type]?.A +
                            "_" +
                            detail?.id
                        ]
                      ).toFixed(2)
                  : ""}
              </span>
              {![0, "0"].includes(bookRatioB) && (
                <span className="bookRatio">
                  {`${parseFloat(bookRatioB).toFixed(2)}%`}
                </span>
              )}
            </div>
          </div>
          <div
            className={
              box === 6
                ? "bookmaker1RateBox rateBoxWidth"
                : "bookmaker2RateBox rateBoxWidth2"
            }
          >
            {(data?.activeStatus !== "live" ||
              (data?.runners?.[0]?.status !== "ACTIVE" &&
                data?.runners?.[0]?.status !== "OPEN")) && (
              <div className="suspended-overlayRatesBookmaker">
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
                      detail={detail?.teamA}
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
                      detail={detail?.teamA}
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
                  detail={detail?.teamA}
                  runner={data?.runners?.[0]}
                />

                <BetBox
                  data={data?.runners?.[0]?.ex?.availableToLay?.[0]}
                  type={"lay"}
                  detail={detail?.teamA}
                  runner={data?.runners?.[0]}
                />
              </>
            )}
          </div>
        </div>

        <div className="bookmakerTeamTab">
          <div
            className="bookmakerTeam"
            style={isMobile && box === 6 ? { width: "28%" } : {}}
            // style={box === 6 ? { width: "28%" } : {}}
          >
            <span className={`teamFont bookmakerTeamTxt`}>
              {(data?.runners?.[1]?.nat || detail?.teamB)?.length > 25
                ? `${(data?.runners?.[1]?.nat || detail?.teamB)?.slice(
                    0,
                    25
                  )}...`
                : data?.runners?.[1]?.nat || detail?.teamB}
            </span>
            <div className="d-flex flex-row w-100">
              <span
                className={`${
                  parseFloat(
                    detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.B +
                        "_" +
                        detail?.id
                    ]
                  ) > 0
                    ? "color-green"
                    : "color-red"
                } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
              >
                {detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.B +
                    "_" +
                    detail?.id
                ]
                  ? detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.B +
                        "_" +
                        detail?.id
                    ] === "0"
                    ? ""
                    : parseFloat(
                        detail?.profitLossDataMatch?.[
                          profitLossDataForMatchConstants[data?.type]?.B +
                            "_" +
                            detail?.id
                        ]
                      ).toFixed(2)
                  : ""}
              </span>
              {![0, "0"].includes(bookRatioA) && (
                <span className="bookRatio">
                  {`${parseFloat(bookRatioA).toFixed(2)}%`}
                </span>
              )}
            </div>
          </div>
          <div
            className={
              box === 6
                ? "bookmaker1RateBox rateBoxWidth"
                : "bookmaker2RateBox rateBoxWidth2"
            }
          >
            {(data?.activeStatus !== "live" ||
              (data?.runners?.[1]?.status !== "ACTIVE" &&
                data?.runners?.[1]?.status !== "OPEN")) && (
              <div className="suspended-overlayRatesBookmaker">
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
                      detail={detail?.teamB}
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
                      detail={detail?.teamB}
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
                  detail={detail?.teamB}
                  runner={data?.runners?.[1]}
                />

                <BetBox
                  data={data?.runners?.[1]?.ex?.availableToLay?.[0]}
                  type={"lay"}
                  detail={detail?.teamB}
                  runner={data?.runners?.[1]}
                />
              </>
            )}
          </div>
        </div>

        {(data?.runners?.[2]?.nat || detail?.teamC) && (
          <div className="bookmakerTeamTab">
            <div
              className="bookmakerTeam"
              style={isMobile && box === 6 ? { width: "28%" } : {}}
              // style={box === 6 ? { width: "28%" } : {}}
            >
              <span className={`teamFont bookmakerTeamTxt`}>
                {(data?.runners?.[2]?.nat || detail?.teamC)?.length > 25
                  ? `${(data?.runners?.[2]?.nat || detail?.teamC)?.slice(
                      0,
                      25
                    )}...`
                  : data?.runners?.[2]?.nat || detail?.teamC}
              </span>{" "}
              <div className="d-flex flex-row justify-content-between w-100">
                <span
                  className={`${
                    parseFloat(
                      detail?.profitLossDataMatch?.[
                        profitLossDataForMatchConstants[data?.type]?.C +
                          "_" +
                          detail?.id
                      ]
                    ) > 0
                      ? "color-green"
                      : "color-red"
                  } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
                >
                  {detail?.profitLossDataMatch?.[
                    profitLossDataForMatchConstants[data?.type]?.C +
                      "_" +
                      detail?.id
                  ]
                    ? detail?.profitLossDataMatch?.[
                        profitLossDataForMatchConstants[data?.type]?.C +
                          "_" +
                          detail?.id
                      ] === "0"
                      ? ""
                      : parseFloat(
                          detail?.profitLossDataMatch?.[
                            profitLossDataForMatchConstants[data?.type]?.C +
                              "_" +
                              detail?.id
                          ]
                        ).toFixed(2)
                    : ""}
                </span>
              </div>
            </div>
            <div
              className={
                box === 6
                  ? "bookmaker1RateBox rateBoxWidth"
                  : "bookmaker2RateBox rateBoxWidth2"
              }
            >
              {(data?.activeStatus !== "live" ||
                (data?.runners?.[2]?.status !== "ACTIVE" &&
                  data?.runners?.[2]?.status !== "OPEN")) && (
                <div className="suspended-overlayRatesBookmaker">
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
          <div className="bookmakerRemarkTab">
            <div className="remark-content">{data?.rem}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default MarketBox;
