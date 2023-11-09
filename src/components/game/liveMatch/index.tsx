import { Table } from "react-bootstrap";
import BackLayBox from "../../backLayBox";

function LiveMatch() {
  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>Match</th>
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
            <td></td>
            <td>
              <BackLayBox bgColor="blue1" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="blue2" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="blue3" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red1" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red2" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red3" rate={1.94} percent={11} />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <BackLayBox bgColor="blue1" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="blue2" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="blue3" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red1" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red2" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red3" rate={1.94} percent={11} />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <BackLayBox bgColor="blue1" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="blue2" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="blue3" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red1" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red2" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red3" rate={1.94} percent={11} />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <BackLayBox bgColor="blue1" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="blue2" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="blue3" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red1" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red2" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red3" rate={1.94} percent={11} />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <BackLayBox bgColor="blue1" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="blue2" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="blue3" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red1" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red2" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="red3" rate={1.94} percent={11} />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default LiveMatch;
