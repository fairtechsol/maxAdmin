import { formatNumber } from "../../../../helpers";
import { HandleCards } from "../../../commonComponent/cardsComponent";
const Meter = ({
  data,
  runPosition,
  dragonTigerDetai,
}: {
  data: string;
  runPosition: string;
  dragonTigerDetai: any;
}) => {
  const cards = data?.split(",");

  const lowCards: string[] = [];
  const highCards: string[] = [];

  let lowCardSum = 0;
  let highCardSum = 0;

  cards?.forEach((card) => {
    if (card?.length < 3) return;
    const firstChar = card[0];

    if (
      firstChar === "1" ||
      firstChar === "J" ||
      firstChar === "Q" ||
      firstChar === "K"
    ) {
      highCards.push(card);
      highCardSum =
        highCardSum +
        (firstChar == "1"
          ? 10
          : firstChar == "J"
          ? 11
          : firstChar == "Q"
          ? 12
          : firstChar == "K"
          ? 13
          : 0);
    } else {
      lowCards.push(card);
      lowCardSum = lowCardSum + (firstChar == "A" ? 1 : Number(firstChar));
    }
  });

  return (
    <div style={{ marginTop: "5px", padding: "10px", gap: "15px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#ccc",
          justifyContent: "center",
        }}
      >
        <strong
          style={{
            textAlign: "center",
            color: "#17ec17",
            width: "10%",
            whiteSpace: "pre",
          }}
        >
          <span style={{ color: "#ef910f" }}>Low</span>{" "}
          {lowCardSum > 0 && lowCardSum}
        </strong>
        <div
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
          {lowCards?.map((card, index) => (
            <span key={index} style={{ margin: "5px" }}>
              <HandleCards card={card} />
            </span>
          ))}
          {/* {runPosition == "Low" && (
            <span style={{ color: "#FFFFFF", marginLeft: "5px" }}>
              Run Position:
              <span
                style={{
                  color: lowCardSum > highCardSum ? "#FFFFFF" : "#FF2238",
                }}
              >
                {lowCardSum - highCardSum}
              </span>
            </span>
          )} */}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "97%",
          }}
        >
          <span
            style={{ fontSize: "18px", color: "#BB2834", fontWeight: "bold" }}
          >
            {dragonTigerDetai?.profitLoss
              ? dragonTigerDetai?.profitLoss[
                  `${dragonTigerDetai?.videoInfo?.mid}_1_card`
                ]
                ? dragonTigerDetai?.profitLoss[
                    `${dragonTigerDetai?.videoInfo?.mid}_1_card`
                  ]
                : 0
              : 0}
          </span>{" "}
          <span style={{ fontSize: "12px" }}>
            R:<span>{dragonTigerDetai?.low?.min}</span>-
            <span>{formatNumber(dragonTigerDetai?.low?.max)}</span>
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#ccc",
          marginTop: "10px",
          justifyContent: "center",
        }}
      >
        <strong
          style={{
            textAlign: "center",
            color: "#17ec17",
            width: "10%",
            whiteSpace: "pre",
          }}
        >
          <span style={{ color: "#ef910f" }}>High</span>{" "}
          {highCardSum > 0 && highCardSum}
        </strong>
        <div
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
          {highCards.map((card, index) => (
            <span key={index} style={{ margin: "5px" }}>
              <HandleCards card={card} />
            </span>
          ))}
          {/* {runPosition == "High" && (
            <span style={{ color: "#FFFFFF", marginLeft: "5px" }}>
              Run Position:
              <span
                style={{
                  color: highCardSum > lowCardSum ? "#FFFFFF" : "#FF2238",
                }}
              >
                {highCardSum - lowCardSum}
              </span>
            </span>
          )} */}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "97%",
          }}
        >
          <span
            style={{ fontSize: "18px", color: "#BB2834", fontWeight: "bold" }}
          >
            {dragonTigerDetai?.profitLoss
              ? dragonTigerDetai?.profitLoss[
                  `${dragonTigerDetai?.videoInfo?.mid}_2_card`
                ]
                ? dragonTigerDetai?.profitLoss[
                    `${dragonTigerDetai?.videoInfo?.mid}_2_card`
                  ]
                : 0
              : 0}
          </span>{" "}
          <span style={{ fontSize: "12px" }}>
            R:<span>{dragonTigerDetai?.high?.min}</span>-
            <span>{formatNumber(dragonTigerDetai?.high?.max)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Meter;
