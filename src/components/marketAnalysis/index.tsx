import moment from "moment-timezone";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { sessionBettingType } from "../../utils/Constants";
import "./styles.scss";

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

function getFirstBetId(betType: any) {
  if (Array.isArray(betType?.match) && betType.match.length > 0) {
    return betType.match[0]?.betId;
  }
  return undefined;
}

// Function to get the first available key name in betType (like session)
function getFirstAvailableKey(betType: any) {
  return Object.keys(betType).find(
    (key) => Array.isArray(betType[key]) && betType[key].length > 0
  );
}

const MarketAnalysisComp = ({ match }: any) => {
  return (
    <div className="market-analysis-container">
      <div className="market-analysis-container">
        <div className="market-analysis-title">
          <div>
            <NavLink
              to={
                match?.eventType === "cricket"
                  ? `/admin/match_details/${match?.matchId}`
                  : match?.eventType === "politics"
                  ? `/admin/other_match_detail/${match?.eventType}/${
                      match?.matchId
                    }/${
                      getFirstBetId(match?.betType) ||
                      getFirstAvailableKey(match?.betType)
                    }`
                  : `/admin/other_match_detail/${match?.eventType}/${match?.matchId}/${match?.betType?.match?.[0]?.betId}`
              }
            >
              {match?.title}
            </NavLink>
          </div>
          <div>{moment(match?.startAt).format("DD/MM/YYYY hh:mm:ss")}</div>
        </div>
        <div className="market-analysis-content">
          <div className="row row5">
            {Object.entries(match?.betType)?.map(
              ([name, item]: any, index: number) => {
                if (name === "match") {
                  return item?.map((items: any, index: number) => (
                    <div className="col-lg-4" key={index}>
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
                                      items?.profitLoss?.[
                                        profitLossObj[index]
                                      ] || 0
                                    ).toFixed(2)}
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
                  return item?.map((items: any, index: number) => (
                    <div className="col-lg-4" key={index}>
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
                                        items?.profitLoss?.betPlaced?.[i] || 0
                                      ).toFixed(2)}
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
                    <div className="col-lg-4" key={index}>
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
                              {item?.map((items: any, index: number) => (
                                <tr key={index}>
                                  <td>{items?.eventName}</td>
                                  <td className="text-end">
                                    {Math.min(
                                      ...Object.values(
                                        items?.profitLoss?.betPlaced || {}
                                      ).map((item: any) =>
                                        [
                                          sessionBettingType.ballByBall,
                                          sessionBettingType.khado,
                                          sessionBettingType.meter,
                                          sessionBettingType.session,
                                          sessionBettingType.overByOver,
                                        ]?.includes(name)
                                          ? +parseFloat(
                                              item?.profitLoss
                                            ).toFixed(2)
                                          : +parseFloat(item).toFixed(2)
                                      ),
                                      0
                                    ) == 0
                                      ? Math.max(
                                          ...Object.values(
                                            items?.profitLoss?.betPlaced || {}
                                          ).map((item: any) =>
                                            [
                                              sessionBettingType.ballByBall,
                                              sessionBettingType.khado,
                                              sessionBettingType.meter,
                                              sessionBettingType.session,
                                              sessionBettingType.overByOver,
                                            ]?.includes(name)
                                              ? +parseFloat(
                                                  item?.profitLoss
                                                ).toFixed(2)
                                              : +parseFloat(item).toFixed(2)
                                          ),
                                          0
                                        )
                                      : Math.min(
                                          ...Object.values(
                                            items?.profitLoss?.betPlaced || {}
                                          ).map((item: any) =>
                                            [
                                              sessionBettingType.ballByBall,
                                              sessionBettingType.khado,
                                              sessionBettingType.meter,
                                              sessionBettingType.session,
                                              sessionBettingType.overByOver,
                                            ]?.includes(name)
                                              ? +parseFloat(
                                                  item?.profitLoss
                                                ).toFixed(2)
                                              : +parseFloat(item).toFixed(2)
                                          ),
                                          0
                                        ) || "0.00"}
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
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MarketAnalysisComp);
