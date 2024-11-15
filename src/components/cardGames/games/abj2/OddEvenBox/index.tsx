import OddButtonBox from "../OddButtonBox";

const OddEven = ({ card, odds, data }: any) => {
  return (
    <>
      <div className="oddEvenContainer-ab2">
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
              <OddButtonBox
                value1={odds?.[0]?.b1}
                value2={"ODD"}
                profitLoss={
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
              <OddButtonBox
                value1={odds?.[1]?.b1}
                value2={"EVEN"}
                profitLoss={
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
              <OddButtonBox
                value1={odds?.[1]?.b1}
                value2={"icon1"}
                profitLoss={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                      ]
                    : 0
                }
                width={"20%"}
                lock={odds?.[1]?.gstatus === "0" ? true : false}
                data={odds?.[1]}
              />
              <OddButtonBox
                value1={odds?.[0]?.b1}
                value2={"icon2"}
                profitLoss={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                      ]
                    : 0
                }
                width={"20%"}
                lock={odds?.[0]?.gstatus === "0" ? true : false}
                data={odds?.[0]}
              />
              <OddButtonBox
                value1={odds?.[2]?.b1}
                value2={"icon3"}
                profitLoss={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                      ]
                    : 0
                }
                width={"20%"}
                lock={odds?.[2]?.gstatus === "0" ? true : false}
                data={odds?.[2]}
              />
              <OddButtonBox
                value1={odds?.[3]?.b1}
                value2={"icon4"}
                profitLoss={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                      ]
                    : 0
                }
                width={"20%"}
                lock={odds?.[3]?.gstatus === "0" ? true : false}
                data={odds?.[3]}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OddEven;
