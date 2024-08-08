import { useState } from "react";
import { IoInformationCircle } from "react-icons/io5";
import SmoothDropdownModal from "../minMaxModal";
import PlayerButton from "../PlayerButton";

const TiePairBox2 = ({ lowHigh, data }: any) => {
  const min = lowHigh?.min;
  const max = lowHigh?.max;
  const [modelOpen, setModelOpen] = useState(false);
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
          value3={
            data?.profitLoss
              ? data?.profitLoss[`${data?.videoInfo?.mid}_${lowHigh?.sid}_card`]
              : 0
          }
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
