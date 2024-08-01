import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import RulesModal from "../../../commonComponent/rulesModal";
import UserBets from "../../../game/userBet";
import { abjrules } from "../../../../assets";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import CardResultBox from "../../../commonComponent/cardResultBox";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import { RootState } from "../../../../store/store";
import { handleRoundId } from "../../../../helpers";
import Abj1Result from "./abj1Card";
import CardBox from "./CardsBox";

const AndarBahar1Component = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  return (
    <>
      <Row>
        <Col md={8}>
          <div className="horseRacingTab">
            <div style={{ width: "100%", height: "440px", margin: "5px" }}>
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
                style={{
                  // flex: '1 0 auto',
                  width: "100%",
                  // height: "92%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<Abj1Result data={dragonTigerDetail?.cardInfo} />}
                  id={`${cardUrl}${cardGamesId?.andarBahar1}`}
                />
              </div>
            </div>
            <div style={{ height: "460px" }}>
              <div
                style={{
                  width: "100%",
                  margin: "5px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardBox
                  title={"ANDAR"}
                  bgColor={"#ffa07a"}
                  odds={dragonTigerDetail?.ander}
                  data={dragonTigerDetail}
                  cards={dragonTigerDetail?.cardInfo}
                />
                <CardBox
                  title={"BAHAR"}
                  bgColor={"#90ee90"}
                  odds={dragonTigerDetail?.bahar}
                  data={dragonTigerDetail}
                  cards={dragonTigerDetail?.cardInfo}
                />
              </div>

              <div style={{ width: "100%", margin: "5px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["R", "R", "R"]}
                  type={cardGamesType.andarBahar1}
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
    </>
  );
};

export default AndarBahar1Component;
