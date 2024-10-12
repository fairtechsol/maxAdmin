import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import UserBets from "../../../game/userBet";
import { dtrules } from "../../../../assets";
import RulesModal from "../../../commonComponent/rulesModal";
import CardResultBox from "../../../commonComponent/cardResultBox";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import Dragon20Result from "./dragonCard";
import { handleRoundId } from "../../../../helpers";
import { RootState } from "../../../../store/store";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import TiePairBox from "./TiePairBox";
import OddEven from "./OddEvenBox";

const DragonSecond20Component = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  
  return (
    <div>
      <Row>
        <Col md={8}>
          <div style={{ width: "100%" }}>
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
              style={{ width: "100%", backgroundColor: "#000" }}
            >
              <VideoFrame
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Dragon20Result data={dragonTigerDetail?.videoInfo} />}
                id={`${cardUrl}${cardGamesId.dragonTiger202}`}
              />
            </div>
          </div>
          <div>
          <div style={{ width: "100%" }}>
              <TiePairBox
                tiePair={dragonTigerDetail?.tiePair}
                data={dragonTigerDetail}
              />
            </div>
            <div
              style={{
                width: "100%",
                // margin: "5px",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              <OddEven
                name={"Dragon"}
                odds={dragonTigerDetail?.dragonOdds}
                data={dragonTigerDetail}
                cards={dragonTigerDetail?.dragonCards}
              />
              <div style={{width:"4px",backgroundColor:"#000"}}></div>
              <OddEven
                name={"Tiger"}
                odds={dragonTigerDetail?.tigerOdds}
                data={dragonTigerDetail}
                cards={dragonTigerDetail?.tigerCards}
              />
            </div>
            <div style={{ width: "100%", margin: "5px" }}>
              <CardResultBox
                data={dragonTigerDetail}
                name={["D", "T"]}
                type={cardGamesType.dragonTiger202}
              />
            </div>
          </div>

          <RulesModal show={show} setShow={setShow} rule={dtrules} />
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

export default DragonSecond20Component;
