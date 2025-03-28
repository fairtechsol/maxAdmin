import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { HandleCards2 } from "../../../../commonComponent/cardsComponent2";

const TeenPattiTableRow = ({ player, pairPlus, indx, cardsA }: any) => {
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  return (
    <div className="teenPatti-table-row" style={{ lineHeight: 1 }}>
      <div
        style={{
          width: "40%",
          height: "60px",
          padding: "10px",
          border: "0.1px solid #fff",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
          {player?.nation}
        </span>

        <HandleCards2 card={cardsA[indx] !== "1" ? cardsA[indx] : ""} />

        <HandleCards2 card={cardsA[9 + indx] !== "1" ? cardsA[indx + 9] : ""} />
        <HandleCards2
          card={cardsA[18 + indx] !== "1" ? cardsA[indx + 18] : ""}
        />
      </div>
      <div
        className={player.gstatus === "0" ? "suspended" : ""}
        style={{
          width: "60%",
          backgroundColor: "#72bbef",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className="teenPatti-table-item" style={{ width: "50%" }}>
          <span className="f12-b">{player.rate}</span>
          <span
            className={`f10-b ${"profit-loss-class"} ${
              dragonTigerDetail?.profitLoss
                ? dragonTigerDetail?.profitLoss[
                    `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                  ]
                  ? dragonTigerDetail?.profitLoss[
                      `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : dragonTigerDetail?.profitLoss[
                        `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {dragonTigerDetail?.profitLoss
              ? dragonTigerDetail?.profitLoss[
                  `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                ]
                ? dragonTigerDetail?.profitLoss[
                    `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                  ]
                : 0
              : 0}
          </span>
        </div>
        <div className="teenPatti-table-item" style={{ width: "50%" }}>
          <span className="f12-b">{pairPlus.nation}</span>
          <span
            className={`f10-b ${"profit-loss-class"} ${
              dragonTigerDetail?.profitLoss
                ? dragonTigerDetail?.profitLoss[
                    `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                  ]
                  ? dragonTigerDetail?.profitLoss[
                      `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : dragonTigerDetail?.profitLoss[
                        `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {dragonTigerDetail?.profitLoss
              ? dragonTigerDetail?.profitLoss[
                  `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                ]
                ? dragonTigerDetail?.profitLoss[
                    `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                  ]
                : 0
              : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeenPattiTableRow;
