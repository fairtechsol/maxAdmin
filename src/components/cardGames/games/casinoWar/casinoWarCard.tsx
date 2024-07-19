import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";

const CasinoWarCard: any = ({ data }: any) => {
  return (
    data?.mid != "0" && (
      <Container>
        <Row>
          <Col>
            <span style={{ color: "white", fontWeight: "bolder" }}>DEALER</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <HandleCards card={data?.C7} />
            </div>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    )
  );
};

export default CasinoWarCard;
