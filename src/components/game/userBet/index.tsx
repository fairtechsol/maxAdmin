import moment from "moment-timezone";
import { Fragment, memo, useState } from "react";
import { Button, Col, Row, Tab, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CustomModal from "../../commonComponent/modal";
import UserBetModalForm from "./modal/form";
import "./style.scss";

interface UserBetsProps {
  matchId?: string;
}

const UserBets = ({ matchId }: UserBetsProps) => {
  const { placedBets } = useSelector(
    (state: RootState) => state.match.placeBets
  );

  const [showModal, setShowModal] = useState(false);
  return (
    <div className="userBets">
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

          <Col sm={12}>
            <div className="casino-container table-responsive">
              <Table table-responsive>
                <thead>
                  <tr className="lh-1">
                    <th>UserName</th>
                    <th>Nation</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th className="text-end">PlaceDate</th>
                    <th className="text-end">Gametype</th>
                  </tr>
                </thead>
                <tbody className="bg-primary ">
                  {placedBets?.map((bet: any, index: number) => {
                    return (
                      <Fragment key={index}>
                        <tr
                          className={`position-relative lh-1 bet-table-right border-none ${
                            bet?.betType === "NO" || bet?.betType === "LAY"
                              ? "bor-red1"
                              : "bor-blue3"
                          }`}
                        >
                          <td
                            className={
                              bet?.betType === "NO" || bet?.betType === "LAY"
                                ? "bg-pink"
                                : "bg-blu"
                            }
                          >
                            {bet?.user?.userName}
                          </td>
                          <td
                            className={
                              bet?.betType === "NO" || bet?.betType === "LAY"
                                ? "bg-pink"
                                : "bg-blu"
                            }
                          >
                            {bet?.teamName}
                          </td>
                          <td
                            className={
                              bet?.betType === "NO" || bet?.betType === "LAY"
                                ? "bg-pink text-center"
                                : "bg-blu text-center"
                            }
                          >
                            {bet?.odds}
                          </td>
                          <td
                            className={
                              bet?.betType === "NO" || bet?.betType === "LAY"
                                ? "bg-pink text-center"
                                : "bg-blu text-center"
                            }
                          >
                            {bet?.amount}
                          </td>
                          <td
                            className={
                              bet?.betType === "NO" || bet?.betType === "LAY"
                                ? "bg-pink text-end"
                                : "bg-blu text-end"
                            }
                          >
                            {moment(bet?.createdAt).format(
                              "DD-MM-YYYY hh:mm:ss"
                            )}
                          </td>
                          <td
                            className={
                              bet?.betType === "NO" || bet?.betType === "LAY"
                                ? "bg-pink text-end"
                                : "bg-blu text-end"
                            }
                          >
                            {bet?.eventType}
                          </td>
                        </tr>
                        <div className="bg-white" style={{ height: "4px" }} />
                      </Fragment>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
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
          morePlacedBets={placedBets}
        />
      </CustomModal>
    </div>
  );
};

export default memo(UserBets);
