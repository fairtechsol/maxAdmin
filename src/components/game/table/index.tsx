import { Breadcrumb, Table } from "react-bootstrap";
import BackLayBox from "../../backLayBox";
import "./style.scss";

function GameTable() {
  return (
    <div className="gameTable">
      <Table hover>
        <thead>
          <tr>
            <th>
              <Breadcrumb className="bg-lightGray">
                <Breadcrumb.Item href="#">
                  ICC Cricket World Cup{" "}
                </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                  ICC Cricket World Cup
                </Breadcrumb.Item>
                <Breadcrumb.Item active>10/5/2023 2:00:00 PM</Breadcrumb.Item>
              </Breadcrumb>
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
            <td></td>
            <td>
              <BackLayBox bgColor="blue1" rate={1.94} percent={11} />
            </td>
            <td>
              <BackLayBox bgColor="blue2" rate={1.94} percent={25} />
            </td>
            <td>
              <BackLayBox bgColor="blue3" rate={1.94} percent={32} />
            </td>
            <td>
              <BackLayBox bgColor="red1" rate={1.94} percent={9} />
            </td>
            <td>
              <BackLayBox bgColor="red2" rate={1.94} percent={21} />
            </td>
            <td>
              <BackLayBox bgColor="red3" rate={1.94} percent={17} />
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

export default GameTable;
