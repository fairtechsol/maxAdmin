import { useState } from "react";
import { formatNumber } from "../../../../../helpers";

const TotalsBox = ({ odds, data }: any) => {
  const [openDivIds, setOpenDivIds] = useState<string[]>([]);

  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };

  const handleLock = (item: any, type: string) => {
    if (type == "back") {
      if (item?.gstatus != "ACTIVE" || item?.b1 === "0.00") {
        return true;
      } else {
        return false;
      }
    } else {
      if (item?.gstatus != "ACTIVE" || item?.l1 === "0.00") {
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    <>
      <div className="totalContainer title-14">
        <div className="total-mainRateBox">
          <div style={{ width: "30%" }}>
            <span></span>
          </div>
          <div className="total-rateBox">
            <span className="f600">No</span>
          </div>
          <div className="total-rateBox">
            <span className="f600">Yes</span>
          </div>
        </div>
        <div className="total-mainRateBox">
          <div className="total-rateBox">
            <span className="f600">Total points</span>
            <span
              onClick={() => toggleDiv("demo0")}
              className="range-icon d-inline-block ms-1"
            >
              <i className="fas fa-info-circle float-right"></i>
              <div
                id="demo0"
                className={`icon-range-dt1day collapse ${
                  openDivIds.includes("demo0") ? "show" : ""
                }`}
              >
                R:<span>{parseFloat(odds?.[0]?.min)}</span>-
                <span>{formatNumber(odds?.[0]?.max)}</span>
              </div>
            </span>
          </div>
          <div
            className={`total-rateBox lay-BackGround cursor-pointer flex-column ${
              handleLock(odds?.[0], "lay") ? "suspended" : ""
            }`}
          >
            <span className="rate-box">{odds?.[0]?.l1}</span>{" "}
            <span className="casino-volume f400">{odds?.[0]?.ls1}</span>
          </div>
          <div
            className={`total-rateBox back-BackGround cursor-pointer flex-column ${
              handleLock(odds?.[0], "back") ? "suspended" : ""
            }`}
          >
            <span className="rate-box">{odds?.[0]?.b1}</span>{" "}
            <span className="casino-volume f400">{odds?.[0]?.bs1}</span>
          </div>
        </div>

        <div className="total-mainRateBox">
          <div style={{ width: "33%" }}>
            <span></span>
          </div>
          <div
            className="justify-content-center align-items-center"
            style={{ width: "65%", display: "flex" }}
          >
            <span
              className={`color-red ${
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
          </div>
        </div>

        <div className="total-mainRateBox">
          <div style={{ width: "30%" }}>
            <span></span>
          </div>
          <div className="total-rateBox">
            <span className="f600">No</span>
          </div>
          <div className="total-rateBox">
            <span className="f600">Yes</span>
          </div>
        </div>
        <div className="total-mainRateBox">
          <div className="total-rateBox">
            <span className="f600">Total cards</span>
            <span
              onClick={() => toggleDiv("demo")}
              className="range-icon d-inline-block ms-1"
            >
              <i className="fas fa-info-circle float-right"></i>
              <div
                id="demo"
                className={`icon-range-dt1day collapse ${
                  openDivIds.includes("demo") ? "show" : ""
                }`}
              >
                R:<span>{parseFloat(odds?.[1]?.min)}</span>-
                <span>{formatNumber(odds?.[1]?.max)}</span>
              </div>
            </span>
          </div>
          <div
            className={`total-rateBox lay-BackGround cursor-pointer flex-column ${
              handleLock(odds?.[1], "lay") ? "suspended" : ""
            }`}
          >
            <span className="rate-box">{odds?.[1]?.l1}</span>{" "}
            <span className="casino-volume f400">{odds?.[1]?.ls1}</span>
          </div>
          <div
            className={`total-rateBox back-BackGround cursor-pointer flex-column ${
              handleLock(odds?.[1], "back") ? "suspended" : ""
            }`}
          >
            <span className="rate-box">{odds?.[1]?.b1}</span>{" "}
            <span className="casino-volume f400">{odds?.[1]?.bs1}</span>
          </div>
        </div>
        <div className="total-mainRateBox">
          <div style={{ width: "33%" }}>
            <span></span>
          </div>
          <div
            className="justify-content-center align-items-center"
            style={{ width: "65%", display: "flex" }}
          >
            <span
              className={`color-red ${
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
      </div>
    </>
  );
};

export default TotalsBox;
