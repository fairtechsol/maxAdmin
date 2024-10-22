import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import { RootState } from "../../../../store/store";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import UserBets from "../../../game/userBet";
import RulesModal from "../../../commonComponent/rulesModal";
import { aaarules } from "../../../../assets";
import CardResultBox from "../../../commonComponent/cardResultBox";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import { handleRoundId } from "../../../../helpers";
import AmarAkbarAnthonyCard from "./amarAkbarAnthonyCard";
import TiePairBox from "./TiePairBox";
import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";

const AmarAkbarAnthonyComponent = () => {
  const [show, setShow] = useState(false);
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.aaa}`);
  }, []);

  return (
    <>
      <Row>
        <Col md={8}>
          <div className="horseRacingTab">
            <div style={{ width: "100%", margin: "5px" }}>
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
                  height: "92%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={
                    <AmarAkbarAnthonyCard data={dragonTigerDetail?.videoInfo} />
                  }
                  id={videoFrameId}
                />
              </div>
            </div>
            <div>
              <div style={{ width: "100%", margin: "5px" }}>
                <TiePairBox
                  lowHigh={dragonTigerDetail?.players}
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
                <OddEven
                  name={"DRAGON"}
                  odds={dragonTigerDetail?.luckOdds}
                  data={dragonTigerDetail}
                  card={false}
                />

                <OddEven
                  name={"TIGER"}
                  odds={dragonTigerDetail?.redBlack}
                  card={true}
                  data={dragonTigerDetail}
                />

                <OddEven
                  name={"DRAGON"}
                  odds={dragonTigerDetail?.seven}
                  data={dragonTigerDetail}
                  card={false}
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
                  name={["A", "B", "C"]}
                  type={cardGamesType.amarAkbarAnthony}
                />
              </div>
            </div>

            <RulesModal show={show} setShow={setShow} rule={aaarules} />
          </div>
        </Col>
        <Col className="p-0" md={4}>
          <Container className="p-0" fluid ref={placeBetRef}>
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

export default AmarAkbarAnthonyComponent;
