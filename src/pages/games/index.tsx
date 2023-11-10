import { Col, Container, Row } from "react-bootstrap";
import CustomBreadcrumb from "../../components/commonComponent/breadcrumb";
import BookMakerTable from "../../components/game/bookMaker";
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
              <GameTable />
              <BookMakerTable />
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
