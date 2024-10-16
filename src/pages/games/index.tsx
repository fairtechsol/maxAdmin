import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LiveStreamComponent from "../../components/commonComponent/liveStreamComponent";
import BetTable from "../../components/game/betTable";
import GameHeader from "../../components/game/gameHeader";
import ScoreCard from "../../components/game/scoreCard";
import { socket, socketService } from "../../socketManager";
import {
  getPlacedBets,
  matchDetailAction,
  updateMatchRates,
  updatePlacedbetsDeleteReason,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import { sessionBettingType } from "../../utils/Constants";
import { MatchType } from "../../utils/enum";
import GameUserBets from "../../components/game/gameUserBets";
import { customSortBySessionMarketName } from "../../helpers";

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
        dispatch(matchDetailAction(id));
        dispatch(getPlacedBets(id));
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
        dispatch(getPlacedBets(`eq${id}`));
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
        dispatch(getPlacedBets(`eq${id}`));
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
  }, [location?.pathname, success, socket]);

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
            dispatch(matchDetailAction(id));
            dispatch(getPlacedBets(id));
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
  }, []);
  return (
    <div className="gamePage">
      <Container fluid>
        <GameHeader />
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
                  {matchDetails?.matchOdd?.isActive && (
                    <Col md={12}>
                      <BetTable
                        title={"Runners"}
                        type={MatchType.MATCH_ODDS}
                        data={matchDetails?.matchOdd}
                      />
                    </Col>
                  )}
                  {matchDetails?.bookmaker?.isActive && (
                    <Col md={12}>
                      <BetTable
                        title={matchDetails?.bookmaker?.name}
                        type={MatchType.BOOKMAKER}
                        data={matchDetails?.bookmaker}
                      />
                    </Col>
                  )}
                  {matchDetails?.quickBookmaker
                    ?.filter((item: any) => item?.isActive)
                    ?.map((item: any) => {
                      return (
                        <Col md={12}>
                          <BetTable
                            title={item?.name}
                            type={MatchType.QUICKBOOKMAKER}
                            data={item}
                          />
                        </Col>
                      );
                    })}

                  {matchDetails?.apiTideMatch?.isActive && (
                    <Col md={12}>
                      <BetTable
                        title={matchDetails?.apiTideMatch?.name}
                        type={MatchType.BOOKMAKER}
                        data={matchDetails?.apiTideMatch}
                        teamYesNo={true}
                      />
                    </Col>
                  )}

                  {matchDetails?.marketCompleteMatch?.isActive && (
                    <Col md={12}>
                      <BetTable
                        title={matchDetails?.marketCompleteMatch?.name}
                        type={MatchType.BOOKMAKER}
                        data={matchDetails?.marketCompleteMatch}
                        teamYesNo={true}
                      />
                    </Col>
                  )}

                  {matchDetails?.manualTiedMatch?.isActive && (
                    <Col md={12}>
                      <BetTable
                        title={matchDetails?.manualTiedMatch?.name}
                        type={MatchType.QUICKBOOKMAKER}
                        data={matchDetails?.manualTiedMatch}
                        teamYesNo={true}
                      />
                    </Col>
                  )}

                  {matchDetails?.manualCompleteMatch?.isActive && (
                    <Col md={12}>
                      <BetTable
                        title={matchDetails?.manualCompleteMatch?.name}
                        type={MatchType.QUICKBOOKMAKER}
                        data={matchDetails?.manualCompleteMatch}
                        teamYesNo={true}
                      />
                    </Col>
                  )}

                  <Row className="no-gutters">
                    {matchDetails?.apiSessionActive &&
                      Object.entries(matchDetails?.updatedSessionBettings || {})
                        ?.filter(
                          ([key, value]: any) =>
                            value?.section?.length > 0 &&
                            key != sessionBettingType.cricketCasino
                        )
                        ?.slice()
                        ?.sort(customSortBySessionMarketName)
                        ?.map(([key, value]: any) => {
                          return (
                            <Col md={12}>
                              <BetTable
                                title={value?.mname || key}
                                type={MatchType.API_SESSION_MARKET}
                                sessionType={key}
                                data={value}
                              />
                            </Col>
                          );
                        })}
                    {matchDetails?.apiSessionActive &&
                      matchDetails?.updatedSessionBettings?.cricketCasino?.section?.map(
                        (item: any) => {
                          return (
                            <Col md={12}>
                              <BetTable
                                title={item?.name}
                                type={MatchType.CRICKET_CASINO_SESSION_MARKET}
                                data={item}
                              />
                            </Col>
                          );
                        }
                      )}
                    {/* <BetTableHeader title="runners" />
                    <div className="game-heading"><span className="card-header-title">SSD Bari v Ternana</span> <span className="float-right">5/17/2024 12:00:00 AM</span></div> */}
                    {matchDetails?.manualSessionActive &&
                      matchDetails?.sessionBettings?.filter(
                        (item: any) => JSON.parse(item)?.isManual
                      )?.length && (
                        <Col md={6}>
                          <BetTable
                            title={"Fancy Market"}
                            type={MatchType.SESSION_MARKET}
                            data={matchDetails?.sessionBettings?.filter(
                              (item: any) => JSON.parse(item)?.isManual
                            )}
                          />
                        </Col>
                      )}
                  </Row>
                </>
              )}
            </Col>
            <Col md={4} className="text-white">
              {matchDetails?.eventId && (
                <LiveStreamComponent eventId={matchDetails?.eventId} />
              )}
              <div className="my-2">
                <ScoreCard />
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
