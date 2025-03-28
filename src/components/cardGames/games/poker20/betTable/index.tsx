import { useState } from "react";
import { formatNumber } from "../../../../../helpers";
import "./style.scss";
const DynamicTable = ({ odds, data }: any) => {
  const [openDivIds, setOpenDivIds] = useState<string[]>([]);

  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };

  return (
    <div className="poker20-table-container">
      {odds?.map((item: any, index: number) => (
        <div
          className="ms-2 d-flex justify-content-center align-items-center flex-column title-14"
          style={{ width: "30%" }}
        >
          <div>
            <span>{item?.nation}</span>
            <span
              onClick={() => toggleDiv(`demo${index}`)}
              className="range-icon d-inline-block ms-1"
            >
              <i className="fas fa-info-circle float-right"></i>{" "}
              <div
                id={`demo${index}`}
                className={`icon-range-dt1day collapse ${
                  openDivIds.includes(`demo${index}`) ? "show" : ""
                }`}
              >
                R:<span>{parseFloat(data?.videoInfo?.min)}</span>-
                <span>{formatNumber(data?.videoInfo?.max)}</span>
              </div>
            </span>
          </div>
          <div
            key={index}
            className={`w-100 d-flex back-BackGround justify-content-center align-items-center title-16 f600 ${
              item?.gstatus === "SUSPENDED" || item?.gstatus === "0"
                ? "locked"
                : ""
            }`}
            style={{ height: "40px" }}
          >
            <span>{item?.rate}</span>
          </div>
          <span
            className={`f800 title-14 ${
              data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${item?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                        `${data?.videoInfo?.mid}_${item?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : "color-red"
                  : "color-red"
                : "color-red"
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
                ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
                : 0
              : 0}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DynamicTable;
