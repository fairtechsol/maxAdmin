import { Table } from "react-bootstrap";
import BackLayBox from "../../../backLayBox";
import BetStatusOverlay from "../../../commonComponent/betStatusOverlay";
import "../../style.scss";

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
  const handleClick = () => {
    alert("5555");
  };
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
          <tr className="">
            <td>
              <div className="backLayRunner d-flex flex-column px-3">
                <span className="backLayRunner-country title-14">
                  {data?.RunnerName}
                </span>
                <span className="title-14">{data?.lastPriceTraded}</span>
              </div>
            </td>
            <td colSpan={backLayCount === 6 ? 6 : 2}>
              <BetStatusOverlay title="Lock">
                {data?.ex?.availableToBack?.map((back: any, index: number) => (
                  <BackLayBox
                    key={index}
                    style={{ width: "60px" }}
                    // overlay={true}
                    bgColor={`blue${index + 1}`}
                    rate={back?.price}
                    percent={back?.size}
                    onClick={handleClick}
                  />
                ))}
                {data?.ex?.availableToLay?.map((red: any, index: number) => (
                  <BackLayBox
                    key={index}
                    style={{ width: "60px" }}
                    // overlay={true}
                    bgColor={`red${index + 1}`}
                    rate={red?.price}
                    percent={red?.size}
                    onClick={handleClick}
                  />
                ))}
              </BetStatusOverlay>
            </td>

            <td colSpan={2} style={{ borderLeft: 0 }}></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default BookmakerTable;
