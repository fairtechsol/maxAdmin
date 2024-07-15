import { useState } from "react";
import { Button, Col, Nav, Row, Tab, Table } from "react-bootstrap";
import CustomModal from "../../commonComponent/modal";
import UserBetModalTable from "./modal";
import UserBetModalForm from "./modal/form";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import moment from "moment-timezone";

const UserBets = ({ matchId }: any) => {
  const { placedBets } = useSelector(
    (state: RootState) => state.match.placeBets
  );
  const [showModal, setShowModal] = useState(false);

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
                      Matched{`(${placedBets.length})`}
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
                <Button variant="secondary" onClick={() => setShowModal(true)}>
                  View More
                </Button>
              </div>
            </div>
          </Col>
          <div className="bet-head">
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Table className="coupon-table" striped bordered>
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
                      {placedBets?.map((bet: any) => {
                        return (
                          <tr key={bet?.id}>
                            <td
                              className={
                                bet?.betType === "NO" || bet?.betType === "LAY"
                                  ? "bg-red1"
                                  : "bg-blue3"
                              }
                            >
                              {bet?.user?.userName}
                            </td>
                            <td
                              className={
                                bet?.betType === "NO" || bet?.betType === "LAY"
                                  ? "bg-red1"
                                  : "bg-blue3"
                              }
                            >
                              {bet?.marketBetType === "SESSION"
                                ? bet?.eventName
                                : bet?.teamName}
                            </td>
                            <td
                              className={
                                bet?.betType === "NO" || bet?.betType === "LAY"
                                  ? "bg-red1"
                                  : "bg-blue3"
                              }
                            >
                              {bet?.odds}
                            </td>
                            <td
                              className={
                                bet?.betType === "NO" || bet?.betType === "LAY"
                                  ? "bg-red1"
                                  : "bg-blue3"
                              }
                            >
                              {bet?.amount}
                            </td>
                            <td
                              className={
                                bet?.betType === "NO" || bet?.betType === "LAY"
                                  ? "bg-red1"
                                  : "bg-blue3"
                              }
                            >
                              {moment(bet?.createdAt).format(
                                "YYYY-MM-DD hh:mm:ss"
                              )}
                            </td>
                            <td
                              className={
                                bet?.betType === "NO" || bet?.betType === "LAY"
                                  ? "bg-red1"
                                  : "bg-blue3"
                              }
                            >
                              {moment(bet?.match?.startAt).format(
                                "YYYY-MM-DD hh:mm:ss"
                              )}
                            </td>
                            <td
                              className={
                                bet?.betType === "NO" || bet?.betType === "LAY"
                                  ? "bg-red1"
                                  : "bg-blue3"
                              }
                            >
                              {bet?.eventType}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>UserName</th>
                        <th>Nation</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>MatchDate</th>
                        <th>Gametype</th>
                      </tr>
                    </thead>
                    <tbody className="bg-primary">
                      {/* {UsreBetsData?.map((item) => ( */}
                      {/* <tr>
                      <td>UAccount</td>
                      <td>India</td>
                      <td>35</td>
                      <td>100</td>
                      <td>2023-11-14 15:15:08</td>
                      <td>Match1</td>
                    </tr> */}
                      {/* ))} */}
                    </tbody>
                  </Table>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </div>
        </Row>
      </Tab.Container>
      <CustomModal
        customClass="userBetModal"
        show={showModal}
        setShow={setShowModal}
        title="View More Bet"
      >
        <UserBetModalForm customClass="mb-5" matchId={matchId} />
        <UserBetModalTable />
      </CustomModal>
    </div>
  );
};

export default UserBets;
