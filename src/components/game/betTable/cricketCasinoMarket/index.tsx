import { Table } from "react-bootstrap";
import isMobile from "../../../../utils/screenDimension";
import BetStatusOverlay from "../../../commonComponent/betStatusOverlay";
import YesNoBox from "../../../yesNo";
import "../../style.scss";

interface CricketCasinoMarketTableProps {
  data: any;
  title: any;
  matchDetails: any;
}
function CricketCasinoMarketTable({
  data,
  title,
  matchDetails,
}: CricketCasinoMarketTableProps) {
  const handleClick = () => {};
  return (
    <div className={`gameTable sessionFancyTable borderTable border `}>
      <Table className="mb-0">
        <thead>
          <tr>
            <th className="border-0">
              {" "}
              <div className="minMaxBox d-flex justify-content-end text-end px-2 title-12 gap-1">
                <span className="">Min:{data?.minBet}</span>
                <span>Max:{data?.maxBet}</span>
              </div>
            </th>
            <th className="text-center bg-blue3" style={{ width: "200px" }}>
              Back
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }, (_, index) => index)?.map(
            (element: any, index: any) => {
              const currSessionItem =
                data?.section?.find(
                  (item: any) => parseInt(item?.sid) == element + 1
                ) || {};
              return (
                <tr key={element}>
                  <td>
                    <div
                      className={`backLayRunner d-flex flex-column title-12  ml-2 ${
                        isMobile ? "f900" : "f600"
                      }`}
                    >
                      <div>{`${element} Number`}</div>
                      <span
                        className={`title-12 f400 ${
                          Number(
                            parseFloat(
                              matchDetails?.profitLossDataSession?.find(
                                (items: any) => items?.betId === data?.id
                              )?.profitLoss?.[element] || 0
                            ).toFixed(2)
                          ) < 0
                            ? "color-red"
                            : Number(
                                parseFloat(
                                  matchDetails?.profitLossDataSession?.find(
                                    (items: any) => items?.betId === data?.id
                                  )?.profitLoss?.[element] || 0
                                ).toFixed(2)
                              ) > 0
                            ? "color-green"
                            : ""
                        }`}
                      >
                        {matchDetails?.profitLossDataSession.length > 0
                          ? Number(
                              parseFloat(
                                matchDetails?.profitLossDataSession?.find(
                                  (items: any) => items?.betId === data?.id
                                )?.profitLoss?.[element] || 0
                              ).toFixed(2)
                            )
                          : 0}
                      </span>
                    </div>
                  </td>
                  <td colSpan={3}>
                    <BetStatusOverlay
                      active={
                        !["active", "", "open"].includes(
                          data?.GameStatus?.toLowerCase()
                        )
                      }
                      title={data?.GameStatus}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {!currSessionItem?.odds?.length && (
                          <YesNoBox
                            style={{ width: "200px" }}
                            bgColor="blue3"
                            rate={0}
                            percent={0}
                            onClick={handleClick}
                          />
                        )}
                        {currSessionItem?.odds?.map((oddData: any) => {
                          return (
                            <YesNoBox
                              style={{ width: "200px" }}
                              bgColor="blue3"
                              rate={oddData?.odds}
                              percent={oddData?.size}
                              onClick={handleClick}
                            />
                          );
                        })}
                      </div>
                    </BetStatusOverlay>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default CricketCasinoMarketTable;
