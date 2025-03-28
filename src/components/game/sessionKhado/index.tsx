import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateMaxLoss, formatNumber, handleSize } from "../../../helpers";
import {
  getRunAmount,
  getRunAmountMeter,
  resetRunAmount,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import { sessionBettingType } from "../../../utils/Constants";
import isMobile from "../../../utils/screenDimension";
import MarketTableHeader from "../../commonComponent/MarketWiseHeader";
import CustomModal from "../../commonComponent/modal";
import TableRunner from "../betTable/sessionMarket/tableRunner";
import "./style.scss";

const SessionKhado = ({
  title,
  data,
  detail,
  mtype,
  marketAnalysisDetail,
}: any) => {
  const handlePrice = (rate: any) => {
    if (rate && rate != 0) {
      return rate;
    } else {
      return "-";
    }
  };
  const [runnerModalShow, setRunnerModalShow] = useState(false);

  const { runAmount } = useSelector(
    (state: RootState) => state.match.placeBets
  );
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <div
        className="sessionNormalContainer"
        style={{ marginTop: isMobile ? "" : "10px" }}
      >
        {/* <div className="sessionNormalTitle">
          <span className="sessionNormalTitleTxt f-size15">{title}</span>
        </div> */}
        <MarketTableHeader
          title={title}
          type={"khado"}
          data={data}
          detail={detail}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div className="sessionYesNoBoxContainer">
              <div
                className="sessionYesNoBox  rateBoxWidthKhado"
                // style={{ width: isLap ? "180px" : !isMobile ? "240px" : "" }}
              >
                <div className="sessionKhadoYesBox back1Background">
                  <span className={`f-size16 sessionBackTxt`}>Back</span>
                </div>

                <div className="sessionEmptyBox"></div>
              </div>
            </div>
            {data?.section?.map((item: any, index: any) => {
              return (
                <div className="sessionRateContainer" key={index}>
                  <div
                    className="sessionRateName runnerWidthNormal"
                    style={{ overflow: "hidden" }}
                  >
                    <span
                      className="teamFont"
                      style={{ fontWeight: "400", lineHeight: 1 }}
                      onClick={() => {
                        // console.log("first", item);
                        if (item.activeStatus === "save") {
                          return true;
                        } else if (
                          calculateMaxLoss(
                            detail?.profitLossDataSession,
                            item?.id
                          ) === 0
                        ) {
                          return;
                        } else {
                          if (
                            ![
                              sessionBettingType.fancy1,
                              sessionBettingType.oddEven,
                            ].includes(mtype)
                          ) {
                            dispatch(resetRunAmount());
                            setRunnerModalShow((prev) => !prev);
                            if (title === "meter") {
                              dispatch(getRunAmountMeter(item?.id));
                            } else {
                              dispatch(getRunAmount(item?.id));
                            }
                          }
                        }
                      }}
                    >
                      {item?.RunnerName}-{item?.ex?.availableToLay?.[0]?.price}
                    </span>{" "}
                    <span
                      className={`${
                        (marketAnalysisDetail?.length
                          ? marketAnalysisDetail?.[0]?.betType?.session?.find(
                              (items: any) => items.betId == item?.id
                            )?.profitLoss?.maxLoss ?? 0
                          : calculateMaxLoss(
                              detail?.profitLossDataSession,
                              item?.id
                            )) < 0
                          ? "color-red"
                          : "color-red"
                      } title-14 fbold`}
                    >
                      {(marketAnalysisDetail?.length
                        ? marketAnalysisDetail?.[0]?.betType?.session?.find(
                            (items: any) => items.betId == item?.id
                          )?.profitLoss?.maxLoss ?? 0
                        : calculateMaxLoss(
                            detail?.profitLossDataSession,
                            item?.id
                          )) !== 0
                        ? `-${
                            marketAnalysisDetail?.length
                              ? marketAnalysisDetail?.[0]?.betType?.session?.find(
                                  (items: any) => items.betId == item?.id
                                )?.profitLoss?.maxLoss ?? 0
                              : calculateMaxLoss(
                                  detail?.profitLossDataSession,
                                  item?.id
                                )
                          }`
                        : ""}
                    </span>
                  </div>
                  <div
                    className="sessionRateBoxContainer rateBoxWidthKhado"
                  >
                    {(item?.activeStatus != "live" ||
                      item?.GameStatus != "") && (
                      <div className="suspended-overlayRates">
                        <span className={`suspendTextCmmn`}>
                          {item?.GameStatus ?? "SUSPENDED"}
                        </span>
                      </div>
                    )}
                    <div
                      className={`sessionRateBox rateFont back1Background`}
                      style={{ cursor: "pointer" }}
                    >
                      <span className={`rateFont`}>
                        {handlePrice(item?.ex?.availableToBack?.[0]?.price) ??
                          "-"}
                      </span>
                      <span className={`f-size12 sessionRate2Box`}>
                        {handleSize(item?.ex?.availableToBack?.[0]?.size)}
                      </span>
                    </div>

                    <div className="sessionMinBoxContainer">
                      <span className={`sessionMinBox sessionMinMaxFont`}>
                        Min:{formatNumber(item?.min)}
                      </span>
                      <span className={`sessionMinBox sessionMinMaxFont`}>
                        Max:{formatNumber(item?.max)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <CustomModal show={runnerModalShow} setShow={setRunnerModalShow}>
        <TableRunner runAmount={runAmount} />
      </CustomModal>
    </>
  );
};
export default SessionKhado;
