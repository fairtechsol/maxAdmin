import { Col, Container, Row } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";

const Dragon20Result: any = ({ data }: any) => {
  return (
    data?.mid != "0" && (
      <Container>
        <Row>
          <Col className="mt-2">
            <div style={{ display: "flex", gap: "10px" }}>
              <HandleCards card={data?.C1} />
              <HandleCards card={data?.C2} />
              <HandleCards card={data?.C3} />
            </div>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Dragon20Result;
