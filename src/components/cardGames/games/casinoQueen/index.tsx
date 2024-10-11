import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import RulesModal from "../../../commonComponent/rulesModal";
import UserBets from "../../../game/userBet";
import { RootState } from "../../../../store/store";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import CardResultBox from "../../../commonComponent/cardResultBox";
import { abjrules } from "../../../../assets";
import QueenCard from "./queenCard";
import BetBox from "./betBox";

const CasinoQueenComponent = () => {
  const [show, setShow] = useState(false);
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.queen}`);
  }, []);
  const min = dragonTigerDetail?.minBet;
  const max = dragonTigerDetail?.maxBet;
  return (
    <>
      <Row>
        <Col md={8}>
          <div className="horseRacingTab">
            <div style={{ width: "100%"}}>
              <div
                style={{
                  // flex: '1 0 auto',
                  width: "100%",
                  // height: "92%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                data={dragonTigerDetail}
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<QueenCard data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            <div>
              <div
                style={{
                  width: "100%",
                  // margin: "5px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <BetBox
                  cards={dragonTigerDetail?.cards}
                  data={dragonTigerDetail}
                  playerNum={[0, 1, 2, 3]}
                />
                <div className="col-12 text-end title-12 mt-1">
                R:<span>{min}</span>-<span>{max}</span></div>
                <div className="ticker-container mt-4">
                  <div className="ticker-wrap">
                    <div
                      className="ticker-move title-12"
                      style={{ color: "#097c93", height: "32px" }}
                    >
                      {dragonTigerDetail?.videoInfo?.ramark}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ width: "100%", margin: "5px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["0", "1", "2", "3"]}
                  type={cardGamesType?.queen}
                />
              </div>
            </div>
            <RulesModal show={show} setShow={setShow} rule={abjrules} />
          </div>
        </Col>
        <Col  md={4}>
          <Container className="p-0" fluid >
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

export default CasinoQueenComponent;
