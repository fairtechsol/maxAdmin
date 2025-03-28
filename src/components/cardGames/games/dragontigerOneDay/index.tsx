import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import BackLay from "./BackLay";
import OddEven from "./OddEvenBox";
import { dtrules } from "../../../../assets";
import { handleRoundId } from "../../../../helpers";
import { RootState } from "../../../../store/store";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import CardResultBox from "../../../commonComponent/cardResultBox";
import RulesModal from "../../../commonComponent/rulesModal";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import UserBets from "../../../game/userBet";
import Dragon20Result from "./dragonCard";
import "./style.scss";

const DragonTigerDesktop = () => {
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
              </div>
              <span>
                {dragonTigerDetail?.videoInfo
                  ? `Round ID:  ${handleRoundId(
                      dragonTigerDetail?.videoInfo?.mid
                    )}`
                  : ""}
              </span>
            </div>
            <div style={{ width: "100%", backgroundColor: "#000" }}>
              <VideoFrame
                data={dragonTigerDetail}
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Dragon20Result data={dragonTigerDetail?.videoInfo} />}
                id={`${cardUrl}${cardGamesId.dragonTigerOneDay}`}
              />
            </div>
          </div>
          <div>
            <div
              className="d-sm-flex flex-row justify-content-around align-items-center"
              style={{ width: "100%" }}
            >
              <div className="w-100">
                <BackLay
                  matchOddsData={dragonTigerDetail?.matchOddsData}
                  data={dragonTigerDetail}
                  odds={dragonTigerDetail?.pair}
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <OddEven
                name={"Dragon"}
                odds={dragonTigerDetail?.dragonData}
                data={dragonTigerDetail}
              />
              <div style={{ width: "4px", backgroundColor: "#000" }}></div>
              <OddEven
                name={"Tiger"}
                odds={dragonTigerDetail?.tigerData}
                data={dragonTigerDetail}
              />
            </div>

            <div style={{ width: "100%", margin: "5px" }}>
              <CardResultBox
                data={dragonTigerDetail}
                name={["D", "T"]}
                type={cardGamesType.dragonTigerOneDay}
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

export default DragonTigerDesktop;
