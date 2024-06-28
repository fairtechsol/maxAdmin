import { IoInformationCircle } from "react-icons/io5";
import { useState } from "react";
import SmoothDropdownModal from "../minMaxModal";

const BackLay = ({ matchOddsData, data }: any) => {
  const [modelOpen, setModelOpen] = useState(false);
  const min = matchOddsData?.[0]?.min;
  const max = matchOddsData?.[0]?.max;

  const handleLock = (status: any, value: any) => {
    if (status != "ACTIVE" || value === "0.00") {
      return true;
    } else {
      return false;
    }
  };
  const renderItem = (item: any, index: number, type: any) =>
    type === "back" ? (
      <div
        key={index}
        className={`dtlsubTitle ${type}-BackGround ${
          handleLock(item?.gstatus, item?.b1) ? "suspended" : ""
        }`}
      >
        {item?.b1}
      </div>
    ) : (
      <div
        key={index}
        className={`dtlsubTitle ${type}-BackGround ${
          handleLock(item?.gstatus, item?.l1) ? "suspended" : ""
        }`}
      >
        {item?.l1}
      </div>
    );
  // console.log('first',matchOddsData)
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
        }}
      >
        <div className="w-100 d-sm-flex flex-row" style={{ height: "30px" }}>
          <div className="dtlTitle">
            <div style={{ width: "45%", textAlign: "start" }}>
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
            </div>{" "}
          </div>
          <div className="dtlsubTitle back-BackGround">Back</div>
          <div className="dtlsubTitle lay-BackGround">Lay</div>
        </div>
        <div className="w-100 d-sm-flex flex-row" style={{ height: "30px" }}>
          <div className="dtlTitle">
            Dragon{" "}
            <span
              className={
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                    ]
                    ? JSON.parse(
                        data?.profitLoss[
                          `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                        ]
                      )["dragon"] > 0
                      ? "color-green"
                      : JSON.parse(
                          data?.profitLoss[
                            `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                          ]
                        )["dragon"] < 0
                      ? "color-red"
                      : ""
                    : ""
                  : ""
              }
            >
              {data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                  ]
                  ? JSON.parse(
                      data?.profitLoss[
                        `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                      ]
                    )["dragon"]
                  : 0
                : 0}
            </span>{" "}
          </div>
          {renderItem(matchOddsData?.[0], 0, "back")}
          {renderItem(matchOddsData?.[0], 1, "lay")}
        </div>
        <div className="w-100 d-sm-flex flex-row" style={{ height: "30px" }}>
          <div className="dtlTitle">
            {" "}
            Tiger
            <span
              className={
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                    ]
                    ? JSON.parse(
                        data?.profitLoss[
                          `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                        ]
                      )["tiger"] > 0
                      ? "color-green"
                      : JSON.parse(
                          data?.profitLoss[
                            `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                          ]
                        )["tiger"] < 0
                      ? "color-red"
                      : ""
                    : ""
                  : ""
              }
            >
              {data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                  ]
                  ? JSON.parse(
                      data?.profitLoss[
                        `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                      ]
                    )["tiger"]
                  : 0
                : 0}
            </span>
          </div>
          {renderItem(matchOddsData?.[1], 2, "back")}
          {renderItem(matchOddsData?.[1], 3, "lay")}
        </div>
      </div>
    </div>
  );
};

export default BackLay;
