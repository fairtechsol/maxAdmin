import { HandleGameCards } from "../card";
import PieChart from "../chart";

export const options = {
  is3D: true,
  backgroundColor: "none",
  chartArea: { left: 0, top: 0, width: "180", height: "200" },
};
const BaccaratStatistics = ({ odds, graphsData, cardData, data }: any) => {
  const dataa = [
    ["Task", "Hours per Day"],
    ["Player", graphsData ? graphsData?.P : 45],
    ["Banker", graphsData ? graphsData?.B : 45],
    ["Tie", graphsData ? graphsData?.T : 10],
  ];
  return (
    <div className="baccarateContainer">
      <div className="baccarateChartContainer">
        <h4>Statistics</h4>
        <PieChart data={dataa} options={options} />
      </div>
      <div className="baccarateRateContainer">
        <div className="baccarateRateContainer1">
          <div
            className={`perfectpairBox ${
              odds?.[5]?.gstatus == "0" ? "suspended-box" : ""
            }`}
          >
            <span>Perfect Pair</span>
            <span>{parseFloat(odds?.[5]?.b1 ?? 0)}:1</span>
          </div>
          <div
            className={`perfectpairBox ${
              odds?.[6]?.gstatus == "0" ? "suspended-box" : ""
            }`}
          >
            <span>Big</span>
            <span>{parseFloat(odds?.[6]?.b1 ?? 0)}:1</span>
          </div>
          <div
            className={`perfectpairBox ${
              odds?.[7]?.gstatus == "0" ? "suspended-box" : ""
            }`}
          >
            <span>Small</span>
            <span>{parseFloat(odds?.[7]?.b1 ?? 0)}:1</span>
          </div>
          <div
            className={`perfectpairBox ${
              odds?.[8]?.gstatus == "0" ? "suspended-box" : ""
            }`}
          >
            <span>Either Pair</span>
            <span>{parseFloat(odds?.[8]?.b1 ?? 0)}:1</span>
          </div>
        </div>

        <div className="baccarateRateContainer1">
          <div
            className={`perfectpairBoxpl ${
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[5]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[5]?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[5]?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[5]?.sid}_card`
                ]
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[6]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[6]?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[6]?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[6]?.sid}_card`
                ]
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[7]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[7]?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[7]?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[7]?.sid}_card`
                ]
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[8]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[8]?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[8]?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[8]?.sid}_card`
                ]
              : ""}
          </div>
        </div>

        <div className="baccarateRateContainer1">
          <div
            className={`baccaratePlayerBox ${
              odds?.[3]?.gstatus == "0" ? "suspended-box" : ""
            }`}
          >
            <span>Player Pair</span>
            <span>{parseFloat(odds?.[3]?.b1 ?? 0)}:1</span>
          </div>
          <div className="baccarateTieBox">
            <div
              className={`baccarateTieBox1 ${
                odds?.[0]?.gstatus == "0" ? "suspended-box" : ""
              }`}
            >
              <span>Player</span>
              <span>{parseFloat(odds?.[0]?.b1 ?? 0)}:1</span>
              <div
                className="bacarrateCards"
                style={{ width: cardData?.C5 != "1" ? "75px" : "45px" }}
              >
                {cardData?.C5 != "1" && (
                  <div style={{ transform: "rotate(270deg)", zIndex: "999" }}>
                    <HandleGameCards card={cardData?.C5} />
                  </div>
                )}
                <HandleGameCards card={cardData?.C1} />
                <HandleGameCards card={cardData?.C3} />
              </div>
            </div>
            <div
              className={`baccarateTieBox2 ${
                odds?.[2]?.gstatus == "0" ? "suspended-box" : ""
              }`}
            >
              <span>Tie</span>
              <span>{parseFloat(odds?.[2]?.b1 ?? 0)}:1</span>
            </div>
            <div
              className={`baccarateTieBox3 ${
                odds?.[1]?.gstatus == "0" ? "suspended-box" : ""
              }`}
            >
              <span>Banker</span>
              <span>{parseFloat(odds?.[1]?.b1 ?? 0)}:1</span>
              <div
                className="bacarrateCards"
                style={{ width: cardData?.C6 != "1" ? "75px" : "45px" }}
              >
                <HandleGameCards card={cardData?.C2} />
                <HandleGameCards card={cardData?.C4} />
                {cardData?.C6 != "1" && (
                  <div style={{ transform: "rotate(90deg)", zIndex: "999" }}>
                    <HandleGameCards card={cardData?.C6} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className={`baccarateBankerBox ${
              odds?.[4]?.gstatus == "0" ? "suspended-box" : ""
            }`}
          >
            <span>Banker Pair</span>
            <span>{parseFloat(odds?.[4]?.b1 ?? 0)}:1</span>
          </div>
        </div>
        <div className="baccarateRateContainer1">
          <div
            className={`perfectpairBoxpl ${
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                ]
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                ]
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                ]
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                ]
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[4]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[4]?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[4]?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[4]?.sid}_card`
                ]
              : ""}
          </div>
        </div>
        <div className="baccarateMinMax">
          <span className="f600">Min:</span>
          {odds?.[0]?.min} <span className="f600">Max:</span>
          {odds?.[0]?.max}
        </div>
      </div>
    </div>
  );
};

export default BaccaratStatistics;
