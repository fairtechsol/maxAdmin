import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import BackLay from "./BackLay";
import OddEven from "./OddEvenBox";
import PairBox from "./PairBox";
import CardBox from "./cardBox";
import Dragon20Result from "./dragonCard";
import "./style.scss";
import UserBets from "../../../game/userBet";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import { RootState } from "../../../../store/store";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import { handleRoundId } from "../../../../helpers";
import CardResultBox from "../../../commonComponent/cardResultBox";
import RulesModal from "../../../commonComponent/rulesModal";
import { dtrules } from "../../../../assets";

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
                id={`${cardUrl}${cardGamesId.dragonTigerOneDay}`}
              />
            </div>
          </div>
          <div>
            <div
              className="d-sm-flex flex-row justify-content-around align-items-center"
              style={{ width: "100%"}}
            >
              <div className="w-50">
                <BackLay
                  matchOddsData={dragonTigerDetail?.matchOddsData}
                  data={dragonTigerDetail}
                />
              </div>
              <div className="w-50">
                <PairBox
                  odds={dragonTigerDetail?.pair}
                  data={dragonTigerDetail}
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <OddEven
                title1={"even"}
                title2={"odd"}
                dragonData={dragonTigerDetail?.dragonData}
                tigerData={dragonTigerDetail?.tigerData}
                data={dragonTigerDetail}
              />
              <OddEven
                title1={"red"}
                title2={"black"}
                dragonData={dragonTigerDetail?.dragonData}
                tigerData={dragonTigerDetail?.tigerData}
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
                dragonData={dragonTigerDetail?.dragonData}
                tigerData={dragonTigerDetail?.tigerData}
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
