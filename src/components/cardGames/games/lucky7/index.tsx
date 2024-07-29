import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import VideoFrame from "../../../../components/commonComponent/videoFrame/VideoFrame";
import TiePairBox from "../../../../components/cardGames/games/lucky7/TiePairBox";
import OddEven from "../../../../components/cardGames/games/lucky7/OddEvenBox";
import CardResultBox from "../../../../components/commonComponent/cardResultBox";
import RulesModal from "../../../../components/commonComponent/rulesModal";
import { handleRoundId } from "../../../../helpers";
import UserBets from "../../../../components/game/userBet";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { luckyrules } from "../../../../assets";
import Lucky7Result from "./lucky7Card";
import "./style.scss";
import CardBox from "./CardsBox";

const Lucky7Component = () => {
  const [show, setShow] = useState(false);
  const placeBetRef = useRef<HTMLDivElement>(null);

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
                  result={<Lucky7Result data={dragonTigerDetail?.videoInfo} />}
                  id={`${cardUrl}${cardGamesId.lucky7}`}
                />
              </div>
            </div>
            <div style={{ height: "550px" }}>
              <div style={{ width: "100%", margin: "5% 5px" }}>
                <TiePairBox
                  lowHigh={dragonTigerDetail?.lowHigh}
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
                  name={"DRAGON"}
                  odds={dragonTigerDetail?.redBlack}
                  data={dragonTigerDetail}
                  card={true}
                />

                <OddEven
                  name={"TIGER"}
                  odds={dragonTigerDetail?.luckOdds}
                  card={false}
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
                  cardData={dragonTigerDetail?.luckyCards}
                  data={dragonTigerDetail}
                  rate={dragonTigerDetail?.luckyCards?.rate}
                />
              </div>
              <div style={{ width: "100%", margin: "5px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["L", "H", "T"]}
                  type={cardGamesType.lucky7}
                />
              </div>
            </div>

            <RulesModal show={show} setShow={setShow} rule={luckyrules} />
          </div>
        </Col>
        <Col md={4}>
          <Container className="p-0" fluid ref={placeBetRef}>
            <Row
            // className={` ${isSticky ? "position-fixed top-0" : ""}`}
            // style={{
            //   width: isSticky
            //     ? placeBetRef.current?.offsetWidth + "px"
            //     : "100%",
            // }}
            >
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

export default Lucky7Component;
