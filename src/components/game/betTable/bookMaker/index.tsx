import { Table } from "react-bootstrap";
import BackLayBox from "../../../backLayBox";
import "../../style.scss";

interface BookmakerTableProps {
  minMax?: any;
  data: any;
  backLayCount?: number;
}
function BookmakerTable({
  minMax,
  data,
  backLayCount = 6,
}: BookmakerTableProps) {
  const handleClick = () => {};
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
          {data?.map((item: any, i: number) => (
            <tr key={i}>
              <td>
                <div className="backLayRunner d-flex flex-column px-3">
                  <span className="backLayRunner-country title-14">
                    {item?.RunnerName}
                  </span>
                  <span className="title-14">{item?.lastPriceTraded}</span>
                </div>
              </td>
              {item?.ex?.availableToBack?.map((back: any, index: number) => (
                <td key={index}>
                  <BackLayBox
                    style={{ width: "60px" }}
                    // overlay={true}
                    bgColor={`blue${index + 1}`}
                    rate={back?.price}
                    percent={back?.size}
                    onClick={handleClick}
                  />
                </td>
              ))}

              {item?.ex?.availableToLay?.map((red: any, index: number) => (
                <td key={index}>
                  <BackLayBox
                    style={{ width: "60px" }}
                    // overlay={true}
                    bgColor={`red${index + 1}`}
                    rate={red?.price}
                    percent={red?.size}
                    onClick={handleClick}
                  />
                </td>
              ))}

              <td colSpan={2} style={{ borderLeft: 0 }}></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BookmakerTable;
