import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import "./style.scss";
import CardResultBox from "../../../commonComponent/cardResultBox";
import UserBets from "../../../game/userBet";
import OddBox from "./OddBox";
import Race20Result from "./race20Card";
import TotalsBox from "./TotalBox";
import WinBox from "./win";

const Race20Component = () => {
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
                  data={dragonTigerDetail}
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
