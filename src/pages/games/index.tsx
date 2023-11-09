import { Col, Container, Row } from "react-bootstrap";
import GameHeader from "../../components/game/gameHeader";
import LiveMatch from "../../components/game/liveMatch";
import GameTable from "../../components/game/table";

export default function Games() {
  return (
    <div className="gamePage">
      <Container fluid>
        <GameHeader />
        {/* table start here */}
        <div className="gamePage-table mt-5">
          <Row>
            <Col md={8}>
              <GameTable />
            </Col>
            <Col md={4}>
              <LiveMatch />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
