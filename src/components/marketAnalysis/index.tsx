import React from "react";
import "./styles.scss";
import moment from "moment-timezone";

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
            {Object.entries(match?.betType)?.map(([name, item]: any) => (
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
                            <td className="text-right">
                              {items?.maxLoss || "0.00"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysisComp;
