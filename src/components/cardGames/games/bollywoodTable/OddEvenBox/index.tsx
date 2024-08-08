import { useState } from "react";
import { IoInformationCircle } from "react-icons/io5";
import SmoothDropdownModal from "../minMaxModal";
import CommonButtonBox from "../CommonButtonBox";

const OddEven = ({ data, card, odds }: any) => {
  const min = odds?.[0]?.min;
  const max = odds?.[0]?.max;

  const [modelOpen, setModelOpen] = useState(false);

  return (
    <>
      <div className="oddEvenContaine">
        {card ? (
          <>
            <div style={{ width: "98%", textAlign: "end", marginTop: "12px" }}>
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "5px",
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
                lock={
                  odds?.[0]?.gstatus === "CLOSED" || odds?.[0]?.b1 === "0.00"
                    ? true
                    : false
                }
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
                lock={
                  odds?.[1]?.gstatus === "CLOSED" || odds?.[1]?.b1 === "0.00"
                    ? true
                    : false
                }
                data={odds?.[1]}
              />
            </div>
          </>
        ) : (
          <>
            <div style={{ width: "98%", textAlign: "end", marginTop: "12px" }}>
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "4px",
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
                lock={
                  odds?.[0]?.gstatus === "CLOSED" || odds?.[0]?.b1 === "0.00"
                    ? true
                    : false
                }
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
                lock={
                  odds?.[1]?.gstatus === "CLOSED" || odds?.[1]?.b1 === "0.00"
                    ? true
                    : false
                }
                data={odds?.[1]}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OddEven;
