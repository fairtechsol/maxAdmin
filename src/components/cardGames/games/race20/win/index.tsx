const WinBox = ({ odds, data }: any) => {
  const handleLock = (item: any) => {
    if (item?.gstatus != "ACTIVE" || item?.b1 === "0.00") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <div className="winContainer">
        <div className="subwinContainer">
          {odds?.map((item: any, index: number) => {
            return (
              <>
                <div className="win-mainRateBox" key={index}>
                  <div>
                    <span className="f600">{item?.nat}</span>
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
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WinBox;
