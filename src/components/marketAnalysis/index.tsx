import React from "react";
import "./styles.scss";
import moment from "moment-timezone";

const profitLossObj: Record<number, string> = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  5: "f",
  6: "g",
  7: "h",
  8: "i",
  9: "j",
  10: "k",
  11: "l",
  12: "m",
  13: "n",
  14: "o",
  15: "p",
  16: "q",
  17: "r",
  18: "s",
  19: "t",
  20: "u",
  21: "v",
};

const MarketAnalysisComp = ({ match }: any) => {
  return (
    <div className="market-analysis-container">
      <div className="market-analysis-container">
        <div className="market-analysis-title">
          <div>
            <a href={`/admin/match_details/${match?.matchId}`}>
              {match?.title}
            </a>
          </div>
          <div>{moment(match?.startAt).format("DD/MM/YYYY hh:mm:ss")}</div>
        </div>
        <div className="market-analysis-content">
          <div className="row row5">
            {Object.entries(match?.betType)?.map(([name, item]: any) => {
              if (name === "match") {
                return item?.map((items: any) => (
                  <div className="col-lg-4">
                    <div
                      data-simplebar="init"
                      className="market-analysis-content-detail"
                    >
                      <div className="simplebar-wrapper">
                        <table className="table">
                          <thead
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            <tr>
                              <th colSpan={2}>{items?.marketName}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items?.teams?.map((i: any, index: number) => (
                              <tr key={index}>
                                <td>{i}</td>
                                <td className="text-end">
                                  {parseFloat(
                                    items?.profitLoss?.[profitLossObj[index]]
                                  ).toFixed(2) || "0.00"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ));
              } else if (name === "cricketCasino") {
                return item?.map((items: any) => (
                  <div className="col-lg-4">
                    <div
                      data-simplebar="init"
                      className="market-analysis-content-detail"
                    >
                      <div className="simplebar-wrapper">
                        <table className="table">
                          <thead>
                            <tr>
                              <th colSpan={2}>{items?.eventName}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({ length: 10 }, (_, i) => i)?.map(
                              (i: any) => (
                                <tr key={i}>
                                  <td>{i} number</td>
                                  <td className="text-end">
                                    {parseFloat(
                                      items?.profitLoss?.betPlaced?.[i]
                                    ).toFixed(2) || "0.00"}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ));
              } else {
                return (
                  <div className="col-lg-4">
                    <div
                      data-simplebar="init"
                      className="market-analysis-content-detail"
                    >
                      <div className="simplebar-wrapper">
                        <table className="table">
                          <thead
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            <tr>
                              <th colSpan={2}>{name}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item?.map((items: any) => (
                              <tr>
                                <td>{items?.eventName}</td>
                                <td className="text-end">
                                  {items?.maxLoss || "0.00"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysisComp;
