import { Table } from "react-bootstrap";
import YesNoBox from "../../../yesNo";
import "../../style.scss";
interface SessionMarketTableProps {
  data: any;
}
function SessionMarketTable({ data }: SessionMarketTableProps) {
  const handleClick = () => {};
  return (
    <div className={`gameTable sessionFancyTable borderTable border `}>
      <Table className="mb-0">
        <thead>
          <tr>
            <th className="border-0"></th>

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
          {data?.map((item: any, i: number) => (
            <tr key={i}>
              <td>
                <div className="backLayRunner d-flex flex-column px-3">
                  <span className="backLayRunner-country title-14">
                    {item?.RunnerName}
                  </span>
                  <span className="title-14">{0}</span>
                </div>
              </td>
              <td>
                <YesNoBox
                  style={{ width: "50px" }}
                  // overlay={true}
                  bgColor="red1"
                  rate={item?.BackPrice1}
                  percent={item?.BackSize1}
                  onClick={handleClick}
                />
              </td>
              <td>
                <YesNoBox
                  style={{ width: "50px" }}
                  bgColor="blue3"
                  rate={item?.LayPrice1}
                  percent={item?.LaySize1}
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
  );
}

export default SessionMarketTable;
