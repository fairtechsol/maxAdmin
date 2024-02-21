import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import BetTableHeader from "../../components/commonComponent/betTableHeader";
import BetTable from "../../components/game/betTable";
import GameHeader from "../../components/game/gameHeader";
import LiveMatch from "../../components/game/liveMatch";
// import Rules from "../../components/game/rules";
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
import { useLocation, useParams } from "react-router-dom";
import { socketService } from "../../socketManager";

const Games = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  const { id } = useParams();

  const { matchDetails, success } = useSelector(
    (state: RootState) => state.match.matchListSlice
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
      if (success) {
        socketService.match.joinMatchRoom(id, "superAdmin");
        socketService.match.getMatchRates(id, updateMatchDetailToRedux);
        socketService.match.matchDeleteBet(handleDeleteBet);
        socketService.match.sessionDeleteBet(handleDeleteBet);
        socketService.match.userSessionBetPlaced(handleSessionBetPlaced);
        socketService.match.userMatchBetPlaced(handleMatchBetPlaced);
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      socketService.match.leaveMatchRoom(id);
      socketService.match.getMatchRatesOff(id, updateMatchDetailToRedux);
    };
  }, [location?.pathname, success]);

  return (
    <div className="gamePage">
      <Container fluid>
        <GameHeader />
        {/* table start here */}
        <div className="gamePage-table">
          <Row className="no-gutters">
            <Col md={8}>
              {location.pathname.includes("match_details") ? (
                matchDetails?.matchOdd?.isActive && (
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
                          data={matchDetails?.apiSession}
                        />
                      </Col>
                    )}
                    {matchDetails?.manualSessionActive && (
                      <Col md={6}>
                        <BetTable
                          title={"Fancy Market"}
                          type={MatchType.SESSION_MARKET}
                          data={matchDetails?.sessionBettings}
                        />
                      </Col>
                    )}
                  </Row>
                </>
              )}
            </Col>
            <Col md={4}>
              <LiveMatch />
              <div className="my-2">
                <ScoreCard />
              </div>
              <UserBets />
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
