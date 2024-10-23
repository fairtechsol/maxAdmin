import { Table } from "react-bootstrap";
import BackLayBox from "../../../backLayBox";
import BetStatusOverlay from "../../../commonComponent/betStatusOverlay";
import "../../style.scss";
import { teamStatus } from "../../../../utils/Constants";

interface BookmakerTableProps {
  minMax?: any;
  data: any;
  backLayCount?: number;
  matchDetails: any;
}
function BookmakerTable({
  minMax,
  data,
  backLayCount = 6,
  matchDetails,
}: BookmakerTableProps) {
  return (
    <div
      className={`gameTable table-responsive sessionFancyTable borderTable border `}
    >
      <Table className="mb-0">
        <thead>
          <tr>
            <th className="border-0 px-2">
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
          {["A", "B", "C"]
            ?.filter((item) => matchDetails?.[`team${item}`] != null)
            ?.map((item: any, i: number) => (
              <tr key={i}>
                <td>
                  <div className="backLayRunner d-flex flex-column px-1 w-100">
                    <span className={`backLayRunner-country title-12`}>
                      {data?.type === "tiedMatch2"
                        ? i === 0
                          ? "Yes"
                          : "No"
                        : matchDetails?.[`team${item}`]}
                    </span>
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <span
                        className={`title-14 ${
                          matchDetails?.profitLossDataMatch?.[
                            `team${item}Rate_${matchDetails?.id}`
                          ] < 0
                            ? "color-red"
                            : "color-green"
                        }`}
                      >
                        {parseFloat(
                          matchDetails?.profitLossDataMatch?.[
                            `team${item}Rate_${matchDetails?.id}`
                          ] ?? 0
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </td>
                <td colSpan={backLayCount === 2 ? 2 : 6} className={""}>
                  <BetStatusOverlay
                    title={data?.[`statusTeam${item}`]}
                    active={data?.[`statusTeam${item}`] !== teamStatus.active}
                  >
                    {new Array(backLayCount === 2 ? 1 : 3)
                      .fill(0)
                      ?.map((_: any, index: number) => (
                        <BackLayBox
                          style={{ width: "60px" }}
                          key={index}
                          // customClass={`bookmaker-bet-place W-100`}
                          customClass="match-odd-bet-place-box"
                          bgColor={`blue${index + 1}`}
                          rate={data[`backTeam${item}`] - 2 + index}
                          active={
                            data?.[`statusTeam${item}`] !== teamStatus.active
                          }
                        />
                      ))}
                    {new Array(backLayCount === 2 ? 1 : 3)
                      .fill(0)
                      ?.map((_: any, index: number) => (
                        <BackLayBox
                          style={{ width: "60px" }}
                          key={index}
                          //     customClass={`bookmaker-bet-place  ""
                          // `}
                          customClass="match-odd-bet-place-box"
                          bgColor={`red${index + 1}`}
                          rate={data[`layTeam${item}`] + index}
                          active={
                            data?.[`statusTeam${item}`] !== teamStatus.active
                          }
                        />
                      ))}
                  </BetStatusOverlay>
                </td>

                <td colSpan={2} style={{ borderLeft: 0 }}></td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BookmakerTable;
