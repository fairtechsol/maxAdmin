import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";

const Poker1DayResult: any = ({ data }: any) => {
  return (
    data?.mid != "0" && (
      <Container>
        {/* <Row>
          <Col>
            <span
              style={{
                color: "white",
                fontWeight: "bolder",
              }}
            >
              PLAYER A
            </span>
            <div style={{ display: "flex", gap: "10px" }}>
              <HandleCards card={data?.C1} />
              <HandleCards card={data?.C2} />
            </div>
          </Col>
          <Col>
            <span
              style={{
                color: "white",
                fontWeight: "bolder",
              }}
            >
              PLAYER B
            </span>
            <div style={{ display: "flex", gap: "10px" }}>
              <HandleCards card={data?.C3} />
              <HandleCards card={data?.C4} />
            </div>
          </Col>
        </Row> */}
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
