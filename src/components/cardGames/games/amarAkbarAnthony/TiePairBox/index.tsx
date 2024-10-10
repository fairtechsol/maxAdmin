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
          value1={lowHigh?.[0]?.b1}
          value4={lowHigh?.[0]?.l1}
          value2="A. Amar"
          value3={getProfitLoss("amar")}
          width={"30%"}
          lock={
            lowHigh?.[0]?.gstatus === "CLOSED" || lowHigh?.[0]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[0]}
        />

        <PlayerButton
          value1={lowHigh?.[1]?.b1}
          value4={lowHigh?.[1]?.l1}
          value2="B. Akbar"
          value3={getProfitLoss("akbar")}
          width={"30%"}
          lock={
            lowHigh?.[1]?.gstatus === "CLOSED" || lowHigh?.[1]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[1]}
        />

        <PlayerButton
          value1={lowHigh?.[2]?.b1}
          value4={lowHigh?.[2]?.l1}
          value2="C. Anthony"
          value3={getProfitLoss("anthony")}
          width={"30%"}
          lock={
            lowHigh?.[2]?.gstatus === "CLOSED" || lowHigh?.[2]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[2]}
        />
      </div>
      <div className="title-12" style={{ textAlign: "end", width: "100%" }}>
        <span>R:</span>
        <span>{min}</span>-<span>{formatNumber(max)}</span>
      </div>
    </div>
  );
};

export default TiePairBox;
