import { useState } from "react";
import "./style.scss";
import { formatNumber } from "../../../../../helpers";
const DynamicTable = ({ odds, data, playerNum }: any) => {
  let player1Key = `player${playerNum[0]}`;
  let player2Key = `player${playerNum[1]}`;
  const [openDivId, setOpenDivId] = useState(null);

  const toggleDiv = (id: any) => {
    setOpenDivId(openDivId === id ? null : id); 
  };
  console.log('first',odds);
  return (
    <div className="card32-table-container">
      {/* <div className="card32-table-row" style={{ lineHeight: 2 }}>
        <div style={{ width: "50%" }}></div>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="card32-table-item back-cell" style={{ width: "50%" }}>
            BACK
          </div>
          <div className="card32-table-item lay-cell" style={{ width: "50%" }}>
            LAY
          </div>
        </div>
      </div> */}
      <div className="card32-table-row" style={{ lineHeight: 1 }}>
        <div
          style={{
            width: "50%",
            padding: "8px",
            border: "0.1px solid #fff",
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between",
            cursor: "pointer",
            position:"relative"
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
            {odds?.[0]?.nat || odds?.[0]?.nation}
          </span>
          <div>
          <span
            className={`me-1 ${
              data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                  ? JSON.parse(
                      data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    )[player1Key] > 0
                    ? "color-green"
                    : JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )[player1Key] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                ? JSON.parse(
                    data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                  )[player1Key]
                : 0
              : 0}
          </span>
          <div
                      onClick={() => toggleDiv("demo0")}
                      className="range-icon d-inline-block"
                    >
                      <i
                        className="fas fa-info-circle float-right"
                      ></i>{" "}
                      <div
                        id="demo0"
                        className={`icon-range-A collapse ${
                          openDivId === "demo0" ? "show" : ""
                        }`}
                      >
                        R:<span>{data?.videoInfo?.min}</span>-<span>{formatNumber(data?.videoInfo?.max)}</span>
                      </div>
                    </div>
          </div>
         
        </div>
        <div
          className={
            odds?.[0]?.gstatus === "SUSPENDED" ||
            odds?.[0]?.gstatus === "CLOSED"
              ? "suspended"
              : ""
          }
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
        >
          <div className="card32-table-item back-cell-A" style={{ width: "50%" }}>
            <span className="f12-b">{odds?.[0]?.b1}</span>
            <span className="f10-b">{odds?.[0]?.bs1}</span>
          </div>
          <div className="card32-table-item lay-cell-A" style={{ width: "50%" }}>
            <span className="f12-b">{odds?.[0]?.l1}</span>
            <span className="f10-b">{odds?.[0]?.ls1}</span>
          </div>
        </div>
      </div>
      <div className="card32-table-row" style={{ lineHeight: 1 }}>
        <div
          style={{
            width: "50%",
            padding: "10px",
            border: "0.1px solid #fff",
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
            justifyContent:"space-between",
            position:"relative"
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
            {odds?.[1]?.nat || odds?.[1]?.nation}
          </span>
          <div>
          <span
            className={`me-1 ${
              data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                  ? JSON.parse(
                      data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    )[player2Key] > 0
                    ? "color-green"
                    : JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )[player2Key] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                ? JSON.parse(
                    data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                  )[player2Key]
                : 0
              : 0}
          </span>
          <div
                      onClick={() => toggleDiv("demo0")}
                      className="range-icon d-inline-block"
                    >
                      <i
                        className="fas fa-info-circle float-right"
                      ></i>{" "}
                      <div
                        id="demo0"
                        className={`icon-range-A collapse ${
                          openDivId === "demo0" ? "show" : ""
                        }`}
                      >
                        R:<span>{data?.videoInfo?.min}</span>-<span>{formatNumber(data?.videoInfo?.max)}</span>
                      </div>
                    </div>
          </div>
          
        </div>
        <div
          className={
            odds?.[1]?.gstatus === "SUSPENDED" ||
            odds?.[1]?.gstatus === "CLOSED"
              ? "suspended"
              : ""
          }
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
        >
          <div className="card32-table-item back-cell-A" style={{ width: "50%" }}>
            <span className="f12-b">{odds?.[1]?.b1}</span>
            <span className="f10-b">{odds?.[1]?.bs1}</span>
          </div>
          <div className="card32-table-item lay-cell-A" style={{ width: "50%" }}>
            <span className="f12-b">{odds?.[1]?.l1}</span>
            <span className="f10-b">{odds?.[1]?.ls1}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
