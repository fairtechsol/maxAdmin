import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";

const Poker6Result: any = ({ data }: any) => {
  return (
    data?.mid != "0" && (
      <Container>
        <Row>
          <Col className="mt-2">
            <div style={{ display: "flex", gap: "10px" }}>
              <HandleCards card={data?.C13} />
              <HandleCards card={data?.C14} />
              <HandleCards card={data?.C15} />
              <HandleCards card={data?.C16} />
              <HandleCards card={data?.C17} />
            </div>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Poker6Result;
