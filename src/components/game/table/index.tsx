import { Table } from "react-bootstrap";
import BackLayBox from "../../backLayBox";
import BackLayTable from "./index.json";
import "./style.scss";
function GameTable() {
  return (
    <div className="gameTable">
      <Table>
        <thead>
          <tr>
            <th>
              <span className="f600 px-1">Runner</span>
            </th>
            <th style={{ width: "84px" }}></th>
            <th style={{ width: "84px" }}></th>
            <th className="text-center bg-blue1" style={{ width: "84px" }}>
              Back
            </th>
            <th className="text-center bg-red1" style={{ width: "84px" }}>
              Lay
            </th>
            <th style={{ width: "84px" }}></th>
            <th style={{ width: "84px" }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="backLayRunner d-flex flex-column px-2">
                <span className="title-14">India</span>
                <span className="title-14">0</span>
              </div>
            </td>
            {BackLayTable()?.map((item) => (
              <td>
                <BackLayBox
                  bgColor="blue1"
                  rate={item?.rate}
                  percent={item?.percent}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td>
              <div className="backLayRunner d-flex flex-column px-2">
                <span className="title-14">England</span>
                <span className="title-14">0</span>
              </div>
            </td>
            {BackLayTable()?.map((item) => (
              <td>
                <BackLayBox
                  bgColor="blue1"
                  rate={item?.rate}
                  percent={item?.percent}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td>
              <div className="backLayRunner d-flex flex-column px-2">
                <span className="title-14">Australia</span>
                <span className="title-14">0</span>
              </div>
            </td>
            {BackLayTable()?.map((item) => (
              <td>
                <BackLayBox
                  bgColor="blue1"
                  rate={item?.rate}
                  percent={item?.percent}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default GameTable;
