import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.scss";

const ErrorPage = () => {
  return (
    <div className="my-5 pt-5">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="text-center mb-5">
              <h1
                className="font-weight-medium"
                style={{
                  fontSize: "5.5rem",
                  lineHeight: 1.2,
                }}
              >
                4
                <i
                  className="bx bx-buoy bx-spin display-3"
                  style={{
                    color: "#556ee6",
                  }}
                />
                3
              </h1>
              <h4
                className="text-uppercase"
                style={{
                  fontSize: "1.21875rem",
                  lineHeight: 1.2,
                }}
              >
                You don't have permission to access this page
              </h4>
              <div className="mt-5 text-center">
                <NavLink to="/admin/home" className="btn btn-primary">
                  Back to Dashboard
                </NavLink>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ErrorPage;
