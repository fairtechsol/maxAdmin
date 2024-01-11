import { Table } from "react-bootstrap";
import BackLayBox from "../../../backLayBox";
import BetStatusOverlay from "../../../commonComponent/betStatusOverlay";
import "../../style.scss";

interface MatchOddsProps {
  minMax?: any;
  data: any;
  backLayCount?: number;
  matchDetails: any;
}
function MatchOdds({
  minMax,
  data,
  backLayCount,
  matchDetails,
}: MatchOddsProps) {
  const handleClick = () => {};
  return (
    <div
      className={`gameTable table-responsive sessionFancyTable borderTable border `}
    >
      <Table className="mb-0">
        <thead>
          <tr>
            <th className="border-0">
              {minMax && (
                <span className="f700 title-16 px-2 text-info ">{minMax}</span>
              )}
            </th>
            <th className="border-0" style={{ width: "84px" }}></th>
            <th className="border-0" style={{ width: "84px" }}></th>
            <th className="text-center bg-blue3" style={{ width: "84px" }}>
              Back
            </th>
            <th className="text-center bg-red1" style={{ width: "84px" }}>
              Lay
            </th>
            <th className="border-0" style={{ width: "84px" }}></th>
            <th className="border-0" style={{ width: "84px" }}></th>
          </tr>
        </thead>
        <tbody>
          {/* <Loader /> */}
          <tr>
            <td>
              <div className="backLayRunner d-flex flex-column px-3">
                <span className="backLayRunner-country title-14">
                  {data?.name}
                </span>
                <span className="title-14">{data?.lastPriceTraded}</span>
              </div>
            </td>
            <td colSpan={6}>
              <BetStatusOverlay title="Lock">
                {data?.ex?.availableToBack?.map((back: any, index: number) => (
                  <BackLayBox
                    key={index}
                    style={{ width: "84px" }}
                    bgColor={`blue${index + 1}`}
                    rate={back?.price}
                    percent={back?.size}
                    onClick={handleClick}
                  />
                ))}
                {data?.ex?.availableToLay?.map((red: any, index: number) => (
                  <BackLayBox
                    style={{ width: "84px" }}
                    // overlay={true}
                    bgColor={`red${index + 1}`}
                    rate={red?.price}
                    percent={red?.size}
                    onClick={handleClick}
                  />
                ))}
              </BetStatusOverlay>
            </td>

            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default MatchOdds;
