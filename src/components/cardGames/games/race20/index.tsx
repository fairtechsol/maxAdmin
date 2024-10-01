import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import { RootState } from "../../../../store/store";
// import { handleRoundId } from "../../../../helpers";
import UserBets from "../../../game/userBet";
import RulesModal from "../../../commonComponent/rulesModal";
import { race20rules } from "../../../../assets";
import CardResultBox from "../../../commonComponent/cardResultBox";
import Race20Result from "./race20Card";
import TotalsBox from "./TotalBox";
import WinBox from "./win";
import OddBox from "./OddBox";

const Race20Component = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  return (
    <>
      <Row>
        <Col md={8}>
          <div className="horseRacingTab">
            <div style={{ width: "100%" }}>

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
                  result={<Race20Result data={dragonTigerDetail?.videoInfo} />}
                  id={`${cardUrl}${cardGamesId?.race20}`}
                />
              </div>
            </div>
            <div>
              <div
                style={{
                  width: "100%",
                  margin: "5px",
                  display: "flex",
                }}
              >
                <OddBox
                  odds={dragonTigerDetail?.cards}
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
                <TotalsBox
                  odds={dragonTigerDetail?.total}
                  data={dragonTigerDetail}
                />
                <WinBox
                  odds={dragonTigerDetail?.win}
                  data={dragonTigerDetail}
                />
              </div>
              <div style={{ width: "100%", margin: "5px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["A", "B"]}
                  type={cardGamesType.race20}
                />
              </div>
            </div>
            <RulesModal show={show} setShow={setShow} rule={race20rules} />
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

export default Race20Component;
