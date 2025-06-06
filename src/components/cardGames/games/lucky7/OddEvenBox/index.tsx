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
              }}
            >
              <CommonButtonBox
                value1={odds?.[0]?.rate}
                value2={"EVEN"}
                value3={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                      ]
                    : 0
                }
                width={"40%"}
                lock={odds?.[0]?.gstatus === "0" ? true : false}
                data={odds?.[0]}
              />
              <CommonButtonBox
                value1={odds?.[1]?.rate}
                value2={"ODD"}
                value3={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                      ]
                    : 0
                }
                width={"40%"}
                lock={odds?.[1]?.gstatus === "0" ? true : false}
                data={odds?.[1]}
              />
            </div>
            <div style={{ textAlign: "end" }}>
              <span style={{ fontWeight: "bolder" }}>Min:</span>
              <span>{min}</span>
              <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                Max:
              </span>
              <span>{max}</span>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <CommonButtonBox
                value1={odds?.[0]?.rate}
                value2={"icon1"}
                value3={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                      ]
                    : 0
                }
                width={"40%"}
                lock={odds?.[0]?.gstatus === "0" ? true : false}
                data={odds?.[0]}
              />
              <CommonButtonBox
                value1={odds?.[1]?.rate}
                value2={"icon2"}
                value3={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                      ]
                    : 0
                }
                width={"40%"}
                lock={odds?.[1]?.gstatus === "0" ? true : false}
                data={odds?.[1]}
              />
            </div>
            <div style={{ textAlign: "end" }}>
              <span style={{ fontWeight: "bolder" }}>Min:</span>
              <span>{min}</span>
              <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                Max:
              </span>
              <span>{max}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OddEven;
