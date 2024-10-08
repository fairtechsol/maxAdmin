import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import { RootState } from "../../../../store/store";
import { handleRoundId } from "../../../../helpers";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import RulesModal from "../../../commonComponent/rulesModal";
import { card32rules } from "../../../../assets";
import UserBets from "../../../game/userBet";
import CardResultBox from "../../../commonComponent/cardResultBox";
// import BackLay from "./BackLay";
import OddEven from "./OddEvenBox";
import PairBox from "./PairBox";
import TotalCards from "./totalCards";
import CardBox from "./cardBox";
import RateBox from "./ratebox";
import Card32BResult from "./card32B";

const Card32BComponent = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  return (
    <div>
      <Row>
        <Col md={8}>
          <div style={{ width: "100%"}}>
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
              style={{ width: "100%",backgroundColor: "#000" }}
            >
              <VideoFrame
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Card32BResult data={dragonTigerDetail?.videoInfo} />}
                id={`${cardUrl}${cardGamesId.card32B}`}
              />
            </div>
          </div>
          <div>
            <div
              className="d-sm-flex flex-row justify-content-around mt-2"
              style={{ width: "100%",gap:"15px" }}
            >
              <RateBox odds={dragonTigerDetail?.matchOdd}/>
              <OddEven
                  odds={dragonTigerDetail?.oddEven}
                  data={dragonTigerDetail}
                />
             
            </div>
            <div
              style={{
                width: "100%",
                margin: "5px",
                display: "flex",
                flexDirection: "row",
                gap: "15px",
              }}
            >
             
              <PairBox
                odds={dragonTigerDetail?.redBlack}
                data={dragonTigerDetail}
              />
              <TotalCards
                odds={dragonTigerDetail?.cardtotal}
                data={dragonTigerDetail}
              />
            </div>
            <div
              style={{
                width: "100%",
                marginLeft: "5px",
              }}
            >
              <CardBox
                odds={dragonTigerDetail?.singleCard}
                data={dragonTigerDetail}
              />
            </div>
            <div style={{ width: "100%", margin: "5px" }}>
              <CardResultBox
                data={dragonTigerDetail}
                name={["8", "9", "10", "11"]}
                type={cardGamesType.card32B}
              />
            </div>
          </div>

          <RulesModal show={show} setShow={setShow} rule={card32rules} />
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

export default Card32BComponent;
