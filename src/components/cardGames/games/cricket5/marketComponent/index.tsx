import "./style.scss";
const MarketComponent = ({ odds, data }: any) => {
  const team1 = odds?.[0];
  const team2 = odds?.[1];

  return (
    <div className="detail-page-container-c">
      <div className="game-market-c market-2">
        <div className="marketHeader5 text-white">
          <span>Bookmaker</span>
        </div>
        <div className="market-header-c">
          <div className="market-nation-detail-b">
            <span
              className="f600"
              style={{ fontSize: "12px", color: "#097c93" }}
            ></span>
          </div>
          <div className="market-odd-box-c back-cell-A">
            <b>Back</b>
          </div>
          <div className="market-odd-box-c lay-cell-A">
            <b>Lay</b>
          </div>
        </div>
        <div className="market-body-c" data-title="OPEN">
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
                        ? " color-green"
                        : JSON.parse(
                            data?.profitLoss[
                              `${data?.videoInfo?.mid}_${team1?.sid}_card`
                            ]
                          )["aus"] < 0
                        ? " color-red"
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
              <div className="market-odd-box-c back-cell-A lh-1">
                <span className="market-odd-c">
                  {team1?.b1 === "0.00" ? "-" : team1?.b1}
                </span>
                <span className="market-volume-c">{team1?.bs1}</span>
              </div>
              <div className="market-odd-box-c lay-cell-A lh-1">
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
                        ? " color-green"
                        : JSON.parse(
                            data?.profitLoss[
                              `${data?.videoInfo?.mid}_${team1?.sid}_card`
                            ]
                          )["ind"] < 0
                        ? " color-red"
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
              <div className="market-odd-box-c back-cell-A lh-1">
                <span className="market-odd-c">
                  {team2?.b1 === "0.00" ? "-" : team2?.b1}
                </span>
                <span className="market-volume-c">{team2?.bs1}</span>
              </div>
              <div className="market-odd-box-c lay-cell-A lh-1">
                <span className="market-odd-c">
                  {team2?.l1 === "0.00" ? "-" : team2?.l1}
                </span>
                <span className="market-volume">{team2?.ls1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketComponent;
