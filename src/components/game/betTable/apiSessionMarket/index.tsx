import { useState } from "react";
import { Table } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRunAmount,
  resetRunAmount,
} from "../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { sessionBettingType } from "../../../../utils/Constants";
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

            <th className={`text-center ${sessionType==sessionBettingType.oddEven?"bg-blue3":"bg-red1"}`}style={{ width: "50px" }}>
              {sessionType==sessionBettingType.oddEven?"Back":sessionType==sessionBettingType.fancy1?"Lay":"No"}
            </th>
            <th className="text-center bg-blue3" style={{ width: "50px" }}>
            {sessionType==sessionBettingType.oddEven||sessionType==sessionBettingType.fancy1?"Back":"Yes"}
            </th>
            <th className="border-0" style={{ width: "100px" }}></th>
          </tr>
        </thead>
        <tbody>
          {data?.section
            ?.filter((item: any) => !item?.isManual)
            ?.map((item: any, i: number) => {
              return (
                <tr key={item?.id}>
                  <td>
                    <div
                      className={`backLayRunner d-flex flex-column title-12  ml-2 ${
                        isMobile ? "f900" : "f600"
                      }`}
                    >
                      <div
                        onClick={() => {
                          if (
                            ![
                              sessionBettingType.fancy1,
                              sessionBettingType.oddEven,
                            ].includes(sessionType)
                          ) {
                            dispatch(resetRunAmount());
                            setRunnerModalShow((prev) => !prev);
                            dispatch(getRunAmount(item?.id));
                          }
                        }}
                      >
                        {item?.name}
                      </div>
                      <span className={`title-12 f400 ${
                          -Number(
                            parseFloat(
                              matchDetails?.profitLossDataSession?.find(
                                (items: any) => items?.betId === item?.id
                              )?.maxLoss || 0
                            ).toFixed(2)
                          ) < 0
                            ? "color-red"
                            : ""
                        }`}>
                        {matchDetails?.profitLossDataSession.length > 0
                          ? -Number(
                              parseFloat(
                                matchDetails?.profitLossDataSession?.find(
                                  (items: any) => items?.betId === item?.id
                                )?.maxLoss || 0
                              ).toFixed(2)
                            )
                          : 0}
                      </span>
                    </div>
                  </td>
                  <td colSpan={3}>
                    <BetStatusOverlay active={!["active","","open"].includes(item?.GameStatus?.toLowerCase())} title={item?.GameStatus}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          // width: "100%",
                        }}
                      >
                        {!item?.ex?.availableToLay?.length && (
                          <YesNoBox
                            style={{ width: "50px" }}
                            // overlay={true}
                            bgColor={`${sessionType==sessionBettingType.oddEven?"blue3":"red1"}`}
                            rate={0}
                            percent={0}
                            onClick={handleClick}
                          />
                        )}
                        {item?.ex?.availableToLay?.map((oddData: any) => {
                          return (
                            <YesNoBox
                              style={{ width: "50px" }}
                              // overlay={true}
                              bgColor={`${sessionType==sessionBettingType.oddEven?"blue3":"red1"}`}
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
                        {!item?.ex?.availableToLay?.length && (
                          <YesNoBox
                            style={{ width: "50px" }}
                            // overlay={true}
                            bgColor="blue3"
                            rate={0}
                            percent={0}
                            onClick={handleClick}
                          />
                        )}
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
