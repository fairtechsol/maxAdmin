import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { p6rules } from "../../../../assets";
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
import DynamicTable from "./betTable";
import Poker20Result from "./poker20";
import "./style.scss";

const Poker20Component = () => {
  const [show, setShow] = useState(false);
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.poker20}`);
  }, []);
  const evenIndexArray = dragonTigerDetail?.odds?.filter(
    (_: any, index: any) => index % 2 === 0
  ); // Elements at even indices
  const oddIndexArray = dragonTigerDetail?.odds?.filter(
    (_: any, index: any) => index % 2 !== 0
  );
  return (
    <>
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
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Poker20Result data={dragonTigerDetail?.videoInfo} />}
                id={videoFrameId}
                data={dragonTigerDetail}
              />
            </div>
          </div>
          <div>
            <div className="d-flex py-2">
              <DynamicTable odds={evenIndexArray} data={dragonTigerDetail} />
              <div style={{ width: "4px", backgroundColor: "grey" }}></div>
              <DynamicTable odds={oddIndexArray} data={dragonTigerDetail} />
            </div>
            <div className="mt-2">
              <CardResultBox
                data={dragonTigerDetail}
                name={["A", "B", "T"]}
                type={cardGamesType.poker20}
              />
            </div>
          </div>
          <RulesModal show={show} setShow={setShow} rule={p6rules} />
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

export default Poker20Component;
