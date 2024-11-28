// import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../../../helpers";
// import { AppDispatch, RootState } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import isMobile from "../../../utils/screenDimension";
import MarketTableHeader from "../../commonComponent/MarketWiseHeader";
import "./style.scss";

const ManualMarket = ({ title, data, detail, teamARates, teamBRates }: any) => {
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
      <div
        className="manualContainer"
        style={{ marginTop: isMobile ? "" : "10px" }}
      >
        <MarketTableHeader title={title} type={"matchOdds"} data={data} />

        <div className="manualBackLayTab">
          <div className="manualMinMaxBox">
            <span className="manualMinMax">
              {data?.minBet === data?.maxBet
                ? `Max:${formatNumber(data?.maxBet)}`
                : `Min:${formatNumber(data?.minBet)} Max:${formatNumber(
                    data?.maxBet
                  )}`}
            </span>
          </div>
          <div
            className={`manualBackLayBoxContainer ${
              isMobile ? "backLayBoxWidth" : "backLayBoxWidth"
            }`}
            // style={{ width: isMobile ? "40%" : isLap ? "240px" : "320px" }}
          >
            <div
              className="manualBackBoxTab"
              // style={{ width: isMobile ? "50%" : "25%" }}
            >
              <span className={`f-size16 manualBackTxt`}>Back</span>
            </div>
            <div
              className="manualLayBoxTab"
              // style={{ width: isMobile ? "50%" : "25%" }}
            >
              <span className={`f-size16 manualBackTxt`}>Lay</span>
            </div>
            <div className="manualEmptyBox"></div>
          </div>
        </div>

        <div className="manualTeamTab">
          {/* {data?.activeStatus != "live" && (
            <div className="suspended-overlayRatesmanual">
              <span
                className={`${
                  !isMobile ? "f-size18" : "f-size16"
                } suspendedTxtmanual`}
              ></span>
            </div>
          )} */}
          <div className="manualTeam" style={isMobile ? { width: "28%" } : {}}>
            <span className={`teamFont manualTeamTxt`}>
              {(data?.type?.includes("quickbookmaker")
                ? detail?.teamA
                : "Yes") > 25
                ? `${(data?.type?.includes("quickbookmaker")
                    ? detail?.teamA
                    : "Yes"
                  )?.slice(0, 25)}...`
                : data?.type?.includes("quickbookmaker")
                ? detail?.teamA
                : "Yes"}
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
              </span>{" "}
              {![0, "0"].includes(bookRatioB) && (
                <span className="bookRatio">
                  {`${parseFloat(bookRatioB).toFixed(2)}%`}
                </span>
              )}
            </div>
          </div>
          <div
            className={`manualRateBox ${
              isMobile ? "rateBoxWidth" : "rateBoxWidth"
            }`}
            // style={{ width: isMobile ? "40%" : isLap ? "360px" : "480px" }}
          >
            {data?.statusTeamA != "active" && (
              <div className="suspended-overlayRatesmanual">
                <span className={`suspendTextCmmn`}>
                  {data?.statusTeamA?.toUpperCase()}
                </span>
              </div>
            )}
            {/* {!isMobile && ( */}
            <div className="manualBackBox back3Background">
              <span className={`rateFont manualRate1Box`}>
                {Math.floor(data?.backTeamA) != 0
                  ? Math.floor(data?.backTeamA) - 2 > 0
                    ? Math.floor(data?.backTeamA) - 2
                    : "-"
                  : "-"}
              </span>
            </div>

            {/* {!isMobile && ( */}
            <div className="manualBackBox back2Background">
              <span className={`rateFont manualRate1Box`}>
                {Math.floor(data?.backTeamA) != 0
                  ? Math.floor(data?.backTeamA) - 1 > 0
                    ? Math.floor(data?.backTeamA) - 1
                    : "-"
                  : "-"}
              </span>
            </div>

            <div className="manualBackBox back1Background">
              <span className={`rateFont manualRate1Box`}>
                {data?.backTeamA != 0 ? data?.backTeamA : "-"}
              </span>
            </div>
            <div className="manualBackBox lay1Background">
              <span className={`rateFont manualRate1Box`}>
                {data?.layTeamA != 0 ? data?.layTeamA : "-"}
              </span>
            </div>
            {/* {!isMobile && ( */}
            <div className="manualBackBox lay2Background">
              <span className={`rateFont manualRate1Box`}>
                {Math.floor(data?.layTeamA) != 0
                  ? detail?.rateThan100
                    ? Math.floor(data?.layTeamA) + 1
                    : Math.floor(data?.layTeamA) + 1 > 100
                    ? "-"
                    : Math.floor(data?.layTeamA) + 1
                  : "-"}
              </span>
            </div>

            {/* {!isMobile && ( */}
            <div className="manualBackBox lay3Background">
              <span className={`rateFont manualRate1Box`}>
                {Math.floor(data?.layTeamA) != 0
                  ? detail?.rateThan100
                    ? Math.floor(data?.layTeamA) + 2
                    : Math.floor(data?.layTeamA) + 2 > 100
                    ? "-"
                    : Math.floor(data?.layTeamA) + 2
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="manualTeamTab">
          {/* {data?.activeStatus != "live" && (
            <div className="suspended-overlayRatesmanual">
              <span
                className={`${
                  !isMobile ? "f-size18" : "f-size16"
                } suspendedTxtmanual`}
              ></span>
            </div>
          )} */}
          <div className="manualTeam" style={isMobile ? { width: "28%" } : {}}>
            <span className={`teamFont manualTeamTxt`}>
              {(data?.type?.includes("quickbookmaker") ? detail?.teamB : "No") >
              25
                ? `${(data?.type?.includes("quickbookmaker")
                    ? detail?.teamB
                    : "No"
                  )?.slice(0, 25)}...`
                : data?.type?.includes("quickbookmaker")
                ? detail?.teamB
                : "No"}
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
            className={`manualRateBox ${
              isMobile ? "rateBoxWidth" : "rateBoxWidth"
            }`}
            // style={{ width: isMobile ? "40%" : isLap ? "360px" : "480px" }}
          >
            {data?.statusTeamB != "active" && (
              <div className="suspended-overlayRatesmanual">
                <span className={`suspendTextCmmn`}>
                  {data?.statusTeamB?.toUpperCase()}
                </span>
              </div>
            )}
            {/* {!isMobile && ( */}
            <div className="manualBackBox back3Background">
              <span className={`rateFont manualRate1Box`}>
                {Math.floor(data?.backTeamB) != 0
                  ? Math.floor(data?.backTeamB) - 2 > 0
                    ? Math.floor(data?.backTeamB) - 2
                    : "-"
                  : "-"}
              </span>
            </div>

            {/* {!isMobile && ( */}
            <div className="manualBackBox back2Background">
              <span className={`rateFont manualRate1Box`}>
                {Math.floor(data?.backTeamB) != 0
                  ? Math.floor(data?.backTeamB) - 1 > 0
                    ? Math.floor(data?.backTeamB) - 1
                    : "-"
                  : "-"}
              </span>
            </div>

            <div className="manualBackBox back1Background">
              <span className={`rateFont manualRate1Box`}>
                {data?.backTeamB != 0 ? data?.backTeamB : "-"}
              </span>
            </div>
            <div className="manualBackBox lay1Background">
              <span className={`rateFont manualRate1Box`}>
                {data?.layTeamB != 0 ? data?.layTeamB : "-"}
              </span>
            </div>
            {/* {!isMobile && ( */}
            <div className="manualBackBox lay2Background">
              <span className={`rateFont manualRate1Box`}>
                {Math.floor(data?.layTeamB) != 0
                  ? detail?.rateThan100
                    ? Math.floor(data?.layTeamB) + 1
                    : Math.floor(data?.layTeamB) + 1 > 100
                    ? "-"
                    : Math.floor(data?.layTeamB) + 1
                  : "-"}
              </span>
            </div>

            {/* {!isMobile && ( */}
            <div className="manualBackBox lay3Background">
              <span className={`rateFont manualRate1Box`}>
                {Math.floor(data?.layTeamB) != 0
                  ? detail?.rateThan100
                    ? Math.floor(data?.layTeamB) + 2
                    : Math.floor(data?.layTeamB) + 2 > 100
                    ? "-"
                    : Math.floor(data?.layTeamB) + 2
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        {data?.type?.includes("quickbookmaker") && detail?.teamC && (
          <div className="manualTeamTab">
            {/* {data?.activeStatus != "live" && (
              <div className="suspended-overlayRatesmanual">
                <span
                  className={`${
                    !isMobile ? "f-size18" : "f-size16"
                  } suspendedTxtmanual`}
                ></span>
              </div>
            )} */}
            <div
              className="manualTeam"
              style={isMobile ? { width: "28%" } : {}}
            >
              <span className={`teamFont manualTeamTxt`}>
                {detail?.teamC?.length > 25
                  ? `${detail?.teamC?.slice(0, 25)}...`
                  : detail?.teamC}
              </span>{" "}
              <div className="d-flex flex-row w-100">
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
              className={`manualRateBox ${
                isMobile ? "rateBoxWidth" : "rateBoxWidth"
              }`}
              // style={{ width: isMobile ? "40%" : isLap ? "360px" : "480px" }}
            >
              {data?.statusTeamC != "active" && (
                <div className="suspended-overlayRatesmanual">
                  <span className={`suspendTextCmmn`}>
                    {data?.statusTeamC?.toUpperCase()}
                  </span>
                </div>
              )}
              {/* {!isMobile && ( */}
              <div className="manualBackBox back3Background">
                <span className={`rateFont manualRate1Box`}>
                  {Math.floor(data?.backTeamC) != 0
                    ? Math.floor(data?.backTeamC) - 2 > 0
                      ? Math.floor(data?.backTeamC) - 2
                      : "-"
                    : "-"}
                </span>
              </div>

              {/* {!isMobile && ( */}
              <div className="manualBackBox back2Background">
                <span className={`rateFont manualRate1Box`}>
                  {Math.floor(data?.backTeamC) != 0
                    ? Math.floor(data?.backTeamC) - 1 > 0
                      ? Math.floor(data?.backTeamC) - 1
                      : "-"
                    : "-"}
                </span>
              </div>

              <div className="manualBackBox back1Background">
                <span className={`rateFont manualRate1Box`}>
                  {data?.backTeamC != 0 ? data?.backTeamC : "-"}
                </span>
              </div>
              <div className="manualBackBox lay1Background">
                <span className={`rateFont manualRate1Box`}>
                  {data?.layTeamC != 0 ? data?.layTeamC : "-"}
                </span>
              </div>
              <div className="manualBackBox lay2Background">
                <span className={`rateFont manualRate1Box`}>
                  {Math.floor(data?.layTeamC) != 0
                    ? detail?.rateThan100
                      ? Math.floor(data?.layTeamC) + 1
                      : Math.floor(data?.layTeamC) + 1 > 100
                      ? "-"
                      : Math.floor(data?.layTeamC) + 1
                    : "-"}
                </span>
              </div>

              <div className="manualBackBox lay3Background">
                <span className={`rateFont manualRate1Box`}>
                  {Math.floor(data?.layTeamC) != 0
                    ? detail?.rateThan100
                      ? Math.floor(data?.layTeamC) + 2
                      : Math.floor(data?.layTeamC) + 2 > 100
                      ? "-"
                      : Math.floor(data?.layTeamC) + 2
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ManualMarket;
