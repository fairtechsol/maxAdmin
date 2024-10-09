import { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import RulesModal from "../../../commonComponent/rulesModal";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import {
  cardData,
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import { RootState } from "../../../../store/store";
import Crick5Result from "./cric5Card";
import MarketComponent from "./marketComponent";
import CardResultBox from "../../../commonComponent/cardResultBox";
import UserBets from "../../../game/userBet";
import { crick5rules } from "../../../../assets";
import ScoreBoard from "../../../commonComponent/scoreBoard";

const Cricket5Component = () => {
  const [show, setShow] = useState(false);

  const { dragonTigerDetail, scoreBoardData } = useSelector(
    (state: RootState) => state.card
  );

  return (
    <>
      <Row>
        <Col md={8} className="five-cricket">
          <div style={{ width: "100%"}}>
            <div className="horseRacingTabHeader">
              <div>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  {dragonTigerDetail?.name}
                </span>
                <a
                  style={{
                    fontSize: "14px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => setShow(true)}
                >
                  {" "}
                  RULES
                </a>
              </div>
              <span>
                {dragonTigerDetail?.videoInfo
                  ? `Round ID:  ${dragonTigerDetail?.videoInfo?.mid}|Min: ${dragonTigerDetail?.videoInfo?.min}|Max: ${dragonTigerDetail?.videoInfo?.max}`
                  : ""}
              </span>
            </div>
            <div>
              {scoreBoardData?.data && (
                <ScoreBoard data={scoreBoardData?.data} />
              )}
            </div>
            <div
              style={{ width: "100%", backgroundColor: "#000" }}
            >
              <VideoFrame
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Crick5Result data={dragonTigerDetail?.videoInfo} />}
                id={`${cardUrl}${cardGamesId?.cricketv3}`}
              />
            </div>
          </div>
          <div>
            <div>
              <MarketComponent
                odds={dragonTigerDetail?.odds}
                min={dragonTigerDetail?.videoInfo?.min}
                max={dragonTigerDetail?.videoInfo?.max}
                data={dragonTigerDetail}
              />
            </div>
            <div className="mt-2">
              <CardResultBox
                data={dragonTigerDetail}
                name={["A", "I", "T"]}
                type={cardGamesType.cricketv3}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <Container className="p-0" fluid>
            <Row>
              <Col md={12}>
                <UserBets matchId={dragonTigerDetail?.id} />
              </Col>
              <Col>
                <div className="casino-title" style={{ position: "relative" }}>
                  <span>Rules</span>
                </div>
                <div className="table-responsive rules-table d-flex">
                  {cardData?.map((teamData, index) => (
                    <Table bordered key={index} className="mb-4">
                      <thead>
                        <tr>
                          <th colSpan={2} className="text-center">
                            {teamData.team}
                          </th>
                        </tr>
                        <tr>
                          <th>Cards</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamData.cards.map((card, cardIndex) => (
                          <tr key={cardIndex}>
                            <td className=" d-flex text-start">
                              <div className="d-flex justify-content-center align-items-center gap-2">
                                <img
                                  src={
                                    typeof card.imgSrc === "string"
                                      ? card.imgSrc
                                      : ""
                                  }
                                  alt="s"
                                  className="img-cards"
                                />
                                X 10
                              </div>
                            </td>
                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                {card.value}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ))}
                </div>
                <RulesModal show={show} setShow={setShow} rule={crick5rules} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default Cricket5Component;
