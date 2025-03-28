import { useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRunAmount,
  resetRunAmount,
} from "../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { teamStatus } from "../../../../utils/Constants";
import BetStatusOverlay from "../../../commonComponent/betStatusOverlay";
import CustomModal from "../../../commonComponent/modal";
import YesNoBox from "../../../yesNo";
import "../../style.scss";
import TableRunner from "./tableRunner";
interface SessionMarketTableProps {
  data: any;
  title: any;
  matchDetails: any;
}
function SessionMarketTable({
  data,
  title,
  matchDetails,
}: SessionMarketTableProps) {
  const dispatch: AppDispatch = useDispatch();
  const { runAmount } = useSelector(
    (state: RootState) => state.match.placeBets
  );
  const [runnerModalShow, setRunnerModalShow] = useState(false);

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
            <tr key={JSON.parse(item)?.id}>
              <td>
                <div className="backLayRunner d-flex flex-column px-3">
                  <div
                    onClick={() => {
                      dispatch(resetRunAmount());
                      setRunnerModalShow((prev) => !prev);
                      dispatch(getRunAmount(JSON.parse(item)?.id));
                    }}
                  >
                    <Link
                      to=""
                      className="backLayRunner-country title-14 defaultBlue"
                    >
                      {JSON.parse(item)?.name}
                    </Link>
                  </div>
                  <span className="title-14">
                    {matchDetails?.profitLossDataSession.length > 0
                      ? matchDetails?.profitLossDataSession?.reduce(
                          (accumulator: any, bet: any) => {
                            const maxLossToAdd =
                              bet?.betId === JSON.parse(item)?.id
                                ? parseFloat(bet?.maxLoss).toFixed(2)
                                : 0;
                            return accumulator + maxLossToAdd;
                          },
                          0
                        )
                      : 0}
                  </span>
                </div>
              </td>
              <td colSpan={3}>
                <BetStatusOverlay
                  title={JSON.parse(item)?.status}
                  active={JSON.parse(item)?.status !== teamStatus.active}
                >
                  <YesNoBox
                    style={{ width: "50px" }}
                    bgColor="red1"
                    rate={JSON.parse(item)?.noRate}
                    percent={JSON.parse(item)?.noPercent}
                    onClick={handleClick}
                    active={JSON.parse(item)?.status !== teamStatus.active}
                  />
                  <YesNoBox
                    style={{ width: "50px" }}
                    bgColor="blue3"
                    rate={JSON.parse(item)?.yesRate}
                    percent={JSON.parse(item)?.yesPercent}
                    onClick={handleClick}
                    active={JSON.parse(item)?.status !== teamStatus.active}
                  />
                  <div className="minMaxBox d-flex flex-column justify-content-center text-end px-2 text-info title-14">
                    <span className="">Min:{JSON.parse(item)?.minBet}</span>
                    <span>Max:{JSON.parse(item)?.maxBet}</span>
                  </div>
                </BetStatusOverlay>
              </td>

              <td className="minMax align-middle"></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CustomModal show={runnerModalShow} setShow={setRunnerModalShow}>
        <TableRunner runAmount={runAmount} />
      </CustomModal>
    </div>
  );
}

export default SessionMarketTable;
