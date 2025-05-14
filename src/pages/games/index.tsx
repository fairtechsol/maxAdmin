import moment from "moment-timezone";
import { memo, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LiveStreamComponent from "../../components/commonComponent/liveStreamComponent";
import GameUserBets from "../../components/game/gameUserBets";
import SessionCricketCasino from "../../components/game/sessionCricketCasino";
import SessionFancy from "../../components/game/sessionFancy";
import SessionKhado from "../../components/game/sessionKhado";
import SessionNormal from "../../components/game/sessionNormal";
import SessionOddEven from "../../components/game/sessionOddEven";
import Tournament from "../../components/game/tournament";
import Iframe from "../../components/iframe/iframe";
import { matchService, socket, socketService } from "../../socketManager";
import {
  getMarketAnalysis,
  getPlacedBets,
  matchDetailAction,
  resetMarketAnalysys,
  updateBalance,
  updateBetsPlaced,
  updateMatchRates,
  updatePlacedbetsDeleteReason,
  updateTeamRatesOnMarketUndeclare,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import { ApiConstants, liveStreamUrl } from "../../utils/Constants";
import { getTvData } from "../../utils/tvUrlGet";

const Games = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [showScore, setShowScore] = useState(false);
  const [tvData, setTvData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);

  const { matchDetails, success, liveScoreBoardData } = useSelector(
    (state: RootState) => state.match.matchListSlice
  );
  const { marketAnalysisDetail } = useSelector(
    (state: RootState) => state.match.marketAnalysis
  );

  let permissions: any = localStorage.getItem("permissions");
  const parsedPermissions = JSON.parse(permissions);

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
        if (!parsedPermissions || parsedPermissions?.currentBets) {
          dispatch(getPlacedBets({ id: id, userId: state?.userId }));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.placedBet?.matchId === id) {
        dispatch(matchDetailAction(id));
        if (!parsedPermissions || parsedPermissions?.currentBets) {
          dispatch(getPlacedBets({ id: id, userId: state?.userId }));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleMatchBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.matchId === id) {
        if (!parsedPermissions || parsedPermissions?.currentBets) {
          dispatch(updateBetsPlaced(event?.jobData));
        }
        dispatch(updateBalance(event));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleMatchResultDeclarted = (event: any) => {
    try {
      if (event?.matchId === id && event.isMatchDeclare) {
        navigate("/admin/market-analysis");
      } else {
        if (!parsedPermissions || parsedPermissions?.currentBets) {
          dispatch(getPlacedBets({ id: id, userId: state?.userId }));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSessionResultDeclare = (event: any) => {
    try {
      if (event?.matchId === id) {
        if (!parsedPermissions || parsedPermissions?.currentBets) {
          dispatch(getPlacedBets({ id: id, userId: state?.userId }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSessionResultUnDeclare = (event: any) => {
    try {
      if (event?.matchId === id) {
        if (!parsedPermissions || parsedPermissions?.currentBets) {
          dispatch(getPlacedBets({ id: id, userId: state?.userId }));
        }
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

  const handleMatchResultUndeclared = (event: any) => {
    if (event?.matchId !== id) return;
    if (event?.betType) {
      dispatch(updateTeamRatesOnMarketUndeclare(event));
    } else {
      dispatch(matchDetailAction(id));
    }
    if (!parsedPermissions || parsedPermissions?.currentBets) {
      dispatch(getPlacedBets({ id: id, userId: state?.userId }));
    }
  };

  useEffect(() => {
    if (id) {
      matchService.connect([id]);
    }
    return () => {
      matchService.disconnect();
    };
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1199);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    try {
      if (id) {
        dispatch(matchDetailAction(id));
        if (!parsedPermissions || parsedPermissions?.currentBets) {
          dispatch(getPlacedBets({ id: id, userId: state?.userId }));
        }
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

        socketService.match.joinMatchRoom(id);
        socketService.match.getMatchRates(id, updateMatchDetailToRedux);

        if (!state?.userId) {
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
          socketService.match.matchResultUnDeclared(
            handleMatchResultUndeclared
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [pathname, success, socket, id]);

  useEffect(() => {
    try {
      if (id) {
        return () => {
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
            if (!parsedPermissions || parsedPermissions?.currentBets) {
              dispatch(getPlacedBets({ id: id, userId: state?.userId }));
            }
            socketService.match.joinMatchRoom(id);
            socketService.match.getMatchRates(id, updateMatchDetailToRedux);
          }
        } else if (document.visibilityState === "hidden") {
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

  const normalizedData = matchDetails?.sessionBettings?.map((item: any) =>
    JSON.parse(item)
  );
  const manualEntries = matchDetails?.manualSessionActive
    ? normalizedData?.filter((item: any) => item?.isManual)
    : [];

  useEffect(() => {
    try {
      if (state?.userId) {
        dispatch(
          getMarketAnalysis({
            url: `${ApiConstants.MATCH.MARKETANALYSIS}?userId=${state?.userId}&matchId=${state?.matchId}`,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [state]);

  useEffect(() => {
    return () => {
      dispatch(resetMarketAnalysys());
    };
  }, []);

  useEffect(() => {
    if (matchDetails?.eventId) {
      getTvData(
        matchDetails?.eventId,
        setTvData,
        matchDetails?.matchType,
        true,
        true
      );
    }
  }, [matchDetails?.id]);

  return (
    <div className="gamePage">
      <Container fluid>
        <div className="gamePage-table">
          <Row className="no-gutters">
            <Col md={8}>
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
                  {moment(matchDetails?.startAt).format("DD/MM/YYYY HH:mm:ss")}
                </span>
              </div>
              {matchDetails?.tournament
                ?.filter((item: any) => item?.activeStatus === "live")
                ?.map((item: any, index: number) => {
                  return (
                    <Col md={12} key={index}>
                      <Tournament
                        title={item?.name}
                        box={
                          item?.runners?.[0]?.ex?.availableToBack?.length > 2
                            ? 6
                            : 2
                        }
                        data={item}
                        detail={matchDetails}
                      />
                    </Col>
                  );
                })}
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
                ].map((session, index) =>
                  session.data?.section?.length > 0 ||
                  (session.type === "session" && manualEntries?.length) ? (
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
                          marketAnalysisDetail={marketAnalysisDetail}
                        />
                      </Col>
                    </div>
                  ) : (
                    ""
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
                {matchDetails?.apiSession?.cricketCasino?.section?.length > 0 &&
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
                                marketAnalysisDetail={marketAnalysisDetail}
                              />
                            </Col>
                          )}
                        </div>
                      );
                    }
                  )}
              </div>
            </Col>
            <Col md={4} className="text-white">
              {matchDetails?.eventId && (
                <LiveStreamComponent
                  url={
                    process.env.NODE_ENV === "production"
                      ? tvData?.tvData?.iframeUrl
                      : `${liveStreamUrl}${matchDetails?.eventId}/${matchDetails?.matchType}`
                  }
                  eventId={matchDetails?.eventId}
                  matchType={matchDetails?.matchType}
                  setTvData={setTvData}
                />
              )}
              <div className="my-2">
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

export default memo(Games);
