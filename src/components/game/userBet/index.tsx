import { Button, Col, Nav, Row, Tab, Table } from "react-bootstrap";
import "./style.scss";
const UserBets = () => {
  return (
    <div className={`userBets`}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={12}>
            <div
              className={`userBets-header bg-secondaryLight d-flex justify-content-between py-2 px-3`}
            >
              <div className="userBets-headerLeft">
                <Nav
                  variant="pills"
                  className="flex-row userBets-headerLeft-tabs"
                >
                  <Nav.Item>
                    <Nav.Link className="rounded-0" eventKey="first">
                      Matched{`(0)`}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="rounded-0" eventKey="second">
                      unmatched
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className="userBets-headerRight">
                <Button variant="secondary">View More</Button>
              </div>
            </div>
          </Col>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>UserName</th>
                      <th>Nation</th>
                      <th>Rate</th>
                      <th>Amount</th>
                      <th>PlaceDate</th>
                      <th>MatchDate</th>
                      <th>Gametype</th>
                    </tr>
                  </thead>
                  <tbody className="bg-primary">
                    {/* {UsreBetsData?.map((item) => ( */}

                    <tr>
                      <td>UAccount</td>
                      <td>India</td>
                      <td>35</td>
                      <td>100</td>
                      <td>2023-11-14 15:15:08</td>
                      <td>2023-11-14 15:15:08</td>
                      <td>Match1</td>
                    </tr>
                    {/* ))} */}
                  </tbody>
                </Table>
              </Tab.Pane>
              <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default UserBets;
