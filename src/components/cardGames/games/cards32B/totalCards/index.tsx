// import SmoothDropdownModal from "../minMaxModal";
import { useState } from "react";
// import { IoInformationCircle } from "react-icons/io5";

import { formatNumber } from "../../../../../helpers";

const TotalCards = ({ data, odds }: any) => {
  const [openDivIds, setOpenDivIds] = useState<string[]>([]);
  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };
  return (
    <div className="card32container-B">
    <div className="card32BackLay">
      <div className="borderBox" style={{ width: "34%" }}></div>
      <div className="card32bBackLay borderBox" style={{width:"66%"}}>Back</div>
    </div>
    {odds?.map((item: any) => {
      return (
        <>
          <div className="d-flex w-100 flex-column">
            <div className="card32bRateBox">
              <div className="card32bNameBox borderBox">
                <span className="title-14 f-bold">{item?.nation}</span>
                <div className="d-flex flex-row">
                
                  <div
                    onClick={() => toggleDiv(item?.sid)}
                    className="range-icon d-inline-block"
                  >
                    <i className="fas fa-info-circle float-right"></i>{" "}
                    <div
                      id={item?.sid}
                      className={`icon-range-B collapse ${
                        openDivIds.includes(item?.sid) ? "show" : ""
                      }`}
                    >
                      R:<span>{parseFloat(item?.min)}</span>-<span>{formatNumber(item?.max)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card32bBackRate back-cell-B borderBox" style={{width:"66%"}}>
              {(item?.gstatus==="SUSPENDED" || item?.gstatus==="CLOSED") && <div className="card32bLock"></div>}
                <span className="title-14 f-bold">{item?.b1}</span>
              </div>
            </div>
            <div
              className="w-100 d-flex flex-row"
              style={{ backgroundColor: "#fff", height: "30px" }}
            >
              <div style={{width:"34%"}}></div>
              <div className="d-flex justify-content-center align-item-center" style={{width:"66%"}}>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${item?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${item?.sid}_card`
                        ] > 0
                        ? "color-green"
                        : data?.profitLoss[
                            `${data?.videoInfo?.mid}_${item?.sid}_card`
                          ] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${item?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${item?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
              </div>
            </div>
          </div>
        </>
      );
    })}
  </div>
  );
};

export default TotalCards;
