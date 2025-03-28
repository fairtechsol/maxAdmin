import { Col, Container, Row } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";

const TeenTestResult: any = ({ data }: any) => {
  return (
    data?.mid != "0" && (
      <Container>
        <Row>
          <Col>
            <span style={{ color: "white", fontWeight: "bolder" }}>TIGER</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <HandleCards card={data?.C1} />
              <HandleCards card={data?.C2} />
              <HandleCards card={data?.C3} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <span style={{ color: "white", fontWeight: "bolder" }}>LION</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <HandleCards card={data?.C4} />
              <HandleCards card={data?.C5} />
              <HandleCards card={data?.C6} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <span style={{ color: "white", fontWeight: "bolder" }}>DRAGON</span>
            <div style={{ display: "flex", gap: "10px" }}>
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

export default TeenTestResult;
