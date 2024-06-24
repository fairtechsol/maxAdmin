import { Container, Row, Col } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";

const Lucky7Result: any = ({ data }: any) => {
  return (
    data?.mid !== "0" && (
      <Container>
        <Row>
          <Col className="mt-2">
            <div>
              <HandleCards card={data?.C1} />
            </div>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Lucky7Result;
