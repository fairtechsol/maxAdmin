import { Table } from "react-bootstrap";
import BackLayBox from "../../backLayBox";
import BackLayTable from "./index.json";
import "./style.scss";
function BookMakerTable() {
  const handleClick = () => {
    alert("dhsad");
  };
  return (
    <div className={`gameTable mt-3`}>
      <Table>
        <thead>
          <tr>
            <th className="border-0">
              <span className="f600 px-1">Min: 100 Max: 10000</span>
            </th>
            <th className="border-0" style={{ width: "60px" }}></th>
            <th className="border-0" style={{ width: "60px" }}></th>
            <th className="text-center bg-blue1" style={{ width: "60px" }}>
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
          <tr>
            <td>
              <div className="backLayRunner d-flex flex-column px-2">
                <span className="backLayRunner-country title-14">India</span>
                <span className="title-14">0</span>
              </div>
            </td>
            {BackLayTable()?.map((item, i) => (
              <BackLayBox
                style={{ width: "60px" }}
                overlay={true}
                rate={item?.rate}
                percent={item?.percent}
                onClick={handleClick}
              />
            ))}
          </tr>
          <tr>
            <td>
              <div className="backLayRunner d-flex flex-column px-2">
                <span className="backLayRunner-country title-14">
                  Australia
                </span>
                <span className="title-14">0</span>
              </div>
            </td>
            {BackLayTable()?.map((item, i) => (
              <BackLayBox
                rate={item?.rate}
                percent={item?.percent}
                onClick={handleClick}
              />
            ))}
          </tr>
          <tr>
            <td>
              <div className="backLayRunner d-flex flex-column px-2">
                <span className="backLayRunner-country title-14">
                  Australia
                </span>
                <span className="title-14">0</span>
              </div>
            </td>
            {BackLayTable()?.map((item, i) => (
              <BackLayBox
                overlay={true}
                rate={item?.rate}
                percent={item?.percent}
                onClick={handleClick}
              />
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default BookMakerTable;
