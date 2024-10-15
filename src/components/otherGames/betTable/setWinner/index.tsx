import { Table } from "react-bootstrap";
import {
  profitLossDataForMatchConstants,
  teamStatus,
} from "../../../../utils/Constants";
import isMobile from "../../../../utils/screenDimension";
import BackLayBox from "../../../backLayBox";
import BetStatusOverlay from "../../../commonComponent/betStatusOverlay";
import "../../style.scss";

interface MatchOddsProps {
  minMax?: any;
  data: any;
  matchDetails?: any;
  backLayCount?: number;
}
function SetWinner({
  minMax,
  data,
  matchDetails,
  backLayCount,
}: MatchOddsProps) {
  let arr = ["A", "B", "C"];
  return (
    <div
      className={`gameTable table-responsive sessionFancyTable borderTable border `}
    >
      <Table className="mb-0">
        <thead>
          <tr>
            <th className="border-0">
              {minMax && isMobile && (
                <span className="f700 title-14">{minMax}</span>
              )}
            </th>
            {backLayCount === 6 && (
              <>
                <th className="border-0" style={{ width: "60px" }}></th>
                <th className="border-0" style={{ width: "60px" }}></th>
              </>
            )}
            <th className="border-0" style={{ width: "60px" }}></th>
            <th className="border-0" style={{ width: "60px" }}></th>
            <th className="text-center bg-blue3" style={{ width: "60px" }}>
              Back
            </th>
            <th className="text-center bg-red1" style={{ width: "60px" }}>
              Lay
            </th>
            <th className="border-0" style={{ width: "60px" }}></th>
            <th className="border-0" style={{ width: "60px" }}></th>
          </tr>
        </thead>
        <tbody>
          {arr
            ?.filter((item) => matchDetails?.[`team${item}`] != null)
            ?.map((matchs, indexes) => {
              return (
                <tr key={indexes}>
                  <td>
                    <div className="backLayRunner d-flex flex-column px-1 w-100">
                      <span
                        className={`backLayRunner-country title-12  ${
                          isMobile ? "f900" : "f500"
                        } `}
                      >
                        {matchDetails?.[`team${matchs}`]}
                      </span>
                      <div className="d-flex align-items-center justify-content-between w-100">
                        <span
                          className={`title-14  ${
                            matchDetails?.teamRates?.[
                              profitLossDataForMatchConstants[data?.type][
                                matchs
                              ]
                            ] < 0
                              ? "color-red"
                              : "color-green"
                          }`}
                        >
                          {matchDetails?.teamRates?.[
                            profitLossDataForMatchConstants[data?.type][matchs]
                          ]
                            ? parseFloat(
                                matchDetails?.teamRates?.[
                                  profitLossDataForMatchConstants[data?.type][
                                    matchs
                                  ]
                                ]
                              ).toFixed(2)
                            : 0}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td colSpan={backLayCount === 2 ? 2 : 6}>
                    <BetStatusOverlay
                      title={data?.runners?.[indexes]?.status?.toLowerCase()}
                      active={
                        data?.activeStatus === "live" &&
                        data?.runners?.[indexes]?.status?.toLowerCase() ===
                          "active"
                          ? false
                          : true
                      }
                    >
                      {new Array(backLayCount === 2 ? 1 : 3)
                        .fill(0)
                        ?.map((_: any, index: number) => (
                          <BackLayBox
                            key={index}
                            customClass="match-odd-bet-place-box"
                            bgColor={`blue${index + 1}`}
                            rate={
                              +data?.runners?.[indexes]?.ex?.availableToBack?.[
                                (isMobile ? 0 : 2) - index
                              ]?.price || 0
                            }
                            percent={
                              data?.runners?.[indexes]?.ex?.availableToBack?.[
                                (isMobile ? 0 : 2) - index
                              ]?.size
                            }
                            active={
                              data?.runners?.[indexes]?.status
                                ?.toLowerCase()
                                ?.toLowerCase() !==
                              teamStatus.active?.toLowerCase()
                            }
                          />
                        ))}
                      {new Array(backLayCount === 2 ? 1 : 3)
                        .fill(0)
                        ?.map((_: any, index: number) => (
                          <BackLayBox
                            key={index}
                            customClass="match-odd-bet-place-box"
                            bgColor={`red${index + 1}`}
                            rate={
                              +data?.runners?.[indexes]?.ex?.availableToLay?.[
                                index
                              ]?.price || 0
                            }
                            percent={
                              data?.runners?.[indexes]?.ex?.availableToLay?.[
                                index
                              ]?.size
                            }
                            active={
                              data?.runners?.[indexes]?.status
                                ?.toLowerCase()
                                ?.toLowerCase() !==
                              teamStatus.active?.toLowerCase()
                            }
                          />
                        ))}
                    </BetStatusOverlay>
                  </td>

                  {!isMobile && <td></td>}
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default SetWinner;
