import { useState } from "react";
import { formatNumber } from "../../../../../helpers";

const WinBox = ({ odds, data }: any) => {
  const handleLock = (item: any) => {
    if (item?.gstatus != "ACTIVE" || item?.b1 === "0.00") {
      return true;
    } else {
      return false;
    }
  };
  const [openDivIds, setOpenDivIds] = useState<string[]>([]);

  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };

  return (
    <>
      <div className="winContainer title-14">
        <div className="subwinContainer">
          {odds?.map((item: any, index: number) => {
            return (
              <div className="win-mainRateBox" key={index}>
                <div>
                  <span className="f600">{item?.nat}</span>
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
                      R:<span>{parseFloat(odds?.[0]?.min)}</span>-
                      <span>{formatNumber(odds?.[0]?.max)}</span>
                    </div>
                  </span>
                </div>
                <div
                  className={`win-rateBox back-BackGround cursor-pointer flex-column ${
                    handleLock(item) ? "suspended" : ""
                  }`}
                >
                  <span className="rate-box">{item?.b1}</span>{" "}
                </div>
                <span
                  className={`casino-volume color-red mt-0 f600 ${
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
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WinBox;
