import { Table } from "react-bootstrap";
import BackLayBox from "../../backLayBox";
import "../style.scss";
import MatchOddsData from "./index.json";
function MatchOddsTable() {
  const handleClick = () => {};
  return (
    <>
      <div className={`gameTable mt-3 `}>
        <Table className="mb-0">
          <thead>
            <tr>
              <th className="border-0">
                <span className="f600 px-1">Runner</span>
              </th>
              <th className="border-0" style={{ width: "85px" }}></th>
              <th className="border-0" style={{ width: "85px" }}></th>
              <th className="text-center bg-blue3" style={{ width: "85px" }}>
                Back
              </th>
              <th className="text-center bg-red1" style={{ width: "85px" }}>
                Lay
              </th>
              <th className="border-0" style={{ width: "85px" }}></th>
              <th className="border-0" style={{ width: "85px" }}></th>
            </tr>
          </thead>
          <tbody>
            {MatchOddsData()?.map((item, i) => (
              <tr>
                <td>
                  <div className="backLayRunner d-flex flex-column px-3">
                    <span className="backLayRunner-country title-14">
                      {item?.country}
                    </span>
                    <span className="title-14">{item?.score}</span>
                  </div>
                </td>
                <td>
                  <BackLayBox
                    style={{ width: "85px" }}
                    // overlay={true}
                    bgColor="blue1"
                    rate={item?.backRate1}
                    percent={item?.backPercent1}
                    onClick={handleClick}
                  />
                </td>
                <td>
                  <BackLayBox
                    style={{ width: "85px" }}
                    // overlay={true}
                    bgColor="blue2"
                    rate={item?.backRate2}
                    percent={item?.backPercent2}
                    onClick={handleClick}
                  />
                </td>
                <td>
                  <BackLayBox
                    style={{ width: "85px" }}
                    // overlay={true}
                    bgColor="blue3"
                    rate={item?.backRate3}
                    percent={item?.backPercent3}
                    onClick={handleClick}
                  />
                </td>
                <td>
                  <BackLayBox
                    style={{ width: "85px" }}
                    // overlay={true}
                    bgColor="red1"
                    rate={item?.layRate1}
                    percent={item?.layPercent1}
                    onClick={handleClick}
                  />
                </td>
                <td>
                  <BackLayBox
                    style={{ width: "85px" }}
                    // overlay={true}
                    bgColor="red2"
                    rate={item?.layRate2}
                    percent={item?.layPercent2}
                    onClick={handleClick}
                  />
                </td>
                <td>
                  <BackLayBox
                    style={{ width: "85px" }}
                    // overlay={true}
                    bgColor="red3"
                    rate={item?.layRate3}
                    percent={item?.layPercent3}
                    onClick={handleClick}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default MatchOddsTable;
