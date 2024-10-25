import { useState } from "react";
import { Card, Nav, Tab, Table } from "react-bootstrap";
// import CustomModal from "../../commonComponent/modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CustomModal from "../../commonComponent/modal";
import UserBetModalForm from "../../game/userBet/modal/form";
import UserBetModalTable from "../../game/userBet/modal";
import moment from "moment-timezone";
import DeleteBetOverlay from "../../commonComponent/deleteBetRow";
// import UserBetModalForm from "../../game/userBet/modal/form";
// import UserBetModalTable from "../../game/userBet/modal";
// import "../../otherGames/style.scss";
const OtherUserBets = ({ matchId }: any) => {
  const [showModal, setShowModal] = useState(false);
  const { placedBets,morePlacedBets } = useSelector(
    (state: RootState) => state.match.placeBets
  );
  return (
    <>
      <div>
        <Card
          className="m-b-10 scorecard responsive-card"
          style={{ marginBottom: "0px" }}
        >
          <Card className="m-b-10 my-bet">
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#matched-bet">
                <Nav.Item>
                  <Nav.Link
                    eventKey="#matched-bet"
                    className="nav-link-a active"
                  >
                    Matched {`(${placedBets.length})`}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <a
                href="javascript:void(0)"
                className="nav-link-a btn btn-back float-right"
                onClick={() => setShowModal(true)}
              >
                View More
              </a>
            </Card.Header>
            <Card.Body>
              <Tab.Content>
                <Tab.Pane eventKey="#matched-bet" className="active show">
                  <div className="table-responsive">
                    <Table
                      id="matched"
                      className="table coupon-table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>UserName</th>
                          <th style={{ minWidth: "140px" }}>Nation</th>
                          <th style={{ minWidth: "50px" }}>Rate</th>
                          <th>Amount</th>
                          <th>PlaceDate</th>
                          <th>MatchDate</th>
                          <th style={{ minWidth: "70px" }}>Gametype</th>
                        </tr>
                      </thead>
                      <tbody>
                        {placedBets?.length > 0 ? (
                          placedBets?.map((bet: any) => {
                            return (
                              <tr key={bet?.id} className="position-relative">
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
                                  className={
                                    bet?.betType === "NO" ||
                                    bet?.betType === "LAY"
                                      ? "bg-red1"
                                      : "bg-blue3"
                                  }
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
                                <td
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
                                </td>
                                <td
                                  className={
                                    bet?.betType === "NO" ||
                                    bet?.betType === "LAY"
                                      ? "bg-red1"
                                      : "bg-blue3"
                                  }
                                >
                                  {bet?.eventType}
                                </td>
                                <DeleteBetOverlay title={bet?.deleteReason} />
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={7} className="text-center">
                              No records found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Card>
        <CustomModal
          customClass="modalFull-90"
          show={showModal}
          setShow={setShowModal}
          title="View More Bet"
        >
          <UserBetModalForm customClass="mb-5" matchId={matchId} />
          <UserBetModalTable list={morePlacedBets}/>
        </CustomModal>
      </div>
    </>
  );
};

export default OtherUserBets;
