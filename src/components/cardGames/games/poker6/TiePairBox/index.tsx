import { useState } from "react";
import { formatNumber } from "../../../../../helpers";
import { HandleGameCards } from "../card";

const TiePairBox = ({ odds, data, title, cards }: any) => {
  const [openDivIds, setOpenDivIds] = useState<string[]>([]);
  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };
  return (
    <div className="w-100 d-flex flex-column mt-2">
      <div className="w-100 text-start" style={{ paddingLeft: "0.8rem" }}>
        <h4 className="title-15 f-bold" style={{ color: "#ef910f" }}>
          {title}
        </h4>
      </div>
      <div className="w-100 d-flex flex-row justify-content-around align-items-center flex-wrap">
        {odds?.map((item: any, index: any) => {
          return (
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ width: "30%" }}
            >
              <div className="w-100 d-flex flex-row justify-content-between align-items-center position-relative">
                <span className="title-14 f-bold">
                  {title === "Hands" ? item?.nation : ""}
                </span>
                <div
                  onClick={() => toggleDiv(item?.sid)}
                  className="range-icon d-inline-block ms-1"
                >
                  <i className="fas fa-info-circle float-right"></i>{" "}
                  <div
                    id={item?.sid}
                    className={`icon-range-dt20 collapse ${
                      openDivIds.includes(item?.sid) ? "show" : ""
                    }`}
                  >
                    R:<span>{parseFloat(item?.min)}</span>-
                    <span>{formatNumber(item?.max)}</span>
                  </div>
                </div>
              </div>
              <div
                className="w-100 d-flex flex-row justify-content-between align-items-center position-relative"
                style={{
                  height: "44px",
                  border:
                    item?.gstatus === "0"
                      ? "4px solid #e9e2e287"
                      : "4px solid #cfcfcf",
                  borderRadius: "4px",
                  backgroundColor: "#dddddd",
                }}
              >
                {item?.gstatus === "0" && <div className="dt20bLock"></div>}
                {title === "Hands" ? (
                  <div
                    className="d-flex flex-row ms-1"
                    style={{ gap: "3px", zIndex: "200" }}
                  >
                    <HandleGameCards card={data?.videoInfo[`C${index + 1}`]} />
                    <HandleGameCards card={data?.videoInfo[`C${index + 7}`]} />
                  </div>
                ) : (
                  <span className="title-14 f-bold ms-1">{item?.nation}</span>
                )}
                <span className="title-14 f-bold me-1">
                  {parseFloat(item?.rate)}
                </span>
              </div>
              <div className="w-100 d-flex justify-content-center align-items-center mb-2">
                <span className="title-14 f-bold text-red">
                  {data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${item?.sid}_card`
                      ]
                    : 0}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TiePairBox;
