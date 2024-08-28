import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import { RootState } from "../../../../store/store";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import UserBets from "../../../game/userBet";
import RulesModal from "../../../commonComponent/rulesModal";
import { abjrules } from "../../../../assets";
import CardResultBox from "../../../commonComponent/cardResultBox";
import { handleRoundId } from "../../../../helpers";
import CardJudgementResult from "./3cardJudgement";
import CardBox from "./CardsBox";

const CardJComponent = () => {
  const [show, setShow] = useState(false);
  const placeBetRef = useRef<HTMLDivElement>(null);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

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
                    ? `Round ID:  ${handleRoundId(
                        dragonTigerDetail?.videoInfo?.mid
                      )}|Min: ${dragonTigerDetail?.videoInfo?.min}|Max: ${
                        dragonTigerDetail?.videoInfo?.max
                      }`
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
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={
                    <CardJudgementResult data={dragonTigerDetail?.cardInfo} />
                  }
                  id={`${cardUrl}${cardGamesId?.cardj}`}
                />
              </div>
            </div>
            <div>
              <div
                style={{
                  width: "100%",
                  margin: "5px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardBox
                  title={"Yes"}
                  bgColor={"#03b2cb"}
                  odds={dragonTigerDetail?.yes}
                  data={dragonTigerDetail}
                  cards={dragonTigerDetail?.cardInfo}
                />
                <CardBox
                  title={"No"}
                  bgColor={"#FAA9BA"}
                  odds={dragonTigerDetail?.no}
                  data={dragonTigerDetail}
                  cards={dragonTigerDetail?.cardInfo}
                />
                <div className="ticker-container">
                  <div className="ticker-wrap">
                    <div
                      className="ticker-move"
                      style={{ color: "#8b0000", fontWeight: "700" }}
                    >
                      {dragonTigerDetail?.videoInfo?.remark}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", margin: "5px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["R", "R", "R"]}
                  type={cardGamesType.cardj}
                />
              </div>
            </div>
            <RulesModal show={show} setShow={setShow} rule={abjrules} />
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

export default CardJComponent;
