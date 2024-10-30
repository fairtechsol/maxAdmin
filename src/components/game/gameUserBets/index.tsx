import React, { useState } from "react";
import { Button, Col, Nav, Row, Tab, Table } from "react-bootstrap";
import CustomModal from "../../commonComponent/modal";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import DeleteBetOverlay from "../../commonComponent/deleteBetRow";
import moment from "moment-timezone";
// import UserBetModalForm from "../userBet/modal/form";
import UserBetModalForm2 from "../userBet/modal/form2";

const GameUserBets = ({ matchId }: any) => {
  const { placedBets, morePlacedBets } = useSelector(
    (state: RootState) => state.match.placeBets
  );
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("first");

  const handleSelect = (selectedKey: any) => {
    setActiveTab(selectedKey);
  };
  return (
    <div className={`userBets`}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={12}>
            <div
              className={`userBets-header bg-secondaryLight d-flex justify-content-between py-2 px-3`}
            >
              <div className="userBets-headerRight w-100 d-flex justify-content-between align-items-center ">
                <div className="text-white text-start f600 title-14 p-0">
                  MY BETS
                </div>
                <div className="d-flex flex-end">
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(true)}
                    style={{ height: "100%", color: "white" }}
                  >
                    View More
                  </Button>
                </div>
              </div>
            </div>
          </Col>
          <div className="userBets-headerLeft mt-1">
            <Nav
              activeKey={activeTab}
              onSelect={handleSelect}
              // variant="pills"
              className="flex-row userBets-headerLeft-tabs"
            >
              <Nav.Item>
                <Nav.Link
                  className={`rounded-0 title-12 lh-1 ${
                    activeTab === "first" ? "tab-new" : ""
                  }`}
                  eventKey="first"
                >
                  Matched{`(${placedBets?.length})`}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className={`rounded-0 title-12 lh-1 ${
                    activeTab === "second" ? "tab-new" : ""
                  }`}
                  eventKey="second"
                >
                  Unmatched
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div>
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Table striped>
                    <thead>
                      <tr className="lh-1">
                        <th style={{ minWidth: "1vw" }}>UserName</th>
                        <th style={{ minWidth: "1vw" }}>Nation</th>
                        <th className="text-right" style={{ minWidth: ".5vw" }}>
                          Rate
                        </th>
                        <th
                          className="text-right text-end"
                          style={{ minWidth: "1vw" }}
                        >
                          Amount
                        </th>
                        {/* <th>PlaceDate</th>
                        <th>MatchDate</th>
                        <th>Gametype</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {placedBets?.map((bet: any) => {
                        return (
                          <React.Fragment key={bet?.id}>
                            <tr className="position-relative bet-table-right back-border">
                              <td
                                className={
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-red1"
                                    : "bg-blue3"
                                }
                              >
                                <div className="row">
                                  <div className="col f500">
                                    {" "}
                                    {bet?.bettingName}{" "}
                                  </div>
                                </div>

                                <div className="col">
                                  {" "}
                                  {bet?.user?.userName}
                                </div>
                              </td>
                              <td
                                className={
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-red1"
                                    : "bg-blue3"
                                }
                              >
                                <br></br>
                                {bet?.marketBetType === "SESSION"
                                  ? bet?.eventName
                                  : bet?.teamName}
                              </td>
                              <td
                                className={
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-red1"
                                    : "bg-blue3"
                                }
                              >
                                {" "}
                                  {moment(bet?.createdAt).format("DD-MM-YYYY")}
                        
                                <br></br>
                                {bet?.odds}{" "}
                              </td>
                              <td
                                className={`${
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-red1"
                                    : "bg-blue3"
                                }`}
                              >
                                <div className="bet-amount text-end">
                                  <span className="bet-time text-end">
                                    {moment(bet?.createdAt).format("hh:mm:ss")}
                                  </span>
                                  <div className="col  text-end">
                                    {bet?.amount}
                                  </div>
                                </div>
                              </td>
                              {/* <td
                                className={
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-red1"
                                    : "bg-blue3"
                                }
                              >
                                {moment(bet?.match?.startAt).format(
                                  "YYYY-MM-DD hh:mm:ss"
                                )}
                              </td> */}

                              <DeleteBetOverlay title={bet?.deleteReason} />
                            </tr>
                            <tr>
                              <td
                                colSpan={4}
                                style={{ height: "3px", padding: "0px" }}
                              ></td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </Table>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Table className="coupon-table" striped>
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
        <UserBetModalForm2
          customClass="mb-5"
          matchId={matchId}
          morePlacedBets={morePlacedBets}
        />
        {/* <UserBetModalTable /> */}
      </CustomModal>
    </div>
  );
};

export default GameUserBets;
