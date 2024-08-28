import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
  rulesData,
} from "../../../../utils/Constants";
import { RootState } from "../../../../store/store";
import UserBets from "../../../game/userBet";
import RulesModal from "../../../commonComponent/rulesModal";
import { superOverRules } from "../../../../assets";
import CardResultBox from "../../../commonComponent/cardResultBox";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import Dragon20Result from "./dragonCard";
import ScoreBoard from "../../../commonComponent/scoreBoard";
import Bookmaker from "./bookmaker";

const SuperOverComponent = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail, scoreBoardData } = useSelector(
    (state: RootState) => state.card
  );

  return (
    <div>
      <Row>
        <Col md={8}>
          <div style={{ width: "100%", height: "400px" }}>
            <div className="horseRacingTabHeader">
              <div>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  {dragonTigerDetail?.name}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => setShow(true)}
                >
                  {" "}
                  RULES
                </span>
              </div>
              <span>
                {dragonTigerDetail?.videoInfo
                  ? `Round ID:  ${dragonTigerDetail?.videoInfo?.mid}`
                  : ""}
              </span>
            </div>
            <div>
              {scoreBoardData?.data && (
                <ScoreBoard data={scoreBoardData?.data} />
              )}
            </div>
            <div
              style={{ width: "100%", height: "92%", backgroundColor: "#000" }}
            >
              <VideoFrame
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Dragon20Result data={dragonTigerDetail?.videoInfo} />}
                id={`${cardUrl}${cardGamesId.superover}`}
              />
            </div>
          </div>
          <div>
            <div
              className="d-sm-flex flex-row justify-content-around align-items-center"
              style={{ width: "100%", marginTop: "7rem", gap: "10px" }}
            >
              <div className="w-100">
                <Bookmaker
                  title={"Bookmaker"}
                  min={dragonTigerDetail?.videoInfo?.min}
                  max={dragonTigerDetail?.videoInfo?.max}
                  matchOddsData={dragonTigerDetail?.bookmaker}
                  data={dragonTigerDetail}
                />
              </div>
            </div>

            <div style={{ width: "100%", marginTop: "5px" }}>
              <CardResultBox
                data={dragonTigerDetail}
                name={["E", "R"]}
                type={cardGamesType.superover}
              />
            </div>
          </div>

          <RulesModal show={show} setShow={setShow} rule={superOverRules} />
        </Col>
        <Col md={4}>
          <Container className="p-0" fluid>
            <Row>
              <Col md={12}>
                <UserBets matchId={dragonTigerDetail?.id} />
              </Col>
              <Col>
                <div className="sidebar-box place-bet-container super-over-rule">
                  <div className="marketHeader">
                    ENGLAND vs RSA Inning's Card Rules
                  </div>
                  <div className="table-responsive">
                    <Table className="table-over">
                      <thead>
                        <tr>
                          <th>Cards</th>
                          <th className="text-center">Count</th>
                          <th className="text-end">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rulesData?.map((rule: any, index: number) => (
                          <tr key={index}>
                            <td>
                              <img
                                src={rule.cardImage}
                                alt="Card"
                                className="ms-2"
                              />
                              <span className="ms-2">X</span>
                            </td>
                            <td className="text-center">{rule.count}</td>
                            <td className="text-end">
                              {rule.valueText ? (
                                <span>
                                  {rule.valueText}
                                  <img src={rule.valueImage} alt="Value" />
                                </span>
                              ) : (
                                <img src={rule.valueImage} alt="Value" />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default SuperOverComponent;
