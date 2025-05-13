import { useState } from "react";
import { IoInformationCircle } from "react-icons/io5";
import CommonButtonBox from "../CommonButtonBox";
import SmoothDropdownModal from "../minMaxModal";

const PairBox = ({ odds, data }: any) => {
  const [modelOpen, setModelOpen] = useState(false);
  const min = odds?.min;
  const max = odds?.max;

  return (
    <div className="w-100">
      <div
        style={{
          width: "100%",
          marginTop: "5%",
          display: "flex",
          flexDirection: "column",
          border: "0.3px solid #c7c8ca",
          marginLeft: "5px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", textAlign: "end" }}>
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
        <CommonButtonBox
          value1={odds?.b1}
          value2={"Pair"}
          value3={
            data?.profitLoss
              ? data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.sid}_card`]
              : 0
          }
          width={"90%"}
          lock={
            odds?.gstatus === "CLOSED" || odds?.b1 === "0.00" ? true : false
          }
          data={odds}
        />
      </div>
    </div>
  );
};

export default PairBox;
