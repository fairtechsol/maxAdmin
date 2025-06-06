import { dragonTigerCards } from "../../../../utils/Constants";
import { HandleCards } from "../../../commonComponent/cardsComponent";

const HighCards = ({ odds, data, placedHigh }: any) => {
  return (
    <div
      className={`LowCommonCardImgContainer ${
        odds?.gstatus === "0" ? "suspended" : ""
      }`}
      style={{ border: "1px solid #c7c8ca" }}
    >
      <div className="lowCardContainer">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#097c93" }}>High</span>
          {<HandleCards card="9HH" />}
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {dragonTigerCards.slice(9, 13).map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <div key={item?.code}>
                <img src={item?.imgSrc} width={"30px"} />
              </div>
              <span
                style={{
                  fontSize: "12px",
                  display: "flex",
                  justifyContent: "center",
                }}
              ></span>
            </div>
          ))}
        </div>
        <span
          style={{
            fontSize: "12px",
            display: "flex",
            justifyContent: "center",
            zIndex: "999",
          }}
          className={`${
            data?.profitLoss
              ? data?.profitLoss[`${data?.videoInfo?.mid}_2_card`]
                ? data?.profitLoss[`${data?.videoInfo?.mid}_2_card`] > 0
                  ? "color-green"
                  : data?.profitLoss[`${data?.videoInfo?.mid}_2_card`] < 0
                  ? "color-red"
                  : ""
                : ""
              : ""
          }`}
        >
          {data?.profitLoss ? (
            data?.profitLoss[`${data?.videoInfo?.mid}_2_card`] ? (
              data?.profitLoss[`${data?.videoInfo?.mid}_2_card`]
            ) : (
              <br></br>
            )
          ) : (
            0
          )}
        </span>
      </div>
    </div>
  );
};
export default HighCards;
