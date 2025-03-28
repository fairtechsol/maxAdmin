import { formatNumber } from "../../../../../helpers";
import PlayerButton from "../PlayerButton";

const TiePairBox = ({ lowHigh, data }: any) => {
  const min = lowHigh?.[0]?.min;
  const max = lowHigh?.[0]?.max;

  const getProfitLoss = (gameName: string) => {
    try {
      let result = 0;
      if (data?.profitLoss && Object.keys(data.profitLoss).length > 0) {
        const key = `${data.videoInfo.mid}_1_card`;
        if (key in data.profitLoss) {
          const jsonString = data.profitLoss[key];
          const parsedData = JSON.parse(jsonString);
          result = parsedData[gameName] ? parsedData[gameName] : 0;
        } else return result;
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="tiePairContainer">
      <div className="tiePairRateBoxMainlucky">
        <PlayerButton
          value1={lowHigh?.[0]?.b1 ?? 0}
          value4={lowHigh?.[0]?.l1 ?? 0}
          value2={`A. ${lowHigh?.[0]?.nat ?? ""}`}
          value3={getProfitLoss("don")}
          width={"30%"}
          lock={
            lowHigh?.[0]?.gstatus === "CLOSED" || lowHigh?.[0]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[0]}
        />

        <PlayerButton
          value1={lowHigh?.[1]?.b1 ?? 0}
          value4={lowHigh?.[1]?.l1 ?? 0}
          value2={`B. ${lowHigh?.[1]?.nat ?? ""}`}
          value3={getProfitLoss("amarakbaranthony")}
          width={"30%"}
          lock={
            lowHigh?.[1]?.gstatus === "CLOSED" || lowHigh?.[1]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[1]}
        />

        <PlayerButton
          value1={lowHigh?.[2]?.b1 ?? 0}
          value4={lowHigh?.[2]?.l1 ?? 0}
          value2={`C. ${lowHigh?.[2]?.nat ?? ""}`}
          value3={getProfitLoss("sahibbibiaurghulam")}
          width={"30%"}
          lock={
            lowHigh?.[2]?.gstatus === "CLOSED" || lowHigh?.[2]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[2]}
        />
      </div>
      <div className="tiePairRateBoxMainlucky">
        <PlayerButton
          value1={lowHigh?.[3]?.b1 ?? 0}
          value4={lowHigh?.[3]?.l1 ?? 0}
          value2={`D. ${lowHigh?.[3]?.nat ?? ""}`}
          value3={getProfitLoss("dharamveer")}
          width={"30%"}
          lock={
            lowHigh?.[3]?.gstatus === "CLOSED" || lowHigh?.[3]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[3]}
        />

        <PlayerButton
          value1={lowHigh?.[4]?.b1 ?? 0}
          value4={lowHigh?.[4]?.l1 ?? 0}
          value2={`E. ${lowHigh?.[4]?.nat ?? ""}`}
          value3={getProfitLoss("kiskiskopyaarkaroon")}
          width={"30%"}
          lock={
            lowHigh?.[4]?.gstatus === "CLOSED" || lowHigh?.[4]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[4]}
        />

        <PlayerButton
          value1={lowHigh?.[5]?.b1 ?? 0}
          value4={lowHigh?.[5]?.l1 ?? 0}
          value2={`F. ${lowHigh?.[5]?.nat ?? ""}`}
          value3={getProfitLoss("ghulam")}
          width={"30%"}
          lock={
            lowHigh?.[5]?.gstatus === "CLOSED" || lowHigh?.[5]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[5]}
        />
      </div>
      <div className="title-12" style={{ textAlign: "end" }}>
        <span>R:</span>
        <span>{min}</span>-<span>{formatNumber(max)}</span>
      </div>
    </div>
  );
};

export default TiePairBox;
