import { useState } from "react";

import { formatNumber } from "../../../../../helpers";

const CardBox = ({ odds, data }: any) => {
  const [openDivIds, setOpenDivIds] = useState<string[]>([]);
  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };
  const handleLock = (status: any, value: any) => {
    if (status != "ACTIVE" || value === "0.00") {
      return true;
    } else {
      return false;
    }
  };
  const renderItem = (item: any, index: number) => (
    <div
      key={index}
      className={`dtlsubTitle back-cell-B`}
      style={{ position: "relative", height: "80px" }}
    >
      {handleLock(item?.gstatus, item?.b1) && (
        <div className="card32bLock"></div>
      )}
      <span style={{ fontFamily: "auto", fontSize: "50px" }}>
        {index + 1 === 10 ? "0" : index + 1}
      </span>
    </div>
  );
  return (
    <div className="w-100">
      <div
        style={{
          width: "100%",
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          marginLeft: "5px",
        }}
      >
        <div className="w-100 d-sm-flex flex-row" style={{ height: "30px" }}>
          <div className="cardNumberTitleb mb-1">
            {" "}
            <div style={{ width: "47%", textAlign: "start" }}></div>
            <div
              className="d-flex justify-content-between"
              style={{ width: "53%", position: "relative" }}
            >
              <span>{odds?.[0]?.b1}</span>
              <div
                onClick={() => toggleDiv("demo")}
                className="range-icon d-inline-block"
              >
                <i className="fas fa-info-circle float-right"></i>{" "}
                <div
                  id="demo"
                  className={`icon-range-B collapse ${
                    openDivIds.includes("demo") ? "show" : ""
                  }`}
                >
                  R:<span>{parseFloat(odds?.[0]?.min)}</span>-
                  <span>{formatNumber(odds?.[0]?.max)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-100 d-sm-flex flex-row"
          style={{ height: "auto", padding: "0px 10px" }}
        >
          {odds?.map((item: any, index: number) => {
            return <>{renderItem(item, index)}</>;
          })}
        </div>
        <div
          className="w-100 d-sm-flex flex-row"
          style={{ height: "auto", padding: "0px 10px" }}
        >
          {odds?.map((item: any) => {
            return (
              <>
                {" "}
                <span
                  className={`title-14 w-100 text-center f400 ${
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
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardBox;
