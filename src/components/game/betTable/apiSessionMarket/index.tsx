import { useState } from "react";
import { Table } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRunAmount,
  resetRunAmount,
} from "../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../store/store";
import isMobile from "../../../../utils/screenDimension";
import BetStatusOverlay from "../../../commonComponent/betStatusOverlay";
import CustomModal from "../../../commonComponent/modal";
import YesNoBox from "../../../yesNo";
import "../../style.scss";
import TableRunner from "../sessionMarket/tableRunner";

interface ApiSessionMarketTableProps {
  data: any;
  title: any;
  matchDetails: any;
  sessionType: any;
}
function ApiSessionMarketTable({
  data,
  title,
  sessionType,
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
          {data?.section?.filter((item:any)=>!item?.isManual)?.map((item: any, i: number) => {
            return (
              <tr key={item?.id}>
                <td>
                  <div
                    className={`backLayRunner d-flex flex-column title-12 ${
                      isMobile ? "f900" : "f600"
                    }`}
                  >
                    <div
                      onClick={() => {
                        dispatch(resetRunAmount());
                        setRunnerModalShow((prev) => !prev);
                        dispatch(getRunAmount(item?.id));
                      }}
                    >
                      {item?.name}
                    </div>
                    <span className="title-12 f400">
                      {matchDetails?.profitLossDataSession.length > 0
                        ? matchDetails?.profitLossDataSession?.reduce(
                            (accumulator: any, bet: any) => {
                              const maxLossToAdd =
                                bet?.betId === item?.id
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
                  <BetStatusOverlay title="Suspend">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        // width: "100%",
                      }}
                    >
                      {item?.ex?.availableToLay?.map((oddData: any) => {
                        return (
                          <YesNoBox
                            style={{ width: "50px" }}
                            // overlay={true}
                            bgColor="red1"
                            rate={oddData?.price}
                            percent={oddData?.size}
                            onClick={handleClick}
                          />
                        );
                      })}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        // width: "100%",
                      }}
                    >
                      {item?.ex?.availableToBack?.map((oddData: any) => {
                        return (
                          <YesNoBox
                            style={{ width: "50px" }}
                            // overlay={true}
                            bgColor="blue3"
                            rate={oddData?.price}
                            percent={oddData?.size}
                            onClick={handleClick}
                          />
                        );
                      })}
                    </div>

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
