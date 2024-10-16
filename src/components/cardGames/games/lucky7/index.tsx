import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import VideoFrame from "../../../../components/commonComponent/videoFrame/VideoFrame";
import TiePairBox from "../../../../components/cardGames/games/lucky7/TiePairBox";
// import OddEven from "../../../../components/cardGames/games/lucky7/OddEvenBox";
import CardResultBox from "../../../../components/commonComponent/cardResultBox";
import RulesModal from "../../../../components/commonComponent/rulesModal";
import { handleRoundId } from "../../../../helpers";
import UserBets from "../../../../components/game/userBet";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { luckyrules } from "../../../../assets";
import Lucky7Result from "./lucky7Card";
import "./style.scss";
import CardBox from "./CardsBox";

const Lucky7Component = () => {
  const [show, setShow] = useState(false);

  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  return (
    <div>
      <Row>
        <Col md={8}>
          <div className="horseRacingTab">
            <div style={{ width: "100%"}}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    {dragonTigerDetail?.name}
                  </span>
                  <a
                    style={{ fontSize: "14px", textDecoration: "underline" }}
                    onClick={() => setShow(true)}
                  >
                    {" "}
                    RULES
                  </a>
                </div>
                <span>
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${handleRoundId(
                        dragonTigerDetail?.videoInfo?.mid
                      )}`
                    : ""}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  data={dragonTigerDetail}
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<Lucky7Result data={dragonTigerDetail?.videoInfo} />}
                  id={`${cardUrl}${cardGamesId.lucky7}`}
                />
              </div>
            </div>
            <div>
              <div style={{ width: "100%"}}>
                <TiePairBox
                  lowHigh={dragonTigerDetail?.lowHigh}
                  odds={dragonTigerDetail?.redBlack}
                  cards={dragonTigerDetail?.luckOdds}
                  data={dragonTigerDetail}
                />
              </div>
             
              <div
                style={{
                  width: "100%",
                  margin: "5px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                }}
              >
                <CardBox
                  cardData={dragonTigerDetail?.luckyCards}
                  data={dragonTigerDetail}
                  rate={dragonTigerDetail?.luckyCards?.rate}
                />
              </div>
              <div style={{ width: "100%", margin: "5px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["L", "H", "T"]}
                  type={cardGamesType.lucky7}
                />
              </div>
            </div>

            <RulesModal show={show} setShow={setShow} rule={luckyrules} />
          </div>
        </Col>
        <Col md={4}>
          <Container className="p-0" fluid>
            <Row>
              <Col md={12}>
                <UserBets matchId={dragonTigerDetail?.id} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Lucky7Component;
