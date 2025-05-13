import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { card32rules } from "../../../../assets";
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
import Card32Result from "./card32Card";
import DynamicTable from "./dynamicTable";
import "./style.scss";

const Cards32AComponent = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  return (
    <div>
      <Row>
        <Col md={8}>
          <div>
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
                    )}|Min: ${dragonTigerDetail?.videoInfo?.min}|Max: ${
                      dragonTigerDetail?.videoInfo?.max
                    }`
                  : ""}
              </span>
            </div>
            <div style={{ width: "100%", backgroundColor: "#000" }}>
              <VideoFrame
                data={dragonTigerDetail}
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Card32Result data={dragonTigerDetail?.videoInfo} />}
                id={`${cardUrl}${cardGamesId.card32}`}
              />
            </div>
          </div>
          <div>
            <div className="d-flex px-2 mt-1">
              <DynamicTable
                odds={dragonTigerDetail?.set1}
                data={dragonTigerDetail}
                playerNum={[8, 9]}
              />
              <div style={{ width: "10px" }}></div>
              <DynamicTable
                odds={dragonTigerDetail?.set2}
                data={dragonTigerDetail}
                playerNum={[10, 11]}
              />
            </div>
            <div className="mt-2">
              <CardResultBox
                data={dragonTigerDetail}
                name={["8", "9", "10", "11"]}
                type={cardGamesType.card32}
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

export default Cards32AComponent;
