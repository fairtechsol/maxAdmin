import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
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
import { dtrules } from "../../../../assets";
import RulesModal from "../../../commonComponent/rulesModal";
import CardResultBox from "../../../commonComponent/cardResultBox";
import UserBets from "../../../game/userBet";
import Dragon20Result from "./dragonCard";
import TiePairBox from "./TiePairBox";
import OddEven from "./OddEvenBox";
// import CardBox from "./CardsBox";

const DragonTiger2020Component = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  console.log('dt1',dragonTigerDetail);
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
              style={{ width: "100%",backgroundColor: "#000" }}
            >
              <VideoFrame
                data={dragonTigerDetail}
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Dragon20Result data={dragonTigerDetail?.videoInfo} />}
                id={`${cardUrl}${cardGamesId.dragonTiger20}`}
              />
            </div>
          </div>
          <div style={{backgroundColor:"#eee"}}>
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
            {/* <div
              style={{
                width: "100%",
                // margin: "5px",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              <CardBox
                name={"DRAGON"}
                cardData={dragonTigerDetail?.dragonCards}
                data={dragonTigerDetail}
              />
              <CardBox
                name={"TIGER"}
                cardData={dragonTigerDetail?.tigerCards}
                data={dragonTigerDetail}
              />
            </div> */}
            <div className="mt-4" style={{ width: "100%" }}>
              <CardResultBox
                data={dragonTigerDetail}
                name={["D", "T"]}
                type={cardGamesType.dragonTiger20}
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

export default DragonTiger2020Component;
