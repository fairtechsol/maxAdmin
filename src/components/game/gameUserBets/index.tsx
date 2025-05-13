import moment from "moment-timezone";
import { memo, useState } from "react";
import { Button, Col, Nav, Row, Tab, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import DeleteBetOverlay from "../../commonComponent/deleteBetRow";
import CustomModal from "../../commonComponent/modal";
import UserBetModalForm2 from "../userBet/modal/form2";
import "./style.scss";

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
          <div className="your-container">
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div className="w-100 d-flex flex-column">
                    <div className="w-100 d-flex flex-row f600 title-14">
                      <div
                        className="text-start text-black"
                        style={{ width: "25%" }}
                      >
                        UserName
                      </div>
                      <div
                        className="text-start text-black"
                        style={{ width: "45%" }}
                      >
                        Nation
                      </div>
                      <div
                        className="text-start text-black"
                        style={{ width: "10%" }}
                      >
                        Rate
                      </div>
                      <div
                        className="text-end text-black"
                        style={{ width: "20%" }}
                      >
                        Amount
                      </div>
                    </div>
                    {placedBets?.length > 0 &&
                      placedBets?.map((bet: any) => {
                        return (
                          <div
                            key={bet?.id}
                            className={` position-relative w-100 d-flex flex-column title-16 mb-1 ${
                              bet?.betType === "NO" || bet?.betType === "LAY"
                                ? "bg-pink"
                                : "bg-blu"
                            }`}
                          >
                            <div className="w-100 d-flex flex-row justify-content-between">
                              <div className="w-50 d-flex text-black f700 title-16">
                                {bet?.bettingName || bet?.marketType}
                              </div>
                              <div className="w-50 d-flex text-black text-end">
                                <span className="w-100">
                                  {moment(bet?.createdAt).format("DD-MM-YYYY")}
                                  {"\u00A0"}
                                  {moment(bet?.createdAt).format("hh:mm:ss")}
                                </span>
                              </div>
                            </div>
                            <div className="w-100 d-flex flex-row">
                              <div
                                className="text-start text-black"
                                style={{ width: "25%", wordWrap: "break-word" }}
                              >
                                {bet?.user?.userName}
                              </div>
                              <div
                                className="text-start text-black"
                                style={{ width: "45%" }}
                              >
                                {["horseRacing", "greyHound"].includes(
                                  bet?.eventType
                                )
                                  ? bet?.teamName?.split(".")?.[1]?.trim()
                                    ? bet?.teamName?.split(".")?.[1]?.trim()
                                    : bet?.teamName
                                  : bet?.teamName ?? bet?.bettingName}
                              </div>
                              <div
                                className="text-start text-black"
                                style={{ width: "10%" }}
                              >
                                {bet?.odds}
                              </div>
                              <div
                                className="text-end text-black"
                                style={{ width: "20%" }}
                              >
                                {bet?.amount}
                              </div>
                            </div>
                            <DeleteBetOverlay title={bet?.deleteReason} />
                          </div>
                        );
                      })}
                    <div></div>
                  </div>
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
      </CustomModal>
    </div>
  );
};

export default memo(GameUserBets);
