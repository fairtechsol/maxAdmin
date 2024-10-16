import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Col, Container, Row,Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import { RootState } from "../../../../store/store";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import { handleRoundId } from "../../../../helpers";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import UserBets from "../../../game/userBet";
import RulesModal from "../../../commonComponent/rulesModal";
import { p6rules } from "../../../../assets";
import Poker1DayResult from "./poker1DayCard";
import DynamicTable from "./betTable";
import CardResultBox from "../../../commonComponent/cardResultBox";
// import PairBox from "./pairBox";

const Poker1DayComponent = () => {
  const [show, setShow] = useState(false);
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  const bonus1 = [
    { label: "Pair (2-10)", value: "1 To 3" },
    { label: "A/Q or A/J Off Suited", value: "1 TO 5" },
    { label: "Pair (JQK)", value: "1 TO 10" },
    { label: "A/K Off Suited", value: "1 TO 15" },
    { label: "A/Q or A/J Suited", value: "1 TO 20" },
    { label: "A/K Suited", value: "1 TO 25" },
    { label: "A/A", value: "1 TO 30" },
  ];

  const bonus2 = [
    { label: "Three of a Kind", value: "1 To 3" },
    { label: "Straight", value: "1 TO 4" },
    { label: "Flush", value: "1 TO 6" },
    { label: "Full House", value: "1 TO 8" },
    { label: "Four of a Kind", value: "1 TO 30" },
    { label: "Straight Flush", value: "1 TO 50" },
    { label: "Royal Flush", value: "1 TO 100" },
  ];

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.poker1Day}`);
  }, []);

  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    Poker 1 Day
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
                      )}|Min: ${dragonTigerDetail?.videoInfo?.min}|Max: ${
                        dragonTigerDetail?.videoInfo?.max
                      }`
                    : ""}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  data={dragonTigerDetail}
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={
                    <Poker1DayResult data={dragonTigerDetail?.videoInfo} />
                  }
                  id={videoFrameId}
                />
              </div>
            </div>
            <div>
              <div>
                <div>
                  <DynamicTable
                    odds={dragonTigerDetail?.oddsData}
                    data={dragonTigerDetail}
                    playerNum={[8, 9]}    
                  />
                </div>
                {/* <div style={{ width: "60%" }}>
                  <PairBox
                    odds={dragonTigerDetail?.playersBonusPair}
                    data={dragonTigerDetail}
                  />
                </div> */}
              </div>
              <div style={{ width: "100%" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["A", "B", "T"]}
                  type={cardGamesType.poker1Day}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} className="ps-0">
          <Container className="p-0" fluid>
            <Row>
              <Col md={12}>
                <UserBets matchId={dragonTigerDetail?.id} />
              </Col>
              <Col
                xs={12}
                className="no-scrollbar"
                style={{ height: "400px", overflow: "auto" }}
              >
                 <div className="casino-title mt-2" style={{ position: "relative",textAlign:"center",fontSize:"16px",fontWeight:"600" }}>
                  <span>Rules</span>
                </div>
                <div className="table-responsive rules-table lh-1">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th colSpan={2} className="box-10 text-center title-14">
                          Bonus 1 (2 Cards Bonus)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bonus1.map((item, index) => (
                        <tr key={index}>
                          <td className="box-7">{item.label}</td>
                          <td className="box-3">{item.value}</td>
                        </tr>
                      ))}
                      <tr>
                        <th colSpan={2} className="box-10 text-center">
                          Bonus 2 (7 Cards Bonus)
                        </th>
                      </tr>
                      {bonus2.map((item, index) => (
                        <tr key={index}>
                          <td className="box-7">{item.label}</td>
                          <td className="box-3">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <RulesModal show={show} setShow={setShow} rule={p6rules} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default Poker1DayComponent;
