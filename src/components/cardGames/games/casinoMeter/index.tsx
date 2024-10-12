import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import { RootState } from "../../../../store/store";
import { handleRoundId } from "../../../../helpers";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import UserBets from "../../../game/userBet";
import Meter from "./meter";
//import LowCards from "./LowCards";
import CardResultBox from "../../../commonComponent/cardResultBox";
//import HighCards from "./HighCards";
import RulesModal from "../../../commonComponent/rulesModal";

const CasinoMeterComponent = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [modalType] = useState("imageWithContent");
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  const { placedBets } = useSelector(
    (state: RootState) => state.match.placeBets
  );
  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.cmeter}`);
  }, []);
  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div style={{ marginBottom: ".30px" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    CASINO METER
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
                    Rules
                  </span>
                </div>
                <span>
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${handleRoundId(
                        dragonTigerDetail?.videoInfo?.mid
                      )}|Min: ${
                        dragonTigerDetail?.players?.[0]?.[0]?.min ?? 0
                      }|Max: ${dragonTigerDetail?.players?.[0]?.[0]?.max ?? 0}`
                    : ""}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "90%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={""}
                  id={videoFrameId}
                />
              </div>
            </div>
            <div>
              <Meter
                data={dragonTigerDetail?.videoInfo?.cards}
                runPosition={
                  dragonTigerDetail?.videoInfo?.mid == placedBets?.[0]?.runnerId
                    ? placedBets?.[0]?.teamName == "Low"
                      ? "Low"
                      : "High"
                    : ""
                }
                dragonTigerDetai={dragonTigerDetail}
              />

              {/* <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: "10px",
                  paddingTop: "10px",
                }}
              >
                <LowCards
                  odds={dragonTigerDetail?.low}
                  data={dragonTigerDetail}
                  placedLow={
                    dragonTigerDetail?.videoInfo?.mid ==
                    placedBets?.[0]?.runnerId
                      ? placedBets?.[0]?.teamName == "Low"
                        ? true
                        : false
                      : true
                  }
                />
                <HighCards
                  odds={dragonTigerDetail?.high}
                  data={dragonTigerDetail}
                  placedHigh={
                    dragonTigerDetail?.videoInfo?.mid ==
                    placedBets?.[0]?.runnerId
                      ? placedBets?.[0]?.teamName == "High"
                        ? true
                        : false
                      : true
                  }
                />
              </div> */}
              <div style={{ width: "100%", marginTop: "10px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["R", "R"]}
                  type={cardGamesType?.cmeter}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} className="p-0">
          <Container className="p-0" fluid ref={placeBetRef}>
            <Row>
              <Col md={12}>
                <UserBets matchId={dragonTigerDetail?.id} />
              </Col>
              <Col>
                <RulesModal show={show} setShow={setShow} type={modalType} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default CasinoMeterComponent;
