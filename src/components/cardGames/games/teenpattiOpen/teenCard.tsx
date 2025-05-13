import { Col, Container, Row } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";

const TeenOpenResult: any = ({ data }: any) => {
  return (
    data?.mid != "0" && (
      <Container>
        <Row>
          <Col>
            <span style={{ color: "white", fontWeight: "bolder" }}>DEALER</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <HandleCards card={data?.[8] !== "1" ? data?.[8] : ""} />
              <HandleCards card={data?.[17] !== "1" ? data?.[17] : ""} />
              <HandleCards card={data?.[26] !== "1" ? data?.[26] : ""} />
            </div>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default TeenOpenResult;
