import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import UserBets from "../../../game/userBet";
import { handleRoundId } from "../../../../helpers";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import SBetBox from "./Sbox";
import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";
import CardResultBox from "../../../commonComponent/cardResultBox";
import RulesModal from "../../../commonComponent/rulesModal";
import { abjrules } from "../../../../assets";
import Abj2Result from "./abj2Card";

const Abj2Component = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  return (
    <div>
      <Row>
        <Col md={8}>
          <div className="horseRacingTab">
            <div style={{ width: "100%", height: "400px", margin: "5px" }}>
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
                      )}|Min: ${dragonTigerDetail?.videoInfo?.min}|Max: ${
                        dragonTigerDetail?.videoInfo?.max
                      }`
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
                  result={<Abj2Result data={dragonTigerDetail?.videoInfo} />}
                  id={`${cardUrl}${cardGamesId.andarBahar2}`}
                />
              </div>
            </div>
            <div style={{ height: "460px" }}>
              <div
                className="row-flex"
                style={{ width: "100%", margin: "4% 2% 5px 5px" }}
              >
                <SBetBox
                  type={"A"}
                  odds={dragonTigerDetail?.abjSa}
                  data={dragonTigerDetail}
                />
                <SBetBox
                  type={"B"}
                  odds={dragonTigerDetail?.abjSb}
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
                  card={true}
                  odds={dragonTigerDetail?.oddEven}
                  data={dragonTigerDetail}
                />
                <OddEven
                  card={false}
                  odds={dragonTigerDetail?.abjCards}
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
                  rate={12}
                  cards={dragonTigerDetail?.cards}
                  data={dragonTigerDetail}
                />
              </div>
              <div style={{ width: "100%", margin: "5px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["A", "B"]}
                  type={cardGamesType.andarBahar2}
                />
              </div>
            </div>
            <RulesModal show={show} setShow={setShow} rule={abjrules} />
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

export default Abj2Component;
