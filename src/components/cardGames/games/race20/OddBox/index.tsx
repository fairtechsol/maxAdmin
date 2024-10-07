import { useState } from "react";
import { HandleCards } from "../../../../commonComponent/cardsComponent";

const OddBox = ({ odds, data }: any) => {
  const [openDivId, setOpenDivId] = useState(null); // To keep track of the open div

  const toggleDiv = (id: any) => {
    setOpenDivId(openDivId === id ? null : id); // Toggle div visibility based on its id
  };

  const handleCardRender = (card: string) => {
    if (card?.includes("spade")) {
      return "KHH";
    } else if (card?.includes("heart")) {
      return "KDD";
    } else if (card?.includes("club")) {
      return "KCC";
    } else {
      return "KSS";
    }
  };
  const handleLock = (item: any, type: string) => {
    if (type == "back") {
      if (item?.gstatus != "ACTIVE" || item?.b1 === "0.00") {
        return true;
      } else {
        return false;
      }
    } else {
      if (item?.gstatus != "ACTIVE" || item?.l1 === "0.00") {
        return true;
      } else {
        return false;
      }
    }
  };

  const hanleProfitLossForK = (name: any) => {
    if (name.includes("spade")) {
      return "kofspade";
    } else if (name.includes("heart")) {
      return "kofheart";
    } else if (name.includes("diamond")) {
      return "kofdiamond";
    } else {
      return "kofclub";
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#eee",
        }}
      >
        <div className="oddBoxContainer" style={{ gap: "5px" }}>
          {odds?.map((item: any, index: number) => {
            return (
              <>
                <div
                  style={{
                    width: "25%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                  key={index}
                >
                  <div
                  className="position-relative"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <HandleCards card={handleCardRender(item?.nat)} />
                    <div
                      onClick={() => toggleDiv("demo0")}
                      className="range-icon d-inline-block ms-2"
                    >
                      <i
                        className="fas fa-info-circle float-right"
                      ></i>{" "}
                      <div
                        id="demo0"
                        className={`icon-range collapse ${
                          openDivId === "demo0" ? "show" : ""
                        }`}
                      >
                        R:<span>100</span>-<span>3L</span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      gap: "5px",
                      lineHeight: 1,
                    }}
                  >
                    <div
                      className={`back-BackGround cursor-pointer ${
                        handleLock(item, "back") ? "suspended" : ""
                      }`}
                      style={{
                        width: "45%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: "14px",
                      }}
                    >
                      <span className="rate-box">{item?.b1}</span>
                    </div>
                    <div
                      className={`lay-BackGround cursor-pointer ${
                        handleLock(item, "lay") ? "suspended" : ""
                      }`}
                      style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        paddingTop: "7px",
                      }}
                    >
                      <span className="rate-box">{item?.l1}</span>
                    </div>
                  </div>
                  <span
                    className={`oddsBoxProfitLoss color-red ${
                      data?.profitLoss
                        ? data?.profitLoss[
                            `${data?.videoInfo?.mid}_${data?.cards?.[0]?.sid}_card`
                          ]
                          ? JSON.parse(
                              data?.profitLoss[
                                `${data?.videoInfo?.mid}_${data?.cards?.[0]?.sid}_card`
                              ]
                            )[hanleProfitLossForK(item?.nat)] > 0
                            ? "color-green"
                            : JSON.parse(
                                data?.profitLoss[
                                  `${data?.videoInfo?.mid}_${data?.cards?.[0]?.sid}_card`
                                ]
                              )[hanleProfitLossForK(item?.nat)] < 0
                            ? "color-red"
                            : ""
                          : ""
                        : ""
                    }`}
                  >
                    {data?.profitLoss
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${data?.cards?.[0]?.sid}_card`
                        ]
                        ? JSON.parse(
                            data?.profitLoss[
                              `${data?.videoInfo?.mid}_${data?.cards?.[0]?.sid}_card`
                            ]
                          )[hanleProfitLossForK(item?.nat)]
                        : 0
                      : 0}
                  </span>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OddBox;
