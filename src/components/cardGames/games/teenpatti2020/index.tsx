import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Table } from "react-bootstrap";
import RulesModal from "../../../commonComponent/rulesModal";
import { tprules } from "../../../../assets";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { handleRoundId } from "../../../../helpers";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import Teen20Result from "./teenCard";
import CardResultBox from "../../../commonComponent/cardResultBox";
import UserBets from "../../../game/userBet";
import "./style.scss";
import Matchodd from "./matchodd";

const TeentPatti2020Component = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  const rules = [
    { label: "Pair (Double)", value: "1 To 1" },
    { label: "Flush (Color)", value: "1 To 4" },
    { label: "Straight (Rown)", value: "1 To 6" },
    { label: "Trio (Teen)", value: "1 To 35" },
    { label: "Straight Flush (Pakki Rown)", value: "1 To 45" },
  ];
  
  return (
    <div>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    20-20 TEENPATTI
                  </span>
                  <span
                    style={{ fontSize: "14px", textDecoration: "underline" }}
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
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<Teen20Result data={dragonTigerDetail?.videoInfo} />}
                  id={`${cardUrl}${cardGamesId.teen20}`}
                />
              </div>
            </div>

            <div
              className="w-100 d-flex flex-row mt-2"
              style={{ gap: "10px" }}
            >
             <Matchodd data={dragonTigerDetail} odds={dragonTigerDetail?.playerA} name={"Player A"}/>
             <div style={{width:"4px",backgroundColor:"#000"}}></div>
             <Matchodd data={dragonTigerDetail} odds={dragonTigerDetail?.playerB} name={"Player B"}/>
            </div>
            <div style={{ width: "100%", marginTop: "10px" }}>
              <CardResultBox
                data={dragonTigerDetail}
                name={["A", "T", "B"]}
                type={cardGamesType.teen20}
              />
            </div>
          </div>
        </Col>
        <Col md={4} className="ps-0">
          <Container className="p-0" fluid>
            <Row>
              <Col md={12}>
                <UserBets matchId={dragonTigerDetail?.id} />
              </Col>
              <Col>
                <div className="d-flex justify-content-start align-items-center mt-2" style={{ position: "relative",height:"42px",backgroundColor:"#ffc742b3" }}>
                  <span className="title-14 f-bold text-white ms-1">Rules</span>
                </div>
                <div className="table-responsive rules-table p-2">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th colSpan={2} className="box-10 text-center">
                          Pair Plus
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rules.map((item, index) => (
                        <tr key={index}>
                          <td className="box-7 title-14">{item.label}</td>
                          <td className="box-3 title-14">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <RulesModal show={show} setShow={setShow} rule={tprules} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default TeentPatti2020Component;
