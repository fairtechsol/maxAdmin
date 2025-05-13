import { memo, useState } from "react";
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
  const [runnerModalShow, setRunnerModalShow] = useState(false);

  const { runAmount } = useSelector(
    (state: RootState) => state.match.placeBets
  );
  const dispatch: AppDispatch = useDispatch();

  const handlePrice = (rate: any) => {
    if (rate && rate != 0) {
      return rate;
    } else {
      return "-";
    }
  };

  const handleRunAmountClick = (item: any) => {
    if (item.activeStatus === "save") {
      return true;
    } else if (
      calculateMaxLoss(detail?.profitLossDataSession, item?.id) === 0
    ) {
      return;
    } else {
      if (
        ![sessionBettingType.fancy1, sessionBettingType.oddEven].includes(mtype)
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
  };

  return (
    <>
      <div
        className="sessionNormalContainer"
        style={{ marginTop: isMobile ? "" : "10px" }}
      >
        <MarketTableHeader
          title={title}
          type="khado"
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
              <div className="sessionYesNoBox  rateBoxWidthKhado">
                <div className="sessionKhadoYesBox back1Background">
                  <span className={`f-size16 sessionBackTxt`}>Back</span>
                </div>

                <div className="sessionEmptyBox" />
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
                      onClick={() => handleRunAmountClick(item)}
                    >
                      {item?.RunnerName}-{item?.ex?.availableToLay?.[0]?.price}
                    </span>
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
                  <div className="sessionRateBoxContainer rateBoxWidthKhado">
                    {(item?.activeStatus != "live" ||
                      item?.GameStatus != "") && (
                      <div className="suspended-overlayRates">
                        <span className="suspendTextCmmn">
                          {item?.GameStatus ?? "SUSPENDED"}
                        </span>
                      </div>
                    )}
                    <div
                      className="sessionRateBox rateFont back1Background"
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
export default memo(SessionKhado);
