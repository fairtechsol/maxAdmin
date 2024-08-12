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
import { handleRoundId } from "../../../../helpers";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import CardResultBox from "../../../commonComponent/cardResultBox";
import RulesModal from "../../../commonComponent/rulesModal";
import { Baccarat1rules } from "../../../../assets";
import UserBets from "../../../game/userBet";
import BaccaratStatistics from "./betTable";
export const data = [
  ["Task", "Hours per Day"],
  ["Work", 15],
  ["Eat", 20],
];

export const options = {
  title: "My Daily Activities",
  is3D: true,
};

const Baccarat2Component = () => {
  const [show, setShow] = useState(false);
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail, graphsData } = useSelector(
    (state: RootState) => state.card
  );

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.baccarat2}`);
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
                      )}|Min: ${dragonTigerDetail?.odds?.[3]?.min}|Max: ${
                        dragonTigerDetail?.odds?.[3]?.max
                      }`
                    : ""}
                </span>
              </div>
              <div
                style={{
                  // flex: '1 0 auto',
                  width: "100%",
                  // height: "92%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  //   result={<Abj2Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            <></>
            <div>
              <div
                className="row-flex"
                style={{ width: "100%", margin: "5px" }}
              >
                <BaccaratStatistics
                  data={dragonTigerDetail}
                  odds={dragonTigerDetail?.odds}
                  graphsData={graphsData}
                  cardData={dragonTigerDetail?.videoInfo}
                />
              </div>

              <div style={{ width: "100%", margin: "5px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["P", "B", "T"]}
                  type={cardGamesType.baccarat2}
                />
              </div>
            </div>
            <RulesModal show={show} setShow={setShow} rule={Baccarat1rules} />
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

export default Baccarat2Component;
