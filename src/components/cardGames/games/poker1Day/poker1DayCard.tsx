import { Col, Container, Row } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";

const Poker1DayResult: any = ({ data }: any) => {
  return (
    data?.mid != "0" && (
      <Container>
        <Row>
          <Col>
            <span
              style={{
                color: "white",
                fontWeight: "bolder",
              }}
            >
              BOARD
            </span>
            <div style={{ display: "flex", gap: "10px" }}>
              <HandleCards card={data?.C5} />
              <HandleCards card={data?.C6} />
              <HandleCards card={data?.C7} />
              <HandleCards card={data?.C8} />
              <HandleCards card={data?.C9} />
            </div>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Poker1DayResult;
