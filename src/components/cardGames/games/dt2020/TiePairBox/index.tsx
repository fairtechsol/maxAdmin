// import CommonButtonBox from "../CommonButtonBox";

import { useState } from "react";
import { formatNumber } from "../../../../../helpers";

const TiePairBox = ({ tiePair, data }: any) => {
  const min = tiePair?.[0]?.min;
  const max = tiePair?.[0]?.max;
  const [openDivIds, setOpenDivIds] = useState<string[]>([]);
  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };
  // console.log(data, "first", data?.profitLoss);
  return (
    <div className="tiePairContainer">
      <div className="w-100 d-flex justify-content-end align-item-center position-relative">
        <div
          onClick={() => toggleDiv("demo0")}
          className="range-icon d-inline-block"
        >
          <i className="fas fa-info-circle float-right"></i>{" "}
          <div
            id="demo0"
            className={`icon-range-dt20 collapse ${
              openDivIds.includes("demo0") ? "show" : ""
            }`}
          >
            R:<span>{parseFloat(min)}</span>-<span>{formatNumber(max)}</span>
          </div>
        </div>
      </div>
      <div className="tiePairRateBoxMain mb-3">
        <div className="d-flex flex-column" style={{width:"70%"}}>
        <div className="dt20tie">
          <div className="w-50 d-flex flex-row dt20dummy2">
            {tiePair?.[0]?.gstatus==="0" && <div className="dt20bLock"></div>}
            <span className="title-14 f-bold ms-1">
              {tiePair?.[0]?.nat || tiePair?.[0]?.nation}
            </span>
            <span className="title-14 f-bold">
              {parseFloat(tiePair?.[0]?.rate)}
            </span>
          </div>
          <div className="dt20dummy">
          {tiePair?.[2]?.gstatus==="0" && <div className="dt20bLock2"></div>}
            <span className="title-14 f-bold text-white">
              {tiePair?.[2]?.nat || tiePair?.[2]?.nation}
            </span>
            <span className="title-14 f-bold text-white">
              {parseFloat(tiePair?.[2]?.rate)}
            </span>
          </div>
          <div className="w-50 d-flex flex-row dt20dummy3">
          {tiePair?.[1]?.gstatus==="0" && <div className="dt20bLock"></div>}
            <span className="title-14 f-bold" style={{marginLeft:"60px"}}>
              {tiePair?.[1]?.nat || tiePair?.[1]?.nation}
            </span>
            <span className="title-14 f-bold me-1">
              {parseFloat(tiePair?.[1]?.rate)}
            </span>
          </div>
        </div>
        <div className="w-100 d-flex flex-row justify-content-between">
          <span className="title-16 f-bold text-red">{data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[0]?.sid}_card`
                ]
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[0]?.sid}_card`
                ]
              : 0}</span>
          <span className="title-16 f-bold text-red mt-4">{data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[2]?.sid}_card`
                ]
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[2]?.sid}_card`
                ]
              : 0}</span>
          <span className="title-16 f-bold text-red">{data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[1]?.sid}_card`
                ]
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[1]?.sid}_card`
                ]
              : 0}</span>
        </div>
        </div>
        <div className="d-flex flex-column" style={{width:"30%"}}>
        <div className="dt20pair position-relative">
        {tiePair?.[3]?.gstatus==="0" && <div className="dt20bLock"></div>}
          <span className="title-14 f-bold ms-1">
            {tiePair?.[3]?.nat || tiePair?.[3]?.nation}
          </span>
          <span className="title-14 f-bold me-1">
            {parseFloat(tiePair?.[3]?.rate)}
          </span>
        </div>
        <div className="w-100 d-flex flex-row justify-content-end">
          <span className="title-16 f-bold text-red">{data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[3]?.sid}_card`
                ]
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[3]?.sid}_card`
                ]
              : 0}</span>
        </div>
      </div>
      </div>
     
    </div>
  );
};

export default TiePairBox;
