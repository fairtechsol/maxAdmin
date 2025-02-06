import { useSelector } from "react-redux";
import { dummyArray, formatNumber } from "../../../helpers";
import { RootState } from "../../../store/store";
import isMobile from "../../../utils/screenDimension";
import MarketTableHeader from "../../commonComponent/MarketWiseHeader";
import BetBox from "../betBox";
import "./style.scss";

const Tournament = ({ title, box, data, detail }: any) => {
  const { marketAnalysisDetail } = useSelector(
    (state: RootState) => state.match.marketAnalysis
  );
  const key = `${data.id}_profitLoss_${detail.id}`;

  const profitLossJson = detail?.profitLossDataMatch?.[key];

  const profitLossObj = profitLossJson ? JSON.parse(profitLossJson) : {};
  return (
    <>
      <div className="tournamentContainer">
        {detail?.matchType === "cricket" && (
          <MarketTableHeader
            title={title}
            type={"matchOdds"}
            data={data}
            detail={detail}
          />
        )}

        <div className="tournamentBackLayTab">
          <div className="tournamentMinMaxBox">
            <span className="tournamentMinMax">
              {data?.minBet === data?.maxBet
                ? `Max:${formatNumber(data?.maxBet)}`
                : `Min:${formatNumber(data?.minBet)} Max:${formatNumber(
                    data?.maxBet
                  )}`}
            </span>
          </div>
          <div
            className={
              box === 6
                ? "tournament1BackLayBoxContainer backLayBoxWidth"
                : "tournament2BackLayBoxContainer backLayBoxWidth2"
            }
          >
            <div
              className={
                box === 6 ? "tournament1BackBoxTab" : "tournament2BackBoxTab"
              }
            >
              <span className={`f-size16 tournamentBackTxt`}>Back</span>
            </div>
            <div
              className={
                box === 6 ? "tournament1LayBoxTab" : "tournament2LayBoxTab"
              }
            >
              <span className={`f-size16 tournamentBackTxt`}>Lay</span>
            </div>
            {box === 6 && <div className="tournamentEmptyBox"></div>}
          </div>
        </div>

        {(!data?.isActive ||
          (!["ACTIVE", "OPEN", ""].includes(data?.status) &&
            data?.gtype == "match")) && (
          <div
            className={`outer-suspended-overlayRatestournament ${
              box === 6 ? "rateBoxWidth" : "rateBoxWidth2"
            }`}
            style={{
              height: `${data?.runners?.length * 45}px`,
              bottom: data?.rem ? "20px" : "0px",
            }}
          >
            <span
              className={`suspendTextCmmn`}
              style={{ textTransform: "uppercase" }}
            >
              {!["ACTIVE", "OPEN", ""].includes(data?.status) &&
              data?.gtype == "match"
                ? data?.status
                : ""}
            </span>
          </div>
        )}
        {data?.runners?.length > 0 &&
          data?.runners?.map((item: any, index: any) => {
            return (
              <div className="tournamentTeamTab" key={index}>
                <div
                  className="tournamentTeam"
                  style={isMobile && box === 6 ? { width: "28%" } : {}}
                  // style={box === 6 ? { width: "28%" } : {}}
                >
                  <span className={`teamFont tournamentTeamTxt`}>
                    {item?.nat || item?.runnerName}
                  </span>
                  <div className="d-flex flex-row justify-content-between w-100">
                    <span
                      className={`${
                        parseFloat(
                          marketAnalysisDetail?.length
                            ? Object.values(
                                marketAnalysisDetail?.[0]?.betType?.match?.find(
                                  (item: any) => item.betId == data?.id
                                )?.profitLoss || {}
                              )?.[index] ?? 0
                            : profitLossObj?.[item.id]
                        ) > 0
                          ? "color-green"
                          : "color-red"
                      } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
                    >
                      {marketAnalysisDetail?.length
                        ? (Object.values(
                            marketAnalysisDetail?.[0]?.betType?.match?.find(
                              (item: any) => item.betId == data?.id
                            )?.profitLoss || {}
                          )?.[index] ??
                            0) ||
                          ""
                        : profitLossObj?.[item.id]
                        ? profitLossObj?.[item.id]
                        : ""}
                    </span>
                  </div>
                </div>
                <div
                  className={
                    box === 6
                      ? "tournament1RateBox rateBoxWidth"
                      : "tournament2RateBox rateBoxWidth2"
                  }
                >
                  {!["ACTIVE", "OPEN", ""].includes(data?.status) &&
                  data?.gtype == "match"
                    ? ""
                    : item?.status !== "ACTIVE" &&
                      item?.status !== "OPEN" &&
                      item?.status !== "" && (
                        <div className="suspended-overlayRatestournament">
                          <span
                            className={`suspendTextCmmn`}
                            style={{ textTransform: "uppercase" }}
                          >
                            {item?.status}
                          </span>
                        </div>
                      )}
                  {box === 6 ? (
                    <>
                      {(item?.ex?.availableToBack?.length > 0
                        ? item?.ex?.availableToBack
                        : dummyArray
                      )?.map((item2: any) => {
                        return (
                          <BetBox
                            data={item2}
                            type={"back"}
                            detail={detail}
                            runner={item}
                          />
                        );
                      })}
                      {(item?.ex?.availableToLay?.length > 0
                        ? item?.ex?.availableToLay
                        : dummyArray
                      )?.map((item2: any) => {
                        return (
                          <BetBox
                            data={item2}
                            type={"lay"}
                            detail={detail}
                            runner={item}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <BetBox
                        data={item?.ex?.availableToBack?.[0]}
                        type={"back"}
                        detail={detail}
                        runner={item}
                      />

                      <BetBox
                        data={item?.ex?.availableToLay?.[0]}
                        type={"lay"}
                        detail={detail}
                        runner={item}
                      />
                    </>
                  )}
                </div>
              </div>
            );
          })}

        {data?.rem && (
          <div className="tournamentRemarkTab">
            <div className="remark-content1">{data?.rem}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default Tournament;
