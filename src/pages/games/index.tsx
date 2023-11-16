import { Col, Container, Row } from "react-bootstrap";
import CustomBreadcrumb from "../../components/commonComponent/breadcrumb";
import BookMakerTable from "../../components/game/bookMaker";
import FancyMarketTable from "../../components/game/fancyMarket";
import GameHeader from "../../components/game/gameHeader";
import LiveMatch from "../../components/game/liveMatch";
import MatchOddsTable from "../../components/game/matchOdds";
import ScoreCard from "../../components/game/scoreCard";
import SessionMarketTable from "../../components/game/sessionMarket";
import UserBets from "../../components/game/userBet";
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
              <CustomBreadcrumb
                items={[
                  { name: "ICC Cricket World Cup" },
                  { name: "ICC Cricket World Cup" },
                  { name: "TOURNAMENT_WINNER  " },
                  { name: "10/5/2023 2:00:00 PM" },
                ]}
              />
              <MatchOddsTable />
              <BookMakerTable />
              <Row className="no-gutters">
                <Col md={6}>
                  <FancyMarketTable />
                </Col>
                <Col md={6}>
                  <SessionMarketTable />
                </Col>
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
