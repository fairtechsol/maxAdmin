import { useState } from "react";
import { Button, Col, Nav, Row, Tab, Table } from "react-bootstrap";
import CustomModal from "../../commonComponent/modal";
// import UserBetModalTable from "./modal";
import UserBetModalForm from "./modal/form";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import DeleteBetOverlay from "../../commonComponent/deleteBetRow";
import moment from "moment-timezone";

const UserBets = ({ matchId }: any) => {
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
                  Matched{`(${placedBets.length})`}
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
          <div className="bet-head">
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Table className="" striped>
                    <thead>
                      <tr className="lh-1">
                        <th >UserName</th>
                        <th >Nation</th>
                        <th className="text-right">
                          Rate
                        </th>
                        <th
                          className="text-right text-end"
                          // style={{ minWidth: "90px" }}
                        >
                          Amount
                        </th>
                        <th>PlaceDate</th>
                        {/* <th>MatchDate</th> */}
                        <th>Gametype</th>
                      </tr>
                    </thead>
                    <tbody className="bg-primary">
                      {placedBets?.map((bet: any) => {
                        return (
                          <>
                            <tr
                              key={bet?.id}
                              className="position-relative title-14 lh-sm"
                            >
                              <td
                                className={
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-red1"
                                    : "bg-blue3"
                                }
                              >
                                

                                
                                  {bet?.user?.userName}
                               
                              </td>
                              <td
                                className={
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
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
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-red1"
                                    : "bg-blue3"
                                }
                              >
                                
                                {bet?.odds}
                              </td>
                              <td
                                className={`${
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-red1"
                                    : "bg-blue3"
                                } `}
                              >
                               

                               
                                  {bet?.amount}
                                
                              </td>
                              <td
                                className={
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-red1"
                                    : "bg-blue3"
                                }
                              >
                                {moment(bet?.createdAt).format(
                                  "YYYY-MM-DD hh:mm:ss"
                                )}
                              </td>
                              <td  className={
                                  bet?.betType === "NO" ||
                                  bet?.betType === "LAY"
                                    ? "bg-red1"
                                    : "bg-blue3"
                                }>
                                {bet?.eventType}
                              </td>

                              <DeleteBetOverlay title={bet?.deleteReason} />
                            </tr>
                            <tr>
                              <td
                                colSpan={4}
                                style={{ height: "3px", padding: "0px" }}
                              ></td>
                            </tr>
                          </>
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
        <UserBetModalForm
          customClass="mb-5"
          matchId={matchId}
          morePlacedBets={morePlacedBets}
        />
        {/* <UserBetModalTable /> */}
      </CustomModal>
    </div>
  );
};

export default UserBets;
