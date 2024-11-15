import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import { RootState } from "../../../../store/store";
import { handleRoundId } from "../../../../helpers";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import CardResultBox from "../../../commonComponent/cardResultBox";
import RulesModal from "../../../commonComponent/rulesModal";
import { luckyrules } from "../../../../assets";
import UserBets from "../../../game/userBet";
import TiePairBox from "./TiePairBox";
import Lucky7BResult from "./lucky7Card";
// import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";

const Lucky7BComponent = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  return (
    <>
      <Row>
        <Col md={8}>
          <div className="horseRacingTab">
            <div style={{ width: "100%" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    {dragonTigerDetail?.name}
                  </span>
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
                  result={<Lucky7BResult data={dragonTigerDetail?.videoInfo} />}
                  id={`${cardUrl}${cardGamesId.lucky7B}`}
                />
              </div>
            </div>
            <div>
              <div style={{ width: "100%" }}>
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
                  type={cardGamesType.lucky7B}
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
    </>
  );
};

export default Lucky7BComponent;
