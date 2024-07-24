import { useState } from "react";
import { Table } from "react-bootstrap";
// import { Link } from "react-router-dom";
import BetStatusOverlay from "../../../commonComponent/betStatusOverlay";
import CustomModal from "../../../commonComponent/modal";
import YesNoBox from "../../../yesNo";
import "../../style.scss";
import TableRunner from "../sessionMarket/tableRunner";
import {
  getRunAmount,
  resetRunAmount,
} from "../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";

interface ApiSessionMarketTableProps {
  data: any;
  title: any;
  matchDetails: any;
}
function ApiSessionMarketTable({
  data,
  title,
  matchDetails,
}: ApiSessionMarketTableProps) {
  const dispatch: AppDispatch = useDispatch();
  const [runnerModalShow, setRunnerModalShow] = useState(false);
  const { runAmount } = useSelector(
    (state: RootState) => state.match.placeBets
  );

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
          {data?.map((bet: any, i: number) => {
            let item = JSON.parse(bet);
            return (
              <tr key={item?.id}>
                <td>
                  <div className="backLayRunner d-flex flex-column title-10">
                    <div
                      onClick={() => {
                        dispatch(resetRunAmount());
                        setRunnerModalShow((prev) => !prev);
                        dispatch(getRunAmount(item?.id));
                      }}
                    >
                  
                        {item?.name}
                 
                    </div>
                    <span className="title-12">
                      {matchDetails?.profitLossDataSession.length > 0
                        ? matchDetails?.profitLossDataSession?.reduce(
                            (accumulator: any, bet: any) => {
                              const maxLossToAdd =
                                bet?.betId === item?.id ? +bet?.maxLoss : 0;
                              return accumulator + maxLossToAdd;
                            },
                            0
                          )
                        : 0}
                    </span>
                  </div>
                </td>
                <td colSpan={3}>
                  <BetStatusOverlay title="Suspend">
                    <YesNoBox
                      style={{ width: "50px" }}
                      // overlay={true}
                      bgColor="red1"
                      rate={item?.noRate}
                      percent={item?.noPercent}
                      onClick={handleClick}
                    />
                    <YesNoBox
                      style={{ width: "50px" }}
                      bgColor="blue3"
                      rate={item?.yesRate}
                      percent={item?.yesPercent}
                      onClick={handleClick}
                    />
                    <div className="minMaxBox d-flex flex-column justify-content-center text-end px-2 text-info title-14">
                      <span className="">Min:{item?.minBet}</span>
                      <span>Max:{item?.maxBet}</span>
                    </div>
                  </BetStatusOverlay>
                </td>

                <td className="minMax align-middle"></td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <CustomModal show={runnerModalShow} setShow={setRunnerModalShow}>
        <TableRunner runAmount={runAmount} />
      </CustomModal>
    </div>
  );
}

export default ApiSessionMarketTable;
