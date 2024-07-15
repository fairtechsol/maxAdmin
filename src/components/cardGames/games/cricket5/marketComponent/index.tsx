import "./style.scss";

const fancyData = [
  { nation: "Ind Over 3", backOdd: "-", layOdd: "-", suspended: true },
];

const MarketComponent = ({ showFancy, odds, data, min, max }: any) => {
  const team1 = odds?.[0];
  const team2 = odds?.[1];

  return (
    <div className="casino-detail detail-page-container-c position-relative">
      <div className="game-market-c market-2">
        <div className="market-title">
          <span>Bookmaker</span>
        </div>
        <div className="market-header-c">
          <div className="market-nation-detail-b">
            <span
              className="f600"
              style={{ fontSize: "12px", color: "#097c93" }}
            >
              Min: {min} Max: {max}
            </span>
          </div>
          <div className="market-odd-box-c back">
            <b>Back</b>
          </div>
          <div className="market-odd-box-c lay">
            <b>Lay</b>
          </div>
        </div>
        <div className="market-body-c" data-title="OPEN">
          {/* {odds?.map((row:any, index:any) => ( */}
          <div className={`market-row-c`}>
            <div className="market-nation-detail-b">
              <span className="market-nation-name-c">{team1?.nat}</span>
              <div className="market-nation-book-c"></div>
              <span
                className={`${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${team1?.sid}_card`
                      ]
                      ? JSON.parse(
                          data?.profitLoss[
                            `${data?.videoInfo?.mid}_${team1?.sid}_card`
                          ]
                        )["aus"] > 0
                        ? "color-green"
                        : JSON.parse(
                            data?.profitLoss[
                              `${data?.videoInfo?.mid}_${team1?.sid}_card`
                            ]
                          )["aus"] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${team1?.sid}_card`
                    ]
                    ? JSON.parse(
                        data?.profitLoss[
                          `${data?.videoInfo?.mid}_${team1?.sid}_card`
                        ]
                      )["aus"]
                    : 0
                  : 0}
              </span>
            </div>
            <div
              className={`market-row-c ${
                team1?.status === "SUSPENDED" ? "suspended-row" : ""
              }`}
              data-title={
                team1?.status === "SUSPENDED" ? "SUSPENDED" : "ACTIVE"
              }
            >
              <div className="market-odd-box-c back lh-1">
                <span className="market-odd-c">
                  {team1?.b1 === "0.00" ? "-" : team1?.b1}
                </span>
                <span className="market-volume-c">{team1?.bs1}</span>
              </div>
              <div className="market-odd-box-c lay lh-1">
                <span className="market-odd-c">
                  {team1?.l1 === "0.00" ? "-" : team1?.l1}
                </span>
                <span className="market-volume">{team1?.ls1}</span>
              </div>
            </div>
          </div>
          <div className={`market-row-c`}>
            <div className="market-nation-detail-b">
              <span className="market-nation-name-c">{team2?.nat}</span>
              <div className="market-nation-book-c"></div>
              <span
                className={`${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${team1?.sid}_card`
                      ]
                      ? JSON.parse(
                          data?.profitLoss[
                            `${data?.videoInfo?.mid}_${team1?.sid}_card`
                          ]
                        )["ind"] > 0
                        ? "color-green"
                        : JSON.parse(
                            data?.profitLoss[
                              `${data?.videoInfo?.mid}_${team1?.sid}_card`
                            ]
                          )["ind"] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${team1?.sid}_card`
                    ]
                    ? JSON.parse(
                        data?.profitLoss[
                          `${data?.videoInfo?.mid}_${team1?.sid}_card`
                        ]
                      )["ind"]
                    : 0
                  : 0}
              </span>
            </div>
            <div
              className={`market-row-c ${
                team2?.status === "SUSPENDED" ? "suspended-row" : ""
              }`}
              data-title={
                team2?.status === "SUSPENDED" ? "SUSPENDED" : "ACTIVE"
              }
            >
              <div className="market-odd-box-c back lh-1">
                <span className="market-odd-c">
                  {team2?.b1 === "0.00" ? "-" : team2?.b1}
                </span>
                <span className="market-volume-c">{team2?.bs1}</span>
              </div>
              <div className="market-odd-box-c lay lh-1">
                <span className="market-odd-c">
                  {team2?.l1 === "0.00" ? "-" : team2?.l1}
                </span>
                <span className="market-volume">{team2?.ls1}</span>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>

      {showFancy && (
        <div className="game-market market-6 mt-2">
          <div className="market-title">
            <span>Fancy</span>
          </div>
          <div className="market-header-c">
            <div className="market-nation-detail-c"></div>
            <div className="market-odd-box-c lay">
              <b>No</b>
            </div>
            <div className="market-odd-box-c back">
              <b>Yes</b>
            </div>
            <div className="fancy-min-max-box"></div>
          </div>
          <div className="market-body-c" data-title="OPEN">
            {fancyData?.map((row: any, index: any) => (
              <div className={`fancy-market`}>
                <div className="market-row-c">
                  <div className="market-nation-detail-c">
                    <span className="market-nation-name-c pointer">
                      {row.nation}
                    </span>
                    <div className="market-nation-book-c"></div>
                  </div>
                  <div
                    className={`market-row-c ${
                      row.suspended ? "suspended-row" : ""
                    }`}
                    data-title={row.suspended ? "SUSPENDED" : "ACTIVE"}
                    key={index}
                  >
                    <div className="market-odd-box-c lay">
                      <span className="market-odd-c">{row.layOdd}</span>
                    </div>
                    <div className="market-odd-box-c back">
                      <span className="market-odd-c">{row.backOdd}</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 100.00</span>
                        <span className="w-100 d-block">Max: 1L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketComponent;
