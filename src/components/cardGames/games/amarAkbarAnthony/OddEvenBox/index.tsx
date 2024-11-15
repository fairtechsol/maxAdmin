import { formatNumber } from "../../../../../helpers";
import CommonButtonBox from "../CommonButtonBox";

const OddEven = ({ data, card, odds }: any) => {
  const min = odds?.[0]?.min;
  const max = odds?.[0]?.max;

  return (
    <>
      <div className="oddEvenContainer">
        {card ? (
          <>
            {" "}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "4px"
              }}
            >
              <CommonButtonBox
                value1={odds?.[0]?.b1}
                value2={odds?.[0]?.nat}
                value3={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                      ]
                    : 0
                }
                width={"80%"}
                lock={odds?.[0]?.gstatus === "SUSPENDED" ? true : false}
                data={odds?.[0]}
              />
              <CommonButtonBox
                value1={odds?.[1]?.b1}
                value2={odds?.[1]?.nat}
                value3={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                      ]
                    : 0
                }
                width={"80%"}
                lock={odds?.[1]?.gstatus === "SUSPENDED" ? true : false}
                data={odds?.[1]}
              />
            </div>
            <div className="title-12" style={{ textAlign: "end" }}>
              <span>R:</span>
              <span>{min}</span>-
              <span>{formatNumber(max)}</span>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "4px"
              }}
            >
              <CommonButtonBox
                value1={odds?.[0]?.b1}
                value2={odds?.[0]?.nat}
                value3={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                      ]
                    : 0
                }
                width={"80%"}
                lock={odds?.[0]?.gstatus === "SUSPENDED" ? true : false}
                data={odds?.[0]}
              />
              <CommonButtonBox
                value1={odds?.[1]?.b1}
                value2={odds?.[1]?.nat}
                value3={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                      ]
                    : 0
                }
                width={"80%"}
                lock={odds?.[1]?.gstatus === "SUSPENDED" ? true : false}
                data={odds?.[1]}
              />
            </div>
            <div className="title-12" style={{ textAlign: "end" }}>
            <span>R:</span>
              <span>{min}</span>-
              <span>{formatNumber(max)}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OddEven;
