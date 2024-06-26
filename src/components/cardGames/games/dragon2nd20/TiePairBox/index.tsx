import CommonButtonBox from "../CommonButtonBox";

const TiePairBox = ({ tiePair, data }: any) => {
  return (
    <div className="tiePairContainer">
      <div className="tiePairRateBoxMain">
        <CommonButtonBox
          value1={tiePair?.[0]?.rate}
          value2={"Dragon"}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[0]?.sid}_card`
                ]
              : 0
          }
          width={"30%"}
          lock={tiePair?.[0]?.gstatus === "0" ? true : false}
          data={tiePair?.[0]}
        />
        <CommonButtonBox
          value1={tiePair?.[2]?.rate}
          value2={"Tie"}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[2]?.sid}_card`
                ]
              : 0
          }
          width={"10%"}
          lock={tiePair?.[2]?.gstatus === "0" ? true : false}
          data={tiePair?.[2]}
        />
        <CommonButtonBox
          value1={tiePair?.[1]?.rate}
          value2={"Tiger"}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[1]?.sid}_card`
                ]
              : 0
          }
          width={"30%"}
          lock={tiePair?.[1]?.gstatus === "0" ? true : false}
          data={tiePair?.[1]}
        />
        <div style={{ width: "0.5%", backgroundColor: "#ffc742" }}></div>
        <CommonButtonBox
          value1={tiePair?.[3]?.rate}
          value2={"Pair"}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[3]?.sid}_card`
                ]
              : 0
          }
          width={"20%"}
          lock={tiePair?.[3]?.gstatus === "0" ? true : false}
          data={tiePair?.[3]}
        />
      </div>
    </div>
  );
};

export default TiePairBox;
