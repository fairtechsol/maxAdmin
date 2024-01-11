import { useEffect } from "react";
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
  matchDetailAction,
  updateMatchRates,
} from "../../store/actions/match/matchAction";
import { useLocation, useParams } from "react-router-dom";
import { socketService } from "../../socketManager";

export default function Games() {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  const { id } = useParams();

  const { matchDetails } = useSelector(
    (state: RootState) => state.match.matchListSlice
  );

  const updateMatchDetailToRedux = (event: any) => {
    if (id === event?.id) {
      dispatch(updateMatchRates(event));
    } else return;
  };
  useEffect(() => {
    if (id) {
      dispatch(matchDetailAction(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      socketService.match.joinMatchRoom(id, "superAdmin");
      socketService.match.getMatchRates(id, updateMatchDetailToRedux);
    }
    return () => {
      socketService.match.leaveMatchRoom(id);
    };
  }, [location?.pathname]);

  return (
    <div className="gamePage">
      <Container fluid>
        <GameHeader />
        {/* table start here */}
        <div className="gamePage-table">
          <Row className="no-gutters">
            <Col md={8}>
              {location.pathname.includes("match_details") ? (
                matchDetails?.matchOdd && (
                  <Col md={12}>
                    <BetTable
                      title={"Runners"}
                      type={MatchType.MATCH_ODDS}
                      data={matchDetails?.matchOdd}
                    />
                  </Col>
                )
              ) : (
                <>
                  {matchDetails?.matchOdd && (
                    <Col md={12}>
                      <BetTable
                        title={"Runners"}
                        type={MatchType.MATCH_ODDS}
                        data={matchDetails?.matchOdd}
                      />
                    </Col>
                  )}
                  {matchDetails?.bookmaker && (
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
              <UserBets id={id} />
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
}
