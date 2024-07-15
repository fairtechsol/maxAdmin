import { Container, Row, Col } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";

const Crick5Result: any = ({ data }: any) => {
  const elements = data?.desc?.split(",");

  let result: string[][] = [[], [], [], []];
  if (elements) {
    elements?.forEach((item: any, index: any) => {
      const targetArray = index % 4;
      result[targetArray].push(item);
    });
  }

  return (
    data?.mid != "0" && (
      <Container>
        <Row>
          <Col>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <HandleCards card={data?.C1} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <HandleCards card={data?.C2} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <HandleCards card={data?.C3} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <HandleCards card={data?.C4} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <HandleCards card={data?.C5} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <HandleCards card={data?.C6} />
            </div>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Crick5Result;
