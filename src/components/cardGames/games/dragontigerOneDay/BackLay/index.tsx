import { useState } from "react";
import { formatNumber } from "../../../../../helpers";

const BackLay = ({ matchOddsData, data, odds }: any) => {
  const [openDivIds, setOpenDivIds] = useState<string[]>([]);

  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };
  return (
    <div className="w-100 d-flex flex-column">
      <div
        className="w-100 d-flex flex-row justify-content-around align-items-center mt-2"
        style={{ gap: "10px" }}
      >
        <div className="d-flex flex-column" style={{ width: "40%" }}>
          <div className="dt1dayDragon">
            <div className="w-50 d-flex flex-row justify-content-start align-items-center position-relative">
              <div
                onClick={() => toggleDiv("demo0")}
                className="range-icon d-inline-block ms-1"
              >
                <i className="fas fa-info-circle float-right"></i>{" "}
                <div
                  id="demo0"
                  className={`icon-range-dt1day collapse ${
                    openDivIds.includes("demo0") ? "show" : ""
                  }`}
                >
                  R:<span>{parseFloat(matchOddsData?.[0]?.min)}</span>-
                  <span>{formatNumber(matchOddsData?.[0]?.max)}</span>
                </div>
              </div>
              <span className="title-14 f-bold ms-1">
                {matchOddsData?.[0]?.nat || matchOddsData?.[0]?.nation}
              </span>
            </div>
            <div
              className="w-50 d-flex flex-row justify-content-around align-items-center p-2"
              style={{ gap: "5px" }}
            >
              <div
                className="w-50 d-flex justify-content-center align-items-center  title-15 f-bold position-relative"
                style={{ border: "2px solid #72bbef", height: "40px" }}
              >
                {(matchOddsData?.[0]?.gstatus === "SUSPENDED" ||
                  matchOddsData?.[0]?.gstatus === "CLOSED") && (
                  <div className="dt20bLock"></div>
                )}
                {parseFloat(matchOddsData?.[0]?.b1)}
              </div>
              <div
                className="w-50 d-flex justify-content-center align-items-center title-15 f-bold position-relative"
                style={{ border: "2px solid #f994ba", height: "40px" }}
              >
                {(matchOddsData?.[0]?.gstatus === "SUSPENDED" ||
                  matchOddsData?.[0]?.gstatus === "CLOSED") && (
                  <div className="dt20bLock"></div>
                )}
                {parseFloat(matchOddsData?.[0]?.l1)}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column" style={{ width: "20%" }}>
          <div className="dt1dayPair">
            <div className="w-50 d-flex flex-row justify-content-start align-items-center position-relative">
              <div
                onClick={() => toggleDiv("demo1")}
                className="range-icon d-inline-block ms-1"
              >
                <i className="fas fa-info-circle float-right"></i>{" "}
                <div
                  id="demo1"
                  className={`icon-range-dt1day collapse ${
                    openDivIds.includes("demo1") ? "show" : ""
                  }`}
                >
                  R:<span>{parseFloat(odds?.min)}</span>-
                  <span>{formatNumber(odds?.max)}</span>
                </div>
              </div>
              <span className="title-14 f-bold ms-1">
                {odds?.nat || odds?.nation}
              </span>
            </div>
            <div
              className="w-50 d-flex flex-row justify-content-around align-items-center p-2"
              style={{ gap: "5px" }}
            >
              <div
                className="w-100 d-flex justify-content-center align-items-center title-15 f-bold position-relative"
                style={{ border: "2px solid #72bbef", height: "40px" }}
              >
                {(odds?.gstatus === "SUSPENDED" ||
                  odds?.gstatus === "CLOSED") && (
                  <div className="dt20bLock"></div>
                )}
                {parseFloat(odds?.b1)}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column" style={{ width: "40%" }}>
          <div className="dt1dayTiger">
            <div className="w-50 d-flex flex-row justify-content-start align-items-center position-relative">
              <div
                onClick={() => toggleDiv("demo2")}
                className="range-icon d-inline-block ms-1"
              >
                <i className="fas fa-info-circle float-right"></i>{" "}
                <div
                  id="demo2"
                  className={`icon-range-dt1day collapse ${
                    openDivIds.includes("demo2") ? "show" : ""
                  }`}
                >
                  R:<span>{parseFloat(matchOddsData?.[1]?.min)}</span>-
                  <span>{formatNumber(matchOddsData?.[1]?.max)}</span>
                </div>
              </div>
              <span className="title-14 f-bold ms-1">
                {matchOddsData?.[1]?.nat || matchOddsData?.[1]?.nation}
              </span>
            </div>
            <div
              className="w-50 d-flex flex-row justify-content-around align-items-center p-2"
              style={{ gap: "5px" }}
            >
              <div
                className="w-50 d-flex justify-content-center align-items-center title-15 f-bold position-relative"
                style={{ border: "2px solid #72bbef", height: "40px" }}
              >
                {(matchOddsData?.[1]?.gstatus === "SUSPENDED" ||
                  matchOddsData?.[1]?.gstatus === "CLOSED") && (
                  <div className="dt20bLock"></div>
                )}
                {parseFloat(matchOddsData?.[1]?.b1)}
              </div>
              <div
                className="w-50 d-flex justify-content-center align-items-center title-15 f-bold position-relative"
                style={{ border: "2px solid #f994ba", height: "40px" }}
              >
                {(matchOddsData?.[1]?.gstatus === "SUSPENDED" ||
                  matchOddsData?.[1]?.gstatus === "CLOSED") && (
                  <div className="dt20bLock"></div>
                )}
                {parseFloat(matchOddsData?.[1]?.l1)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 d-flex flex-row justify-content-around">
        <span className={`text-red f-bold `}>
          {data?.profitLoss
            ? data?.profitLoss[
                `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
              ]
              ? JSON.parse(
                  data?.profitLoss[
                    `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                  ]
                )["dragon"]
              : 0
            : 0}
        </span>
        <span className="title-16 f-bold text-red">
          {data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.sid}_card`]
            ? data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.sid}_card`]
            : 0}
        </span>
        <span
          className={`text-red f-bold ${
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                ]
                ? JSON.parse(
                    data?.profitLoss[
                      `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                    ]
                  )["tiger"] > 0
                  ? "color-green title-16 f-bold"
                  : JSON.parse(
                      data?.profitLoss[
                        `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                      ]
                    )["tiger"] < 0
                  ? "color-red title-16 f-bold"
                  : ""
                : ""
              : ""
          }`}
        >
          {data?.profitLoss
            ? data?.profitLoss[
                `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
              ]
              ? JSON.parse(
                  data?.profitLoss[
                    `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                  ]
                )["tiger"]
              : 0
            : 0}
        </span>
      </div>
    </div>
  );
};

export default BackLay;
