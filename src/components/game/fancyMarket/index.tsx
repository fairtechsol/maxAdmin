import { Table } from "react-bootstrap";
import TabelHeader from "../../commonComponent/tableHeader";
import YesNoBox from "../../yesNo";
import FancyMarketData from "./index.json";
import "./style.scss";
function FancyMarketTable() {
  const handleClick = () => {
    alert("dhsad");
  };
  return (
    <>
      <TabelHeader customClass="my-2" title="Fancy Market" />
      <div className={`gameTable sessionFancyTable borderTable border `}>
        <Table className="mb-0">
          <thead>
            <tr>
              <th className="border-0">
                {/* <span className="f700 title-16 px-2 text-info ">
                  Min:100 Max:10000
                </span> */}
              </th>

              <th className="text-center bg-red1" style={{ width: "50px" }}>
                No
              </th>
              <th className="text-center bg-blue3" style={{ width: "50px" }}>
                Yes
              </th>
              <th className="border-0" style={{ width: "100px" }}></th>
            </tr>
          </thead>
          <tbody>
            {FancyMarketData()?.map((item, i) => (
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
                  <YesNoBox
                    style={{ width: "50px" }}
                    // overlay={true}
                    bgColor="red1"
                    rate={item?.noRate}
                    percent={item?.noPercent}
                    onClick={handleClick}
                  />
                </td>
                <td>
                  <YesNoBox
                    style={{ width: "50px" }}
                    bgColor="blue3"
                    rate={item?.yesRate}
                    percent={item?.yesPercent}
                    onClick={handleClick}
                  />
                </td>

                <td className="minMax align-middle">
                  <div className="minMaxBox d-flex flex-column justify-content-center text-end px-2 text-info title-14">
                    <span className="">Min:{item?.min}</span>
                    <span>Min:{item?.max}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default FancyMarketTable;
