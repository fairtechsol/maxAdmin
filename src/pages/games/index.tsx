import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LiveStreamComponent from "../../components/commonComponent/liveStreamComponent";
import BetTable from "../../components/game/betTable";
import GameHeader from "../../components/game/gameHeader";
//import ScoreCard from "../../components/game/scoreCard";
import {
  Constants,
  liveStreamUrlCricket,
  profitLossDataForMatchConstants,
} from "../../utils/Constants";
import service from "../../service";
import { socket, socketService } from "../../socketManager";
import {
  getPlacedBets,
  matchDetailAction,
  updateBalance,
  updateBetsPlaced,
  updateMatchRates,
  updatePlacedbetsDeleteReason,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import { MatchType } from "../../utils/enum";
import GameUserBets from "../../components/game/gameUserBets";
//import { customSortBySessionMarketName } from "../../helpers";
//import Iframe from "../../components/iframe/back";
import Iframe from "../../components/iframe/iframe";
import MarketBox from "../../components/game/marketBox";
import ManualMarket from "../../components/game/manulMarkets";
import SessionCricketCasino from "../../components/game/sessionCricketCasino";
import SessionOddEven from "../../components/game/sessionOddEven";
import SessionNormal from "../../components/game/sessionNormal";
import SessionKhado from "../../components/game/sessionKhado";
import SessionFancy from "../../components/game/sessionFancy";
import moment from "moment-timezone";
import Tournament from "../../components/game/tournament";
import OtherMarket from "../../components/game/otherMarket";

const Games = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();

  const { matchDetails, success } = useSelector(
    (state: RootState) => state.match.matchListSlice
  );
  const { breadCrumb } = useSelector(
    (state: RootState) => state.match.sidebarList
  );

  // const { matchDetails, marketId, loading } = useSelector(
  //   (state: RootState) => state.match.matchList
  // );

  const [liveScoreBoardData, setLiveScoreBoardData] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1199);
    };
    // Add event listener to update isMobile on window resize
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const updateMatchDetailToRedux = (event: any) => {
    try {
      if (id === event?.id) {
        dispatch(updateMatchRates(event));
      } else return;
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteBet = (event: any) => {
    try {
      if (event?.matchId === id) {
        dispatch(matchDetailAction(id));
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.placedBet?.matchId === id) {
        dispatch(matchDetailAction(id));
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleMatchBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.matchId === id) {
        // dispatch(matchDetailAction(id));
        // dispatch(getPlacedBets(id));
        dispatch(updateBetsPlaced(event?.jobData));
        dispatch(updateBalance(event));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleMatchResultDeclarted = (event: any) => {
    try {
      if (event?.matchId === id) {
        navigate("/admin/market-analysis");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSessionResultDeclare = (event: any) => {
    try {
      if (event?.matchId === id) {
        // dispatch(removeRunAmount(event));
        dispatch(getPlacedBets(id));
        // dispatch(amountupdate(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSessionResultUnDeclare = (event: any) => {
    try {
      if (event?.matchId === id) {
        // dispatch(updateMaxLossForBetOnUndeclare(event));
        dispatch(getPlacedBets(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReasonUpdate = (event: any) => {
    try {
      if (event?.matchId === id) {
        dispatch(updatePlacedbetsDeleteReason(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (id) {
        dispatch(matchDetailAction(id));
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [id]);
 

  useEffect(() => {
    try {
      if (success && socket) {
        socketService.match.getMatchRatesOff(id);
        socketService.match.userSessionBetPlacedOff();
        socketService.match.userMatchBetPlacedOff();
        socketService.match.matchResultDeclaredOff();
        socketService.match.declaredMatchResultAllUserOff();
        socketService.match.matchDeleteBetOff();
        socketService.match.sessionDeleteBetOff();
        socketService.match.sessionResultOff();
        socketService.match.sessionResultUnDeclareOff();
        socketService.match.updateDeleteReasonOff();
        socketService.match.joinMatchRoom(id, "superAdmin");
        socketService.match.getMatchRates(id, updateMatchDetailToRedux);
        socketService.match.matchDeleteBet(handleDeleteBet);
        socketService.match.sessionDeleteBet(handleDeleteBet);
        socketService.match.userSessionBetPlaced(handleSessionBetPlaced);
        socketService.match.userMatchBetPlaced(handleMatchBetPlaced);
        socketService.match.matchResultDeclared(handleMatchResultDeclarted);
        socketService.match.declaredMatchResultAllUser(
          handleMatchResultDeclarted
        );
        socketService.match.sessionResult(handleSessionResultDeclare);
        socketService.match.sessionResultUnDeclare(
          handleSessionResultUnDeclare
        );
        socketService.match.updateDeleteReason(handleDeleteReasonUpdate);
      }
    } catch (e) {
      console.log(e);
    }
  }, [location?.pathname, success, socket, id]);

  useEffect(() => {
    try {
      if (id) {
        return () => {
          socketService.match.leaveMatchRoom(id);
          socketService.match.getMatchRatesOff(id);
          socketService.match.userSessionBetPlacedOff();
          socketService.match.userMatchBetPlacedOff();
          socketService.match.matchResultDeclaredOff();
          socketService.match.declaredMatchResultAllUserOff();
          socketService.match.matchDeleteBetOff();
          socketService.match.sessionDeleteBetOff();
          socketService.match.sessionResultOff();
          socketService.match.sessionResultUnDeclareOff();
          socketService.match.updateDeleteReasonOff();
          // dispatch(resetUserProfitLoss());
          // dispatch(resetBetSessionProfitLossGraph());
        };
      }
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    try {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          if (id) {
            // dispatch(matchDetailAction(id));
            dispatch(getPlacedBets(id));
            socketService.match.joinMatchRoom(id, "superAdmin");
            socketService.match.getMatchRates(id, updateMatchDetailToRedux);
          }
        } else if (document.visibilityState === "hidden") {
          socketService.match.leaveMatchRoom(id);
          socketService.match.getMatchRatesOff(id);
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const getScoreBoard = async (eventId: string) => {
    try {
      const response: any = await service.get(
        // `https://fairscore7.com/score/getMatchScore/${marketId}`
        // `https://dpmatka.in/dcasino/score.php?matchId=${marketId}`
        //`https://devscore.fairgame.club/score/getMatchScore/${marketId}`
        `${Constants.thirdPartyLive}/cricketScore?eventId=${eventId}`
      );
      // {"success":false,"msg":"Not found"}
      //console.log("response 11:", response);
      if (response?.success !== false) {
        setLiveScoreBoardData(response?.data);
        setErrorCount(0);
      }
    } catch (e: any) {
      console.log("Error:", e?.message);
      setLiveScoreBoardData(null);
      setErrorCount((prevCount: number) => prevCount + 1);
    }
  };

  useEffect(() => {
    //if (matchDetails?.marketId === marketId) {
    let intervalTime = 5000;
    if (errorCount >= 5 && errorCount < 10) {
      intervalTime = 60000;
    } else if (errorCount >= 10) {
      intervalTime = 600000;
    }
    const interval = setInterval(() => {
      getScoreBoard(matchDetails?.eventId);
    }, intervalTime);

    return () => {
      clearInterval(interval);
      setLiveScoreBoardData(null);
    };
    //}
  }, [matchDetails?.id, matchDetails?.eventId, errorCount]);

  const normalizedData = matchDetails?.sessionBettings?.map((item: any) =>
    JSON.parse(item)
  );
  const manualEntries = matchDetails?.manualSessionActive
    ? normalizedData?.filter((item: any) => item?.isManual)
    : [];
  return (
    <div className="gamePage">
      <Container fluid>
        {/* <GameHeader /> */}
        {/* table start here */}
        <div className="gamePage-table">
          <Row className="no-gutters">
            <Col md={8}>
              {breadCrumb && breadCrumb?.type === "tied_match" ? (
                matchDetails?.apiTideMatch?.isActive && (
                  <Col md={12}>
                    <BetTable
                      title={"Runners"}
                      type={MatchType.MATCH_ODDS}
                      data={matchDetails?.apiTideMatch}
                    />
                  </Col>
                )
              ) : (
                <>
                  {/* <BetTableHeader type={""} customClass="" title={'title'} /> */}
                  <div
                    className="w-100 d-flex flex-row justify-content-between align-items-center p-1"
                    style={{ backgroundColor: "#ffc742", color: "#fff" }}
                  >
                    <span className="f-bold title-16">
                      {matchDetails?.competitionName
                        ? `${matchDetails?.competitionName} > ${matchDetails?.title}`
                        : matchDetails?.title}
                    </span>
                    <span className="title-14">
                      {moment(matchDetails?.startAt).format(
                        "DD/MM/YYYY HH:mm:ss"
                      )}
                    </span>
                  </div>
                  {matchDetails?.matchOdd?.activeStatus === "live" &&
                    matchDetails?.matchOdd?.isActive && (
                      <Col md={12}>
                        <MarketBox
                          title={matchDetails?.matchOdd?.name}
                          box={
                            matchDetails?.matchOdd?.runners?.[0]?.ex
                              ?.availableToBack?.length > 2
                              ? 6
                              : 2
                          }
                          data={matchDetails?.matchOdd}
                          detail={matchDetails}
                          // data={matchDetails?.matchOdd}
                          teamARates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.matchOdd?.type
                                  ]?.A +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                          teamBRates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.matchOdd?.type
                                  ]?.B +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                        />
                      </Col>
                    )}
                  {matchDetails?.bookmaker?.activeStatus === "live" &&
                    matchDetails?.bookmaker?.isActive && (
                      <Col md={12} style={{ marginTop: "8px" }}>
                        <MarketBox
                          title={matchDetails?.bookmaker?.name}
                          box={
                            matchDetails?.bookmaker?.runners?.[0]?.ex
                              ?.availableToBack?.length > 2
                              ? 6
                              : 2
                          }
                          data={matchDetails?.bookmaker}
                          detail={matchDetails}
                          // data={matchDetails?.matchOdd}
                          teamARates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.bookmaker?.type
                                  ]?.A +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                          teamBRates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.bookmaker?.type
                                  ]?.B +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                        />
                      </Col>
                    )}

                  {matchDetails?.other
                    ?.filter(
                      (item: any) =>
                        item?.isActive && item?.activeStatus === "live"
                    )
                    ?.map((item: any, index: number) => {
                      return (
                        <Col md={12} key={index}>
                          <OtherMarket
                            title={item?.name}
                            box={
                              item?.runners?.[0]?.ex?.availableToBack?.length >
                              2
                                ? 6
                                : 2
                            }
                            data={item}
                            detail={matchDetails}
                            // data={matchDetails?.matchOdd}
                          />
                        </Col>
                      );
                    })}
                  {matchDetails?.tournament
                    ?.filter(
                      (item: any) =>
                        item?.isActive && item?.activeStatus === "live"
                    )
                    ?.map((item: any, index: number) => {
                      return (
                        <Col md={12} key={index}>
                          <Tournament
                            title={item?.name}
                            box={
                              item?.runners?.[0]?.ex?.availableToBack?.length >
                              2
                                ? 6
                                : 2
                            }
                            data={item}
                            detail={matchDetails}
                            // data={matchDetails?.matchOdd}
                          />
                        </Col>
                      );
                    })}
                  {matchDetails?.bookmaker2?.activeStatus === "live" &&
                    matchDetails?.bookmaker2?.isActive && (
                      <Col md={12}>
                        <MarketBox
                          title={matchDetails?.bookmaker2?.name}
                          box={
                            matchDetails?.bookmaker2?.runners?.[0]?.ex
                              ?.availableToBack?.length > 2
                              ? 6
                              : 2
                          }
                          data={matchDetails?.bookmaker2}
                          detail={matchDetails}
                          // data={matchDetails?.matchOdd}
                          teamARates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.bookmaker2?.type
                                  ]?.A +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                          teamBRates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.bookmaker2?.type
                                  ]?.B +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                        />
                      </Col>
                    )}
                  {matchDetails?.quickBookmaker
                    ?.filter(
                      (item: any) =>
                        item?.isActive && item?.activeStatus === "live"
                    )
                    ?.map((item: any, index: number) => {
                      return (
                        <Col md={12} key={index}>
                          <ManualMarket
                            title={item?.name}
                            data={item}
                            detail={matchDetails}
                            // data={matchDetails?.matchOdd}
                            teamARates={
                              matchDetails?.teamC
                                ? 0
                                : matchDetails?.profitLossDataMatch?.[
                                    profitLossDataForMatchConstants?.[
                                      item?.type
                                    ]?.A +
                                      "_" +
                                      matchDetails?.id
                                  ] ?? 0
                            }
                            teamBRates={
                              matchDetails?.teamC
                                ? 0
                                : matchDetails?.profitLossDataMatch?.[
                                    profitLossDataForMatchConstants?.[
                                      item?.type
                                    ]?.B +
                                      "_" +
                                      matchDetails?.id
                                  ] ?? 0
                            }
                          />
                        </Col>
                      );
                    })}
                  {matchDetails?.apiTideMatch2?.activeStatus === "live" &&
                    matchDetails?.apiTideMatch2?.isActive && (
                      <Col md={12}>
                        <MarketBox
                          title={matchDetails?.apiTideMatch2?.name}
                          box={
                            matchDetails?.apiTideMatch2?.runners?.[0]?.ex
                              ?.availableToBack?.length > 2
                              ? 6
                              : 2
                          }
                          data={matchDetails?.apiTideMatch2}
                          detail={matchDetails}
                          // data={matchDetails?.matchOdd}
                          teamARates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.apiTideMatch2?.type
                                  ]?.A +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                          teamBRates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.apiTideMatch2?.type
                                  ]?.B +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                        />
                      </Col>
                    )}
                  {((matchDetails?.manualTiedMatch?.activeStatus === "live" &&
                    matchDetails?.manualTiedMatch?.isActive) ||
                    (matchDetails?.manualTideMatch?.activeStatus === "live" &&
                      matchDetails?.manualTideMatch?.isActive)) && (
                    <Col md={12}>
                      <ManualMarket
                        title={
                          matchDetails?.manualTiedMatch?.name ||
                          matchDetails?.manualTideMatch?.name
                        }
                        data={
                          matchDetails?.manualTiedMatch ||
                          matchDetails?.manualTideMatch
                        }
                        detail={matchDetails}
                        // data={matchDetails?.matchOdd}
                        teamARates={
                          matchDetails?.teamC
                            ? 0
                            : matchDetails?.profitLossDataMatch?.[
                                profitLossDataForMatchConstants?.[
                                  matchDetails?.manualTideMatch?.type ||
                                    matchDetails?.manualTiedMatch?.type
                                ]?.A +
                                  "_" +
                                  matchDetails?.id
                              ] ?? 0
                        }
                        teamBRates={
                          matchDetails?.teamC
                            ? 0
                            : matchDetails?.profitLossDataMatch?.[
                                profitLossDataForMatchConstants?.[
                                  matchDetails?.manualTideMatch?.type ||
                                    matchDetails?.manualTiedMatch?.type
                                ]?.B +
                                  "_" +
                                  matchDetails?.id
                              ] ?? 0
                        }
                      />
                    </Col>
                  )}
                  {matchDetails?.marketCompleteMatch1?.activeStatus ===
                    "live" &&
                    matchDetails?.marketCompleteMatch1?.isActive && (
                      <Col md={12}>
                        <MarketBox
                          title={matchDetails?.marketCompleteMatch1?.name}
                          box={
                            matchDetails?.marketCompleteMatch1?.runners?.[0]?.ex
                              ?.availableToBack?.length > 2
                              ? 6
                              : 2
                          }
                          data={matchDetails?.marketCompleteMatch1}
                          detail={matchDetails}
                          // data={matchDetails?.matchOdd}
                          teamARates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.marketCompleteMatch1?.type
                                  ]?.A +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                          teamBRates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.marketCompleteMatch1?.type
                                  ]?.B +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                        />
                      </Col>
                    )}

                  {matchDetails?.manualCompleteMatch?.activeStatus === "live" &&
                    matchDetails?.manualCompleteMatch?.isActive && (
                      <Col md={12}>
                        <ManualMarket
                          title={matchDetails?.manualCompleteMatch?.name}
                          data={matchDetails?.manualCompleteMatch}
                          detail={matchDetails}
                          // data={matchDetails?.matchOdd}
                          teamARates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.manualCompleteMatch?.type
                                  ]?.A +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                          teamBRates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.manualCompleteMatch?.type
                                  ]?.B +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                        />
                      </Col>
                    )}

                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexWrap: isMobile ? "nowrap" : "wrap",
                      gap: "1%",
                    }}
                    className={`${isMobile ? "flex-column" : ""}`}
                  >
                    {[
                      {
                        type: "session",
                        title: "Normal",
                        data: matchDetails?.apiSession?.session,
                        component: SessionNormal,
                      },
                      {
                        type: "overByover",
                        title: "overByover",
                        data: matchDetails?.apiSession?.overByover,
                        component: SessionNormal,
                      },
                      {
                        type: "ballByBall",
                        title: "Ballbyball",
                        data: matchDetails?.apiSession?.ballByBall,
                        component: SessionNormal,
                      },
                      {
                        title: "fancy1",
                        data: matchDetails?.apiSession?.fancy1,
                        component: SessionFancy,
                      },
                      {
                        title: "khado",
                        data: matchDetails?.apiSession?.khado,
                        component: SessionKhado,
                      },
                      {
                        type: "meter",
                        title: "meter",
                        data: matchDetails?.apiSession?.meter,
                        component: SessionNormal,
                      },
                      {
                        title: "oddeven",
                        data: matchDetails?.apiSession?.oddEven,
                        component: SessionOddEven,
                      },
                    ].map(
                      (session, index) =>
                        session.data?.section?.length > 0 && (
                          <div
                            key={index}
                            style={{ width: isMobile ? "100%" : "49.5%" }}
                          >
                            <Col md={12}>
                              <session.component
                                title={session.title}
                                mtype={session.type}
                                data={session.data}
                                detail={matchDetails}
                                manual={
                                  session.type === "session" && manualEntries
                                    ? manualEntries
                                    : []
                                }
                              />
                            </Col>
                          </div>
                        )
                    )}
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: "1%",
                    }}
                  >
                    {matchDetails?.apiSession?.cricketCasino?.section?.length >
                      0 &&
                      matchDetails?.apiSession?.cricketCasino?.section?.map(
                        (item: any, index: number) => {
                          let length =
                            matchDetails?.apiSession?.cricketCasino?.section
                              ?.length;
                          return (
                            <div
                              key={index}
                              style={{
                                width: isMobile
                                  ? "100%"
                                  : length % 2 === 0
                                  ? "49.5%"
                                  : index === length - 1
                                  ? "100%"
                                  : "49.5%",
                              }}
                            >
                              {item?.activeStatus === "live" && (
                                <Col md={12}>
                                  <SessionCricketCasino
                                    title={item?.RunnerName}
                                    data={item}
                                    detail={matchDetails}
                                  />
                                </Col>
                              )}
                            </div>
                          );
                        }
                      )}
                  </div>

                  {matchDetails?.apiTideMatch?.activeStatus === "live" &&
                    matchDetails?.apiTideMatch?.isActive && (
                      <Col md={12}>
                        <MarketBox
                          title={matchDetails?.apiTideMatch?.name}
                          box={
                            matchDetails?.apiTideMatch?.runners?.[0]?.ex
                              ?.availableToBack?.length > 2
                              ? 6
                              : 2
                          }
                          data={matchDetails?.apiTideMatch}
                          detail={matchDetails}
                          // data={matchDetails?.matchOdd}
                          teamARates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.apiTideMatch?.type
                                  ]?.A +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                          teamBRates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.apiTideMatch?.type
                                  ]?.B +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                        />
                      </Col>
                    )}
                  {matchDetails?.marketCompleteMatch?.activeStatus === "live" &&
                    matchDetails?.marketCompleteMatch?.isActive && (
                      <Col md={12}>
                        <MarketBox
                          title={matchDetails?.marketCompleteMatch?.name}
                          box={
                            matchDetails?.marketCompleteMatch?.runners?.[0]?.ex
                              ?.availableToBack?.length > 2
                              ? 6
                              : 2
                          }
                          data={matchDetails?.marketCompleteMatch}
                          detail={matchDetails}
                          // data={matchDetails?.matchOdd}
                          teamARates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.marketCompleteMatch?.type
                                  ]?.A +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                          teamBRates={
                            matchDetails?.teamC
                              ? 0
                              : matchDetails?.profitLossDataMatch?.[
                                  profitLossDataForMatchConstants?.[
                                    matchDetails?.marketCompleteMatch?.type
                                  ]?.B +
                                    "_" +
                                    matchDetails?.id
                                ] ?? 0
                          }
                        />
                      </Col>
                    )}
                </>
              )}
            </Col>
            <Col md={4} className="text-white">
              <GameHeader />
              {matchDetails?.eventId && (
                <LiveStreamComponent
                  url={`${liveStreamUrlCricket}${matchDetails?.eventId}`}
                />
              )}
              <div className="my-2">
                {/* <ScoreCard /> */}
                <div className="d-flex w-100 flex-column">
                  <div
                    className="w-100 d-flex justify-content-start title-15 text-white align-items-center f500 ps-2"
                    style={{
                      height: "42px",
                      backgroundColor: "#ffc742b3",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowScore(!showScore)}
                  >
                    Score Card
                  </div>
                  {showScore && liveScoreBoardData && (
                    <Iframe data={liveScoreBoardData} width="100%" />
                  )}
                </div>
              </div>
              <GameUserBets matchId={id} />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default React.memo(Games);
