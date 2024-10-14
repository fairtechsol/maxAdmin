import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import UserBets from "../../../game/userBet";
import RulesModal from "../../../commonComponent/rulesModal";
import { tprules } from "../../../../assets";
import CardResultBox from "../../../commonComponent/cardResultBox";
import Teen1DResult from "./teenCard";
import { handleRoundId } from "../../../../helpers";
import { RootState } from "../../../../store/store";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import BackLay from "./backLay";

const TeentPatti1DComponent = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  const rules = [
    { label: "Pair (Double)", value: "1 To 1" },
    { label: "Flush (Color)", value: "1 To 4" },
    { label: "Straight (Rown)", value: "1 To 6" },
    { label: "Trio (Teen)", value: "1 To 35" },
    { label: "Straight Flush (Pakki Rown)", value: "1 To 45" },
  ];

  // const updatedValue = (value: any) => {
  //   let parsedValue = parseFloat(value) * 0.01;
  //   if (parsedValue !== 0) {
  //     parsedValue += 1;
  //   }
  //   return parsedValue.toFixed(2);
  // };
// console.log('dragonTigerDetail',dragonTigerDetail);
  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div style={{ height: "60%" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    1 DAY TEEN PATTI
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
                  height: "90%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.lasttime}
                  result={<Teen1DResult data={dragonTigerDetail?.videoInfo} />}
                  id={`${cardUrl}${cardGamesId.teenOneDay}`}
                />
              </div>
            </div>
            <div className="w-100">
              <div className="w-100 d-flex flex-row mt-3" style={{gap:"10px"}}>
              <div className="w-50">
                  <BackLay data={dragonTigerDetail} odds={dragonTigerDetail?.playerA} />
              </div>
              <div style={{width:"2px",backgroundColor:"#333"}}></div>
              <div className="w-50">
                  <BackLay data={dragonTigerDetail} odds={dragonTigerDetail?.playerB} />
              </div>
              </div>
              
              <div style={{ width: "100%", marginTop: "10px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["A", "B", "T"]}
                  type={cardGamesType.teenOneDay}
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
              <Col>
                <div className="casino-title" style={{ position: "relative" }}>
                  <span>Rules</span>
                </div>
                <div className="table-responsive rules-table lh-1">
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
                          <td className="box-7">{item.label}</td>
                          <td className="box-3">{item.value}</td>
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
    </>
  );
};

export default TeentPatti1DComponent;
