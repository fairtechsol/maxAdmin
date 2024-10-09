// import SmoothDropdownModal from "../minMaxModal";
import { useState } from "react";
import { formatNumber } from "../../../../../helpers";
// import { IoInformationCircle } from "react-icons/io5";

const OddEven = ({ data, odds }: any) => {

  const player8 = odds?.slice(0, 2);
  const player9 = odds?.slice(2, 4);
  const player10 = odds?.slice(4, 6);
  const player11 = odds?.slice(6, 8);
 
  const [openDivIds, setOpenDivIds] = useState<string[]>([]);
  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };
  console.warn(data,"odds", player8);
  return (
    <div className="card32container-B">
    <div className="card32BackLay">
      <div className="borderBox" style={{ width: "34%" }}></div>
      <div className="card32bBackLay borderBox">Odd</div>
      <div className="card32bBackLay borderBox">Even</div>
    </div>
   
          <div className="d-flex w-100 flex-column">
            <div className="card32bRateBox">
              <div className="card32bNameBox borderBox">
                <span className="title-14 f-bold">player 8</span>
                <div className="d-flex flex-row">
                  <div
                    onClick={() => toggleDiv(player8?.[0]?.sid)}
                    className="range-icon d-inline-block"
                  >
                    <i className="fas fa-info-circle float-right"></i>{" "}
                    <div
                      id={player8?.[0]?.sid}
                      className={`icon-range-B collapse ${
                        openDivIds.includes(player8?.[0]?.sid) ? "show" : ""
                      }`}
                    >
                      R:<span>{parseFloat(player8?.[0]?.min)}</span>-<span>{formatNumber(player8?.[0]?.max)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card32bBackRate back-cell-B borderBox">
              {(player8?.[0]?.gstatus==="SUSPENDED" || player8?.[0]?.gstatus==="CLOSED") && <div className="card32bLock"></div>}
                <span className="title-14 f-bold">{player8?.[0]?.b1}</span>
              </div>
              <div className="card32bBackRate back-cell-B borderBox">
              {(player8?.[1]?.gstatus==="SUSPENDED" || player8?.[1]?.gstatus==="CLOSED") && <div className="card32bLock"></div>}
                <span className="title-14 f-bold">{player8?.[1]?.b1}</span>
              </div>
            </div>
            <div
              className="w-100 d-flex flex-row"
              style={{ backgroundColor: "#fff", height: "30px" }}
            >
              <div style={{width:"34%"}}></div>
              <div className="d-flex justify-content-center align-items-center" style={{width:"33%"}}>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player8?.[0]?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${player8?.[0]?.sid}_card`
                        ] > 0
                        ? "color-green"
                        : data?.profitLoss[
                            `${data?.videoInfo?.mid}_${player8?.[0]?.sid}_card`
                          ] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${player8?.[0]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player8?.[0]?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
              </div>
              <div className="d-flex justify-content-center align-items-center" style={{width:"33%"}}>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player8?.[1]?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${player8?.[1]?.sid}_card`
                        ] > 0
                        ? "color-green"
                        : data?.profitLoss[
                            `${data?.videoInfo?.mid}_${player8?.[1]?.sid}_card`
                          ] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${player8?.[1]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player8?.[1]?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
              </div>
            </div>
          </div>

          <div className="d-flex w-100 flex-column">
            <div className="card32bRateBox">
              <div className="card32bNameBox borderBox">
                <span className="title-14 f-bold">player 9</span>
                <div className="d-flex flex-row">
                  <div
                    onClick={() => toggleDiv(player9?.[0]?.sid)}
                    className="range-icon d-inline-block"
                  >
                    <i className="fas fa-info-circle float-right"></i>{" "}
                    <div
                      id={player9?.[0]?.sid}
                      className={`icon-range-B collapse ${
                        openDivIds.includes(player9?.[0]?.sid) ? "show" : ""
                      }`}
                    >
                      R:<span>{parseFloat(player9?.[0]?.min)}</span>-<span>{formatNumber(player9?.[0]?.max)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card32bBackRate back-cell-B borderBox">
              {(player9?.[0]?.gstatus==="SUSPENDED" || player9?.[0]?.gstatus==="CLOSED") && <div className="card32bLock"></div>}
                <span className="title-14 f-bold">{player9?.[0]?.b1}</span>
              </div>
              <div className="card32bBackRate back-cell-B borderBox">
              {(player9?.[1]?.gstatus==="SUSPENDED" || player9?.[1]?.gstatus==="CLOSED") && <div className="card32bLock"></div>}
                <span className="title-14 f-bold">{player9?.[1]?.b1}</span>
              </div>
            </div>
            <div
              className="w-100 d-flex flex-row"
              style={{ backgroundColor: "#fff", height: "30px" }}
            >
              <div style={{width:"34%"}}></div>
              <div className="d-flex justify-content-center align-items-center" style={{width:"33%"}}>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player9?.[0]?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${player9?.[0]?.sid}_card`
                        ] > 0
                        ? "color-green"
                        : data?.profitLoss[
                            `${data?.videoInfo?.mid}_${player9?.[0]?.sid}_card`
                          ] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${player9?.[0]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player9?.[0]?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
              </div>
              <div className="d-flex justify-content-center align-items-center" style={{width:"33%"}}>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player9?.[1]?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${player9?.[1]?.sid}_card`
                        ] > 0
                        ? "color-green"
                        : data?.profitLoss[
                            `${data?.videoInfo?.mid}_${player9?.[1]?.sid}_card`
                          ] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${player9?.[1]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player9?.[1]?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
              </div>
            </div>
          </div>

          <div className="d-flex w-100 flex-column">
            <div className="card32bRateBox">
              <div className="card32bNameBox borderBox">
                <span className="title-14 f-bold">player 10</span>
                <div className="d-flex flex-row">
                  <div
                    onClick={() => toggleDiv(player10?.[0]?.sid)}
                    className="range-icon d-inline-block"
                  >
                    <i className="fas fa-info-circle float-right"></i>{" "}
                    <div
                      id={player10?.[0]?.sid}
                      className={`icon-range-B collapse ${
                        openDivIds.includes(player10?.[0]?.sid) ? "show" : ""
                      }`}
                    >
                      R:<span>{parseFloat(player10?.[0]?.min)}</span>-<span>{formatNumber(player10?.[0]?.max)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card32bBackRate back-cell-B borderBox">
              {(player10?.[0]?.gstatus==="SUSPENDED" || player10?.[0]?.gstatus==="CLOSED") && <div className="card32bLock"></div>}
                <span className="title-14 f-bold">{player10?.[0]?.b1}</span>
              </div>
              <div className="card32bBackRate back-cell-B borderBox">
              {(player10?.[1]?.gstatus==="SUSPENDED" || player10?.[1]?.gstatus==="CLOSED") && <div className="card32bLock"></div>}
                <span className="title-14 f-bold">{player10?.[1]?.b1}</span>
              </div>
            </div>
            <div
              className="w-100 d-flex flex-row"
              style={{ backgroundColor: "#fff", height: "30px" }}
            >
              <div style={{width:"34%"}}></div>
              <div className="d-flex justify-content-center align-items-center" style={{width:"33%"}}>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player10?.[0]?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${player10?.[0]?.sid}_card`
                        ] > 0
                        ? "color-green"
                        : data?.profitLoss[
                            `${data?.videoInfo?.mid}_${player10?.[0]?.sid}_card`
                          ] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${player10?.[0]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player10?.[0]?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
              </div>
              <div className="d-flex justify-content-center align-items-center" style={{width:"33%"}}>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player10?.[1]?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${player10?.[1]?.sid}_card`
                        ] > 0
                        ? "color-green"
                        : data?.profitLoss[
                            `${data?.videoInfo?.mid}_${player10?.[1]?.sid}_card`
                          ] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${player10?.[1]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player10?.[1]?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
              </div>
            </div>
          </div>

          <div className="d-flex w-100 flex-column">
            <div className="card32bRateBox">
              <div className="card32bNameBox borderBox" >
                <span className="title-14 f-bold">player 11</span>
                <div className="d-flex flex-row" style={{position:"relative"}}>
                  <div
                    onClick={() => toggleDiv("demo4")}
                    className="range-icon d-inline-block"
                  >
                    <i className="fas fa-info-circle float-right"></i>{" "}
                    <div
                      id="demo4"
                      className={`icon-range-B collapse ${
                        openDivIds.includes("demo4") ? "show" : ""
                      }`}
                    >
                      R:<span>{parseFloat(player11?.[0]?.min)}</span>-<span>{formatNumber(player11?.[0]?.max)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card32bBackRate back-cell-B borderBox">
              {(player11?.[0]?.gstatus==="SUSPENDED" || player11?.[0]?.gstatus==="CLOSED") && <div className="card32bLock"></div>}
                <span className="title-14 f-bold">{player11?.[0]?.b1}</span>
              </div>
              <div className="card32bBackRate back-cell-B borderBox">
              {(player11?.[1]?.gstatus==="SUSPENDED" || player11?.[1]?.gstatus==="CLOSED") && <div className="card32bLock"></div>}
                <span className="title-14 f-bold">{player11?.[1]?.b1}</span>
              </div>
            </div>
            <div
              className="w-100 d-flex flex-row"
              style={{ backgroundColor: "#fff", height: "30px" }}
            >
              <div style={{width:"34%"}}></div>
              <div className="d-flex justify-content-center align-items-center" style={{width:"33%"}}>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player11?.[0]?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${player11?.[0]?.sid}_card`
                        ] > 0
                        ? "color-green"
                        : data?.profitLoss[
                            `${data?.videoInfo?.mid}_${player11?.[0]?.sid}_card`
                          ] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${player11?.[0]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player11?.[0]?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
              </div>
              <div className="d-flex justify-content-center align-items-center" style={{width:"33%"}}>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player11?.[1]?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${player11?.[1]?.sid}_card`
                        ] > 0
                        ? "color-green"
                        : data?.profitLoss[
                            `${data?.videoInfo?.mid}_${player11?.[1]?.sid}_card`
                          ] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${player11?.[1]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${player11?.[1]?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
              </div>
            </div>
          </div>
      
  </div>
  );
};

export default OddEven;
