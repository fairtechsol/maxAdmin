
import PlayerButton from "../PlayerButton";
import { formatNumber } from "../../../../../helpers";

const TiePairBox2 = ({ lowHigh, data }: any) => {
  const min = lowHigh?.min;
  const max = lowHigh?.max;

  const getProfitLoss = (gameName: string, sid: any) => {
    try {
      let result = 0;
      if (data?.profitLoss && Object.keys(data.profitLoss).length > 0) {
        const key = `${data.videoInfo.mid}_${sid}_card`;
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
          value1={lowHigh?.b1 ?? 0}
          value4={lowHigh?.l1 ?? 0}
          value2={lowHigh?.nat ?? ""}
          value3={getProfitLoss("odd", lowHigh?.sid)}
          width={"100%"}
          lock={
            lowHigh?.gstatus === "CLOSED" || lowHigh?.gstatus === "SUSPENDED"
          }
          data={lowHigh}
        />
      </div>
      <div className="title-12" style={{ textAlign: "end" }}>
          <span>R:</span>
          <span>{min}</span>-
          <span>{formatNumber(max)}</span>
        </div>
    </div>
  );
};

export default TiePairBox2;
