import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  matchBettingType,
  profitLossDataForMatchConstants,
} from "../../../../utils/Constants";
import isMobile from "../../../../utils/screenDimension";
import BackLayBox from "../../../backLayBox";
import BetStatusOverlay from "../../../commonComponent/betStatusOverlay";
import "../../style.scss";

interface MatchOddsProps {
  title: string;
  minMax?: any;
  data: any;
  matchDetails?: any;
  backLayCount?: number;
}
function MatchOdds({
  title,
  minMax,
  data,
  matchDetails,
  backLayCount,
}: MatchOddsProps) {
  let teamsToMap: any;

  const { marketAnalysisDetail } = useSelector(
    (state: RootState) => state.match.marketAnalysis
  );
  if (matchDetails?.teamC) {
    teamsToMap = ["A", "B", "C"];
  } else {
    teamsToMap = ["A", "B"];
  }

  return (
    <div
      className={`gameTable table-responsive sessionFancyTable borderTable border `}
    >
      <Table className="mb-0">
        <thead>
          <tr>
            <th className="border-0 px-2">
              <span className="m-2">{title}</span>
              <div className="px-2 text-info">
                {minMax && (
                  <span className="f700 title-16 px-2 text-info ">
                    {minMax}
                  </span>
                )}
              </div>
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
          {teamsToMap
            ?.filter((item: any) => matchDetails?.[`team${item}`] !== null)
            ?.map((matchs: any, indexes: any) => {
              return (
                <tr key={indexes}>
                  <td>
                    <div className="backLayRunner d-flex flex-column px-1 w-100">
                      <span
                        className={`backLayRunner-country title-12  ${
                          isMobile ? "f900" : "f600"
                        } `}
                      >
                        {data?.type === "tiedMatch1"
                          ? indexes === 0
                            ? "Yes"
                            : "No"
                          : matchDetails?.[`team${matchs}`]}
                      </span>
                      <div className="d-flex align-items-center justify-content-between w-100">
                        <span className="title-14">
                          {data?.type === "tiedMatch1" ? (
                            indexes === 0 ? (
                              <span
                                className={
                                  (marketAnalysisDetail?.length
                                    ? marketAnalysisDetail?.[0]?.betType?.match?.find(
                                        (items: any) =>
                                          [
                                            matchBettingType.tiedMatch1,
                                            matchBettingType.tiedMatch2,
                                            matchBettingType.tiedMatch3,
                                          ].includes(items.marketType)
                                      )?.profitLoss?.[matchs.toLowerCase()] ?? 0
                                    : matchDetails?.profitLossDataMatch?.[
                                        `yesRateTie_${matchDetails?.id}`
                                      ]) < 0
                                    ? "color-red"
                                    : "color-green"
                                }
                              >
                                {parseFloat(
                                  marketAnalysisDetail?.length
                                    ? marketAnalysisDetail?.[0]?.betType?.match?.find(
                                        (items: any) =>
                                          [
                                            matchBettingType.tiedMatch1,
                                            matchBettingType.tiedMatch2,
                                            matchBettingType.tiedMatch3,
                                          ].includes(items.marketType)
                                      )?.profitLoss?.[matchs.toLowerCase()] ?? 0
                                    : matchDetails?.profitLossDataMatch?.[
                                        `yesRateTie_${matchDetails?.id}`
                                      ] ?? 0
                                ).toFixed(2)}
                              </span>
                            ) : (
                              <span
                                className={
                                  (marketAnalysisDetail?.length
                                    ? marketAnalysisDetail?.[0]?.betType?.match?.find(
                                        (items: any) =>
                                          [
                                            matchBettingType.tiedMatch1,
                                            matchBettingType.tiedMatch2,
                                            matchBettingType.tiedMatch3,
                                          ].includes(items.marketType)
                                      )?.profitLoss?.[matchs.toLowerCase()] ?? 0
                                    : matchDetails?.profitLossDataMatch?.[
                                        `${
                                          profitLossDataForMatchConstants[
                                            data?.type
                                          ]?.[matchs]
                                        }_${matchDetails?.id}`
                                      ]) < 0
                                    ? "color-red"
                                    : "color-green"
                                }
                              >
                                {parseFloat(
                                  marketAnalysisDetail?.length
                                    ? marketAnalysisDetail?.[0]?.betType?.match?.find(
                                        (items: any) =>
                                          [
                                            matchBettingType.tiedMatch1,
                                            matchBettingType.tiedMatch2,
                                            matchBettingType.tiedMatch3,
                                          ].includes(items.marketType)
                                      )?.profitLoss?.[matchs.toLowerCase()] ?? 0
                                    : matchDetails?.profitLossDataMatch?.[
                                        `${
                                          profitLossDataForMatchConstants[
                                            data?.type
                                          ]?.[matchs]
                                        }_${matchDetails?.id}`
                                      ] ?? 0
                                ).toFixed(2)}
                              </span>
                            )
                          ) : (
                            <span
                              className={
                                (marketAnalysisDetail?.length
                                  ? marketAnalysisDetail?.[0]?.betType?.match?.find(
                                      (items: any) =>
                                        [
                                          matchBettingType.matchOdd,
                                          matchBettingType.bookmaker,
                                          matchBettingType.bookmaker2,
                                          matchBettingType.quickbookmaker1,
                                          matchBettingType.quickbookmaker2,
                                          matchBettingType.quickbookmaker3,
                                        ].includes(items.marketType)
                                    )?.profitLoss?.[matchs.toLowerCase()] ?? 0
                                  : matchDetails?.profitLossDataMatch?.[
                                      `${
                                        profitLossDataForMatchConstants[
                                          data?.type
                                        ]?.[matchs]
                                      }_${matchDetails?.id}`
                                    ]) < 0
                                  ? "color-red"
                                  : "color-green"
                              }
                            >
                              {parseFloat(
                                marketAnalysisDetail?.length
                                  ? marketAnalysisDetail?.[0]?.betType?.match?.find(
                                      (items: any) =>
                                        [
                                          matchBettingType.matchOdd,
                                          matchBettingType.bookmaker,
                                          matchBettingType.bookmaker2,
                                          matchBettingType.quickbookmaker1,
                                          matchBettingType.quickbookmaker2,
                                          matchBettingType.quickbookmaker3,
                                        ].includes(items.marketType)
                                    )?.profitLoss?.[matchs.toLowerCase()] ?? 0
                                  : matchDetails?.profitLossDataMatch?.[
                                      `${
                                        profitLossDataForMatchConstants[
                                          data?.type
                                        ]?.[matchs]
                                      }_${matchDetails?.id}`
                                    ] ?? 0
                              ).toFixed(2)}
                            </span>
                          )}
                        </span>
                        <span className={`title-14`}></span>
                      </div>
                    </div>
                  </td>
                  <td colSpan={backLayCount === 2 ? 2 : 6}>
                    <BetStatusOverlay
                      title={data?.runners?.[indexes]?.status?.toLowerCase()}
                      active={
                        !["ACTIVE", "", undefined, null, "OPEN"].includes(
                          data?.runners?.[indexes]?.status
                        )
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
                              data?.runners?.[indexes]?.ex?.availableToBack?.[
                                index -
                                  (data?.runners?.[indexes]?.ex?.availableToBack
                                    ?.length > 1
                                    ? 0
                                    : 2)
                              ]?.price
                            }
                            percent={
                              data?.runners?.[indexes]?.ex?.availableToBack?.[
                                index -
                                  (data?.runners?.[indexes]?.ex?.availableToBack
                                    ?.length > 1
                                    ? 0
                                    : 2)
                              ]?.size
                            }
                            active={
                              !["ACTIVE", "", undefined, null, "OPEN"].includes(
                                data?.runners?.[indexes]?.status
                              )
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
                              data?.runners?.[indexes]?.ex?.availableToLay?.[
                                index
                              ]?.price
                            }
                            percent={
                              data?.runners?.[indexes]?.ex?.availableToLay?.[
                                index
                              ]?.size
                            }
                            active={
                              !["ACTIVE", "", undefined, null, "OPEN"].includes(
                                data?.runners?.[indexes]?.status
                              )
                            }
                          />
                        ))}
                    </BetStatusOverlay>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default MatchOdds;
