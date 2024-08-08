import { Container, Row, Col } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";

const AmarAkbarAnthonyCard: any = ({ data }: any) => {
  return (
    data?.mid != "0" && (
      <Container>
        <Row>
          <Col className="mt-2" style={{ backgroundColor: "rgb(0 0 0 / 8%)" }}>
            <div>
              <HandleCards card={data?.C1} />
            </div>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default AmarAkbarAnthonyCard;
