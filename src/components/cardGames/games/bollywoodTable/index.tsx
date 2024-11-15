import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import { handleRoundId } from "../../../../helpers";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import { RootState } from "../../../../store/store";
import UserBets from "../../../game/userBet";
import RulesModal from "../../../commonComponent/rulesModal";
import { luckyrules } from "../../../../assets";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import CardResultBox from "../../../commonComponent/cardResultBox";
import BollywoodTableCard from "./lucky7Card";
import TiePairBox from "./TiePairBox";
import TiePairBox2 from "./TiePairBox2";
import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";

const BollywoodTableComponent = () => {
  const [show, setShow] = useState(false);
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [videoFrameId, setVideoFrameId] = useState("");

  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId.btable}`);
  }, []);
  return (
    <>
      <Row>
        <Col md={8}>
          <div className="horseRacingTab">
            <div style={{ width: "100%"}}>
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
                    <BollywoodTableCard data={dragonTigerDetail?.videoInfo} />
                  }
                  id={videoFrameId}
                  data={dragonTigerDetail}
                />
              </div>
            </div>
            <div>
              <div style={{ width: "100%" }}>
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
                <div
                  style={{
                    width: "30%",
                  }}
                >
                  <TiePairBox2
                    lowHigh={dragonTigerDetail?.luckOdds}
                    data={dragonTigerDetail}
                  />
                </div>

                <div
                  style={{
                    width: "70%",
                    background: "#EEEEEE",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                  }}
                >
                  <OddEven
                    name={"DRAGON"}
                    odds={dragonTigerDetail?.seven}
                    data={dragonTigerDetail}
                    card={true}
                  />
                </div>
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
                <div
                  style={{
                    width: "50%",
                    background: "#EEEEEE",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                  }}
                >
                  <OddEven
                    name={"TIGER"}
                    odds={dragonTigerDetail?.redBlack}
                    card={false}
                    data={dragonTigerDetail}
                  />
                </div>

                <div
                  style={{
                    width: "50%",
                    background: "#EEEEEE",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                  }}
                >
                  <CardBox
                    cardData={dragonTigerDetail?.luckyCards}
                    data={dragonTigerDetail}
                    rate={dragonTigerDetail?.luckyCards?.rate}
                  />
                </div>
              </div>
              <div style={{ width: "100%", margin: "5px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["A", "B", "C", "D", "E", "F"]}
                  type={cardGamesType.btable}
                />
              </div>
            </div>
            <RulesModal show={show} setShow={setShow} rule={luckyrules} />
          </div>
        </Col>
        <Col md={4}>
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

export default BollywoodTableComponent;
