import "bootstrap/dist/css/bootstrap.min.css";
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
import { handleRoundId } from "../../../../helpers";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import CardResultBox from "../../../commonComponent/cardResultBox";
import UserBets from "../../../game/userBet";
import Poker6Result from "./poker6Card";
import TiePairBox from "./TiePairBox";
import RulesModal from "../../../commonComponent/rulesModal";
import { p6rules } from "../../../../assets";

const Poker6Component = () => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.poker}`);
  }, []);

  return (
    <div>
      <Row>
        <Col md={8}>
          <div style={{ width: "100%", height: "400px", margin: "5px" }}>
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
                  ? `Round ID:  ${handleRoundId(
                      dragonTigerDetail?.videoInfo?.mid
                    )}`
                  : ""}
              </span>
            </div>
            <div
              style={{ width: "100%", height: "92%", backgroundColor: "#000" }}
            >
              <VideoFrame
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Poker6Result data={dragonTigerDetail?.videoInfo} />}
                id={videoFrameId}
              />
            </div>
          </div>
          <div style={{ height: "760px", marginLeft: "10px" }}>
            <div className="tab-containerp">
              <div
                className={`hands ${activeTab === "tab1" ? "active" : ""}`}
                onClick={() => setActiveTab("tab1")}
              >
                Hands
              </div>
              <div
                className={`hands ${activeTab === "tab2" ? "active" : ""}`}
                onClick={() => setActiveTab("tab2")}
              >
                Pattern
              </div>
            </div>

            <div className="tab-contentp">
              {activeTab === "tab1" && (
                <div style={{ width: "100%" }}>
                  <TiePairBox
                    handsData={dragonTigerDetail?.handsData}
                    data={dragonTigerDetail}
                    width={"49%"}
                    title={"hand"}
                    cards={dragonTigerDetail?.videoInfo}
                  />
                </div>
              )}
              {activeTab === "tab2" && (
                <div style={{ width: "100%" }}>
                  <TiePairBox
                    handsData={dragonTigerDetail?.patternData}
                    data={dragonTigerDetail}
                    width={"30%"}
                    title={"pattern"}
                  />
                </div>
              )}
            </div>

            <div style={{ width: "100%", margin: "5px" }}>
              <CardResultBox
                data={dragonTigerDetail}
                name={["T", "1"]}
                type={cardGamesType.poker6}
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
    </div>
  );
};

export default Poker6Component;
