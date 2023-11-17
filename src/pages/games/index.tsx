import { Col, Container, Row } from "react-bootstrap";
import BetTable from "../../components/game/betTable";
import GameHeader from "../../components/game/gameHeader";
import LiveMatch from "../../components/game/liveMatch";
import ScoreCard from "../../components/game/scoreCard";
import UserBets from "../../components/game/userBet";
import { MatchType } from "../../utils/enum";
import { GameData, MatchOdds, SessionMarketData } from "./index.json";
// import GameTable from "../../components/game/table";

export default function Games() {
  return (
    <div className="gamePage">
      <Container fluid>
        <GameHeader />
        {/* table start here */}
        <div className="gamePage-table">
          <Row className="no-gutters">
            <Col md={8}>
              {MatchOdds().map((item: any, index: number) => {
                return (
                  <Col md={12} key={index}>
                    <BetTable
                      title={item?.title}
                      type={MatchType.MATCH_ODDS}
                      data={item?.runners}
                    />
                  </Col>
                );
              })}
              <Row className="no-gutters">
                {GameData()?.map((item: any, index: number) => (
                  <Col md={6} key={index}>
                    <BetTable
                      title={item?.title}
                      type={MatchType.BOOKMAKER}
                      data={item?.data}
                    />
                  </Col>
                ))}
              </Row>
              <Row className="no-gutters">
                {SessionMarketData()?.map((item: any, index: number) => (
                  <Col md={6} key={index}>
                    <BetTable
                      title={item?.title}
                      type={MatchType.SESSION_MARKET}
                      data={item?.data}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col md={4}>
              <LiveMatch />
              <div className="my-2">
                <ScoreCard />
              </div>
              <UserBets />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
