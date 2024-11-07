import { Fragment, useState } from "react";
import { Col, Row, Tab, Table, Button } from "react-bootstrap";
// import CustomModal from "../../commonComponent/modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CustomModal from "../../commonComponent/modal";
// import UserBetModalForm from "../../game/userBet/modal/form";
// import UserBetModalTable from "../../game/userBet/modal";
import moment from "moment-timezone";
import DeleteBetOverlay from "../../commonComponent/deleteBetRow";
import { Nav } from "react-bootstrap";
import UserBetModalForm2 from "../../game/userBet/modal/form2";
// import UserBetModalForm from "../../game/userBet/modal/form";
// import UserBetModalTable from "../../game/userBet/modal";
// import "../../otherGames/style.scss";
const OtherUserBets = ({ matchId }: any) => {
  const [showModal, setShowModal] = useState(false);
  const { placedBets, morePlacedBets } = useSelector(
    (state: RootState) => state.match.placeBets
  );
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
          <div className="your-container">
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Table >
                    <thead>
                      <tr className="lh-1">
                        <th style={{ minWidth: "1vw" }}>UserName</th>
                        <th style={{ minWidth: "3vw" }}>Nation</th>
                        <th className="text-end" style={{ minWidth: "0.7vw" }}>
                          Rate
                        </th>
                        <th className="text-end" style={{ minWidth: "1vw" }}>
                          Amount
                        </th>
                        {/* <th>PlaceDate</th>
                        <th>MatchDate</th>
                        <th>Gametype</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {placedBets?.map((bet: any, index: number) => {
                        return (
                          <Fragment key={index}>
                            <tr
                              className={`position-relative lh-1 bet-table-right border-none ${
                                bet?.betType === "NO" || bet?.betType === "LAY"
                                  ? "bor-red1"
                                  : "bor-blue3"
                              }`
                             }
                            >
                              {" "}
                              <td
                                colSpan={4}
                                className={
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-pink"
                                    : "bg-blu"
                                }
                              >
                                <div className="position-relative lh-1 bet-table-right d-flex  justify-content-between w-100">
                                  <span className="f700">{bet?.marketType} </span>
                                  <span className="text-end pe-2">
                                    {moment(bet?.createdAt).format(
                                      "DD-MM-YYYY hh:mm:ss"
                                    )}{" "}
                                  </span>
                                </div>
                              </td>
                              {bet?.deleteReason && (
                                <div className="betDeleteOverlay"></div>
                              )}
                            </tr>
                            <tr className="position-relative lh-1 bet-table-right">
                              <td
                                className={
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-pink"
                                    : "bg-blu"
                                }
                              >
                                <div className="col">
                                  {" "}
                                  {bet?.user?.userName}
                                </div>
                              </td>
                              <td
                                className={
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-pink"
                                    : "bg-blu"
                                }
                              >
                                {/* <br></br> */}
                                {bet?.marketBetType === "SESSION"
                                  ? bet?.eventName
                                  : bet?.teamName}
                              </td>
                              <td
                                className={
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-pink text-end"
                                    : "bg-blu text-end"
                                }
                              >
                                {/* <br></br> */}
                                {bet?.odds}
                              </td>
                              <td
                                className={`${
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-pink"
                                    : "bg-blu"
                                }`}
                              >
                                <div className="bet-amount text-end">
                                  <div className="col  text-end">
                                    {bet?.amount}
                                  </div>
                                </div>
                              </td>

                              <DeleteBetOverlay title={bet?.deleteReason} />
                            </tr>
                            <div style={{ height: "4px" }}></div>
                          </Fragment>
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
        customClass="modalFull-90"
        show={showModal}
        setShow={setShowModal}
        title="View More Bet"
      >
        <UserBetModalForm2
          customClass="mb-5"
          matchId={matchId}
          morePlacedBets={morePlacedBets}
        />
        {/* <UserBetModalTable list={morePlacedBets} /> */}
      </CustomModal>
    </div>
  );
};

export default OtherUserBets;
