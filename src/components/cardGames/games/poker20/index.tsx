import { useEffect, useState } from "react";
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
import { p6rules } from "../../../../assets";
import CardResultBox from "../../../commonComponent/cardResultBox";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import Poker20Result from "./poker20";
import { handleRoundId } from "../../../../helpers";
import DynamicTable from "./betTable";

const Poker20Component = () => {
  const [show, setShow] = useState(false);
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.poker20}`);
  }, []);

  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ height: "400px", margin: "5px" }}>
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
              style={{ width: "100%", height: "90%", backgroundColor: "#000" }}
            >
              <VideoFrame
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Poker20Result data={dragonTigerDetail?.videoInfo} />}
                id={videoFrameId}
              />
            </div>
          </div>
          <div style={{ height: "350px" }}>
            <div className="d-flex px-2 mt-5">
              <DynamicTable
                odds={dragonTigerDetail?.odds}
                data={dragonTigerDetail}
                playerNum={[0, 10]}
              />
              <div style={{ width: "10px" }}></div>
              <DynamicTable
                odds={dragonTigerDetail?.odds}
                data={dragonTigerDetail}
                playerNum={[10, 18]}
              />
            </div>
            <div className="mt-2">
              <CardResultBox
                data={dragonTigerDetail}
                name={["A", "B", "T"]}
                type={cardGamesType.poker20}
              />
            </div>
          </div>
          <RulesModal show={show} setShow={setShow} rule={p6rules} />
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

export default Poker20Component;
