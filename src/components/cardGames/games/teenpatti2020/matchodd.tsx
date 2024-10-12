import { useState } from "react";
import { formatNumber } from "../../../../helpers";

const Matchodd = ({ data, odds, name }: any) => {
  const [openDivIds, setOpenDivIds] = useState<string[]>([]);
  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };
//   console.log("odds", odds);
  return (
    <div className="w-100 d-flex flex-column">
      <div
        className="w-100 d-flex justify-content-start title-14"
        style={{ color: name === "Player A" ? "#fc4242" : "#ef910f" }}
      >
        {name}
      </div>
      <div className="w-100 d-flex flex-row justify-content-around">
        <div className="d-flex flex-row justify-content-center align-items-center position-relative">
          <span className="title-14">PLAYER</span>
          <div
            onClick={() => toggleDiv("demo0")}
            className="range-icon d-inline-block ms-1"
          >
            <i className="fas fa-info-circle float-right"></i>{" "}
            <div
              id="demo0"
              className={`icon-range-dt20 collapse ${
                openDivIds.includes("demo0") ? "show" : ""
              }`}
            >
              R:<span>{parseFloat(data?.videoInfo?.min)}</span>-
              <span>{formatNumber(data?.videoInfo?.max)}</span>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center position-relative">
          <span className="title-14">PAIR PLUS</span>
          <div
            onClick={() => toggleDiv("demo1")}
            className="range-icon d-inline-block ms-1"
          >
            <i className="fas fa-info-circle float-right"></i>{" "}
            <div
              id="demo1"
              className={`icon-range-dt20 collapse ${
                openDivIds.includes("demo1") ? "show" : ""
              }`}
            >
              R:<span>{parseFloat(data?.videoInfo?.min)}</span>-
              <span>{formatNumber(data?.videoInfo?.max)}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-100 d-flex flex-row justify-content-around"
        style={{ gap: "5px", height: "36px" }}
      >
        <div
          className="w-50 d-flex justify-content-center align-items-center title-15 f-bold position-relative"
          style={{ border: "2px solid #72bbef" }}
        >
          {odds?.[0]?.gstatus === "0" && <div className="dt20bLock"></div>}
          {parseFloat(odds?.[0]?.rate)}
        </div>
        <div
          className="w-50 d-flex justify-content-center align-items-center title-15 f-bold position-relative"
          style={{ border: "2px solid #72bbef" }}
        >
          {odds?.[1]?.gstatus === "0" && <div className="dt20bLock"></div>}
          {parseFloat(odds?.[1]?.rate)}
        </div>
      </div>
      <div className="w-100 d-flex flex-row justify-content-around">
        <span
          className={`title-12 text-red f-bold ${
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
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                ]
              : 0
            : 0}
        </span>
        <span
          className={`title-12 text-red f-bold ${
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
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                ]
              : 0
            : 0}
        </span>
      </div>
    </div>
  );
};
export default Matchodd;
