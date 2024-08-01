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

  const updatedValue = (value: any) => {
    let parsedValue = parseFloat(value) * 0.01;
    if (parsedValue !== 0) {
      parsedValue += 1;
    }
    return parsedValue.toFixed(2);
  };

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
            <div style={{ height: "40%" }}>
              <div
                className="teenPatti-table-container"
                style={{ marginTop: "1px" }}
              >
                <div className="teenPatti-table-row" style={{ lineHeight: 2 }}>
                  <div
                    style={{ width: "60%", border: "0.1px solid #fff" }}
                  ></div>
                  <div
                    style={{
                      width: "40%",
                      backgroundColor: "#72bbef",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      className="teenPatti-table-item fw-bold f16-b fs-12 fs-sm-14 fs-md-16 fs-lg-18"
                      style={{ width: "50%" }}
                    >
                      BACK
                    </div>
                    <div
                      className="teenPatti-table-item fw-bold f16-b fs-12 fs-sm-14 fs-md-16 fs-lg-18"
                      style={{ width: "50%", background: "#f9c9d4" }}
                    >
                      LAY
                    </div>
                  </div>
                </div>
                <div className="teenPatti-table-row" style={{ lineHeight: 1 }}>
                  <div
                    style={{
                      width: "60%",
                      padding: "10px",
                      border: "0.1px solid #fff",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
                      {dragonTigerDetail?.playerA?.[0]?.nat}
                    </span>
                    <span
                      className={
                        dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${dragonTigerDetail?.playerA?.[0]?.sid}_card`
                            ]
                            ? JSON.parse(
                                dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${dragonTigerDetail?.playerA?.[0]?.sid}_card`
                                ]
                              )["playera"] > 0
                              ? "color-green"
                              : JSON.parse(
                                  dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${dragonTigerDetail?.playerA?.[0]?.sid}_card`
                                  ]
                                )["playera"] < 0
                              ? "color-red"
                              : ""
                            : ""
                          : ""
                      }
                    >
                      {dragonTigerDetail?.profitLoss
                        ? dragonTigerDetail?.profitLoss[
                            `${dragonTigerDetail?.videoInfo?.mid}_${dragonTigerDetail?.playerA?.[0]?.sid}_card`
                          ]
                          ? JSON.parse(
                              dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${dragonTigerDetail?.playerA?.[0]?.sid}_card`
                              ]
                            )["playera"]
                          : 0
                        : 0}
                    </span>
                  </div>
                  <div
                    className={
                      dragonTigerDetail?.playerA?.[0]?.gstatus === "SUSPENDED"
                        ? "suspended"
                        : ""
                    }
                    style={{
                      width: "40%",
                      backgroundColor: "#72bbef",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      className="teenPatti-table-item"
                      style={{ width: "50%" }}
                    >
                      <span className="f12-b">
                        {updatedValue(dragonTigerDetail?.playerA?.[0]?.b1)}
                      </span>
                      <span className="f10-b">
                        {dragonTigerDetail?.playerA?.[0]?.bs1}
                      </span>
                    </div>
                    <div
                      className={`teenPatti-table-item ${
                        // dragonTigerDetail?.playerA?.[0]?.gstatus === "SUSPENDED"
                        //   ? "suspended"
                        //   : ""
                        ""
                      }`}
                      style={{ width: "50%", background: "#f9c9d4" }}
                    >
                      <span className="f12-b">
                        {updatedValue(dragonTigerDetail?.playerA?.[0]?.l1)}
                      </span>
                      <span className="f10-b">
                        {dragonTigerDetail?.playerA?.[0]?.ls1}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="teenPatti-table-row" style={{ lineHeight: 1 }}>
                  <div
                    style={{
                      width: "60%",
                      padding: "10px",
                      border: "0.1px solid #fff",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
                      {dragonTigerDetail?.playerB?.[0]?.nat}
                    </span>
                    <span
                      className={
                        dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${dragonTigerDetail?.playerA?.[0]?.sid}_card`
                            ]
                            ? JSON.parse(
                                dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${dragonTigerDetail?.playerA?.[0]?.sid}_card`
                                ]
                              )["playerb"] > 0
                              ? "color-green"
                              : JSON.parse(
                                  dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${dragonTigerDetail?.playerA?.[0]?.sid}_card`
                                  ]
                                )["playerb"] < 0
                              ? "color-red"
                              : ""
                            : ""
                          : ""
                      }
                    >
                      {dragonTigerDetail?.profitLoss
                        ? dragonTigerDetail?.profitLoss[
                            `${dragonTigerDetail?.videoInfo?.mid}_${dragonTigerDetail?.playerA?.[0]?.sid}_card`
                          ]
                          ? JSON.parse(
                              dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${dragonTigerDetail?.playerA?.[0]?.sid}_card`
                              ]
                            )["playerb"]
                          : 0
                        : 0}
                    </span>
                  </div>
                  <div
                    className={
                      dragonTigerDetail?.playerB?.[0]?.gstatus === "SUSPENDED"
                        ? "suspended"
                        : ""
                    }
                    style={{
                      width: "40%",
                      backgroundColor: "#72bbef",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      className="teenPatti-table-item"
                      style={{ width: "50%" }}
                    >
                      <span className="f12-b">
                        {updatedValue(dragonTigerDetail?.playerB?.[0]?.b1)}
                      </span>
                      <span className="f10-b">
                        {dragonTigerDetail?.playerB?.[0]?.bs1}
                      </span>
                    </div>
                    <div
                      className={`teenPatti-table-item ${
                        // dragonTigerDetail?.playerB?.[0]?.gstatus != "0" &&
                        // dragonTigerDetail?.playerB?.[1]?.gstatus === "0"
                        //   ? "suspended"
                        //   : ""
                        ""
                      }`}
                      style={{ width: "50%", background: "#f9c9d4" }}
                    >
                      <span className="f12-b">
                        {updatedValue(dragonTigerDetail?.playerB?.[0]?.l1)}
                      </span>

                      <span className="f10-b">
                        {dragonTigerDetail?.playerB?.[0]?.ls1}
                      </span>
                    </div>
                  </div>
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
                <div className="table-responsive rules-table">
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
