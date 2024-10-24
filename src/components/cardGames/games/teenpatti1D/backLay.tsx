import { useState } from "react";
import { formatNumber } from "../../../../helpers";

const BackLay = ({ data, odds }: any) => {
  const [openDivIds, setOpenDivIds] = useState<string[]>([]);
  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };
  return (
    <div className="w-100 d-flex flex-row">
      <div className="w-50 d-flex flex-column">
        <div className="w-100" style={{ height: "30px" }}></div>
        <div
          className="w-80 d-flex flex-row gap-5 align-items-center justify-content-between mt-1 px-2"
          style={{ height: "30px", backgroundColor: "#ddd" }}
        >
          <span className="title-14 w-100 f-bold">{odds?.[0]?.nation}</span>
          <div
            className="d-flex flex-row gap-2 position-relative justify-content-between"
            style={{ width: "30%" }}
          >
            <span
              className={`title-16 text-red f-bold  ${
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[0]?.sectionId}_card`
                    ]
                    ? JSON.parse(
                        data?.profitLoss[
                          `${data?.videoInfo?.mid}_${odds?.[0]?.sectionId}_card`
                        ]
                      )["playera"] > 0
                      ? "color-green"
                      : JSON.parse(
                          data?.profitLoss[
                            `${data?.videoInfo?.mid}_${odds?.[0]?.sectionId}_card`
                          ]
                        )["playera"] < 0
                      ? "color-red"
                      : ""
                    : ""
                  : ""
              }`}
            >
              {data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[0]?.sectionId}_card`
                  ]
                  ? JSON.parse(
                      data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[0]?.sectionId}_card`
                      ]
                    )["playera"]
                  : 0
                : 0}
            </span>
            <div
              onClick={() => toggleDiv("demo0")}
              className="range-icon d-inline-block me-"
            >
              <i className="fas fa-info-circle float-right"></i>{" "}
              <div
                id="demo0"
                className={`icon-range-dt20 collapse ${
                  openDivIds.includes("demo0") ? "show" : ""
                }`}
              >
                R:<span>{parseFloat(odds?.[0]?.min)}</span>-
                <span>{formatNumber(odds?.[0]?.max)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-50 d-flex flex-row" style={{ gap: "10px" }}>
        <div className="w-50 d-flex flex-column justify-content-center align-items-center">
          <div className="title-14 f-bold" style={{ height: "30px" }}>
            Back
          </div>
          <div
            className="w-100 d-flex justify-content-center align-items-center position-relative"
            style={{ height: "40px", border: "2px solid #72bbef" }}
          >
            {(odds?.[0]?.gstatus === "SUSPENDED" ||
              odds?.[0]?.gstatus === "CLOSED") && (
              <div className="dt20bLock"></div>
            )}
            <span className="title-15 f-bold">
              {odds?.[0]?.b1 == "0"
                ? "0"
                : parseFloat((Number(odds?.[0]?.b1) * 0.01 + 1).toFixed(2))}
            </span>
          </div>
        </div>
        <div className="w-50 d-flex flex-column justify-content-center align-items-center">
          <div className="title-14 f-bold" style={{ height: "30px" }}>
            Lay
          </div>
          <div
            className="w-100 d-flex justify-content-center align-items-center position-relative"
            style={{ height: "40px", border: "2px solid #f994ba" }}
          >
            {(odds?.[0]?.gstatus === "SUSPENDED" ||
              odds?.[0]?.gstatus === "CLOSED") && (
              <div className="dt20bLock"></div>
            )}
            <span className="title-15 f-bold">
              {odds?.[0]?.l1 == "0"
                ? "0"
                : parseFloat((Number(odds?.[0]?.l1) * 0.01 + 1).toFixed(2))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BackLay;
