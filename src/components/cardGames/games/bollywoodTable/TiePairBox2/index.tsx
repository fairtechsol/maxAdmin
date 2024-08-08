import { useState } from "react";
import { IoInformationCircle } from "react-icons/io5";
import SmoothDropdownModal from "../minMaxModal";
import PlayerButton from "../PlayerButton";

const TiePairBox2 = ({ lowHigh, data }: any) => {
  const min = lowHigh?.min;
  const max = lowHigh?.max;
  const [modelOpen, setModelOpen] = useState(false);

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
      <div style={{ width: "98%", textAlign: "end" }}>
        <span className="minmaxi">
          <IoInformationCircle
            color="#ffc742"
            onClick={() => setModelOpen(!modelOpen)}
          />
          <SmoothDropdownModal
            min={min}
            max={max}
            show={modelOpen}
            setShow={() => setModelOpen(false)}
          />
        </span>
      </div>

      <div className="tiePairRateBoxMainlucky">
        <PlayerButton
          value1={lowHigh?.b1}
          value4={lowHigh?.l1}
          value2={lowHigh?.nat}
          value3={getProfitLoss("odd", lowHigh?.sid)}
          width={"100%"}
          lock={
            lowHigh?.gstatus === "CLOSED" || lowHigh?.gstatus === "SUSPENDED"
          }
          data={lowHigh}
        />
      </div>
    </div>
  );
};

export default TiePairBox2;
