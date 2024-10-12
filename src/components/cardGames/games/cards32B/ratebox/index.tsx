import { useState } from "react";
import "../ratebox/style.scss";
import { formatNumber } from "../../../../../helpers";
const RateBox = ({data, odds }: any) => {
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
        <div className="card32bBackLay borderBox">Back</div>
        <div className="card32bBackLay borderBox">Lay</div>
      </div>
      {odds?.map((item: any,index:number) => {
        return (
          <>
            <div className="d-flex w-100 flex-column">
              <div className="card32bRateBox">
                <div className="card32bNameBox borderBox">
                  <span className="title-14 f-bold">{item?.nation}</span>
                  <div className="d-flex flex-row">
                  <span
                className={`title-14 f400 me-1 ${
                  data?.profitLoss
                    ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      ? JSON.parse(
                          data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                        )[`player${index+8}`] > 0
                        ? "color-green"
                        : JSON.parse(
                            data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                          )[`player${index+8}`] < 0
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
                      )[`player${index+8}`]
                    : <br></br>
                  : 0}
              </span>
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
                <div className="card32bBackRate back-cell-B borderBox">
                  {(item?.gstatus==="SUSPENDED" || item?.gstatus==="CLOSED") && <div className="card32bLock"></div>}
                  <span className="title-14 f-bold">{item?.b1}</span>
                </div>
                <div className="card32bBackRate lay-cell-B borderBox">
                {(item?.gstatus==="SUSPENDED" || item?.gstatus==="CLOSED") && <div className="card32bLock"></div>}
                  <span className="title-14 f-bold">{item?.l1}</span>
                </div>
              </div>
              <div
                className="w-100"
                style={{ backgroundColor: "#fff", height: "30px" }}
              ></div>
            </div>
          </>
        );
      })}
    </div>
  );
};
export default RateBox;
