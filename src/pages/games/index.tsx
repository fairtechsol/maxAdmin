import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BetTable from "../../components/game/betTable";
import GameHeader from "../../components/game/gameHeader";
import LiveMatch from "../../components/game/liveMatch";
import ScoreCard from "../../components/game/scoreCard";
import UserBets from "../../components/game/userBet";
import { MatchType } from "../../utils/enum";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getPlacedBets,
  matchDetailAction,
  updateMatchRates,
} from "../../store/actions/match/matchAction";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { socket, socketService } from "../../socketManager";

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
                  <Row className="no-gutters">
                    {matchDetails?.apiSessionActive && (
                      <Col md={6}>
                        <BetTable
                          title={"Session Market"}
                          type={MatchType.API_SESSION_MARKET}
                          data={matchDetails?.sessionBettings}
                        />
                      </Col>
                    )}
                    {/* <BetTableHeader title="runners" />
                    <div className="game-heading"><span className="card-header-title">SSD Bari v Ternana</span> <span className="float-right">5/17/2024 12:00:00 AM</span></div> */}
                    {/* {matchDetails?.manualSessionActive && (
                      <Col md={6}>
                        <BetTable
                          title={"Fancy Market"}
                          type={MatchType.SESSION_MARKET}
                          data={matchDetails?.sessionBettings?.filter(
                            (item: any) =>
                              JSON.parse(item)?.selectionId === null
                          )}
                        />
                      </Col>
                    )} */}
                  </Row>
                </>
              )}
            </Col>
            <Col md={4}>
              <LiveMatch />
              <div className="my-2">
                <ScoreCard />
              </div>
              <UserBets matchId={id} />
              {/* <BetTableHeader
                customClass="mt-2 fw-normal"
                title="Rules"
                style={{ height: "39px" }}
              />
              <Row>
                <Col lg={6}>
                  <Rules teamName="Banglore XI" />
                </Col>
                <Col lg={6}>
                  <Rules teamName="Rajasthan XI" />
                </Col>
              </Row> */}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default React.memo(Games);
