import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Table } from "react-bootstrap";
import RulesModal from "../../../commonComponent/rulesModal";
import { tprules } from "../../../../assets";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { handleRoundId } from "../../../../helpers";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import { cardGamesId, cardUrl } from "../../../../utils/Constants";
import Teen20Result from "./teenCard";
import CardResultBox from "../../../commonComponent/cardResultBox";
import UserBets from "../../../game/userBet";
import "./style.scss";

const TeentPatti2020Component = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky] = useState(false);
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const { playerA, playerB } = dragonTigerDetail;

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
            <div style={{ height: "400px", marginBottom: ".30px" }}>
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
                  height: "90%",
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
              className="teenPatti-table-container"
              // style={{ height: "350px" }}
            >
              <div className="teenPatti-table-row">
                <div style={{ width: "50%", border: "0.1px solid #fff" }}></div>
                <div
                  style={{
                    width: "50%",
                    backgroundColor: "#72bbef",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div
                    className="teenPatti-table-item f12-b"
                    style={{ width: "40%" }}
                  >
                    BACK
                  </div>
                  <div
                    className="teenPatti-table-item"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
              <div className="teenPatti-table-row" style={{ lineHeight: 1 }}>
                <div
                  style={{
                    width: "50%",
                    padding: "10px",
                    border: "0.1px solid #fff",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
                    {playerA?.[0]?.nat}
                  </span>
                </div>
                <div
                  className={
                    playerA?.[0]?.gstatus === "0" &&
                    playerA?.[1]?.gstatus === "0"
                      ? "suspended"
                      : ""
                  }
                  style={{
                    width: "50%",
                    backgroundColor: "#72bbef",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div
                    className="teenPatti-table-item"
                    style={{ width: "40%" }}
                  >
                    <span className="f12-b">{playerA?.[0]?.rate}</span>
                    <span
                      className={`f10-b ${
                        dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sid}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sid}_card`
                              ] > 0
                              ? "color-green"
                              : dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sid}_card`
                                ] < 0
                              ? "color-red"
                              : ""
                            : ""
                          : ""
                      }`}
                    >
                      {dragonTigerDetail?.profitLoss
                        ? dragonTigerDetail?.profitLoss[
                            `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sid}_card`
                          ]
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sid}_card`
                            ]
                          : 0
                        : 0}
                    </span>
                  </div>
                  <div
                    className={`teenPatti-table-item ${
                      playerA?.[0]?.gstatus !== "0" &&
                      playerA?.[1]?.gstatus === "0"
                        ? "suspended"
                        : ""
                    }`}
                    style={{ width: "60%" }}
                  >
                    <span className="f12-b">{playerA?.[1]?.nat}</span>
                    <span
                      className={`f10-b ${
                        dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[1]?.sid}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[1]?.sid}_card`
                              ] > 0
                              ? "color-green"
                              : dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[1]?.sid}_card`
                                ] < 0
                              ? "color-red"
                              : ""
                            : ""
                          : ""
                      }`}
                    >
                      {dragonTigerDetail?.profitLoss
                        ? dragonTigerDetail?.profitLoss[
                            `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[1]?.sid}_card`
                          ]
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[1]?.sid}_card`
                            ]
                          : 0
                        : 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="teenPatti-table-row" style={{ lineHeight: 1 }}>
                <div
                  style={{
                    width: "50%",
                    padding: "10px",
                    border: "0.1px solid #fff",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
                    {playerB?.[0]?.nat}
                  </span>
                </div>
                <div
                  className={
                    playerB?.[0]?.gstatus === "0" &&
                    playerB?.[1]?.gstatus === "0"
                      ? "suspended"
                      : ""
                  }
                  style={{
                    width: "50%",
                    backgroundColor: "#72bbef",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div
                    className="teenPatti-table-item"
                    style={{ width: "40%" }}
                  >
                    <span className="f12-b">{playerB?.[0]?.rate}</span>
                    <span
                      className={`f10-b ${
                        dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[0]?.sid}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[0]?.sid}_card`
                              ] > 0
                              ? "color-green"
                              : dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[0]?.sid}_card`
                                ] < 0
                              ? "color-red"
                              : ""
                            : ""
                          : ""
                      }`}
                    >
                      {dragonTigerDetail?.profitLoss
                        ? dragonTigerDetail?.profitLoss[
                            `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[0]?.sid}_card`
                          ]
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[0]?.sid}_card`
                            ]
                          : 0
                        : 0}
                    </span>
                  </div>
                  <div
                    className={`teenPatti-table-item ${
                      playerB?.[0]?.gstatus !== "0" &&
                      playerB?.[1]?.gstatus === "0"
                        ? "suspended"
                        : ""
                    }`}
                    style={{ width: "60%" }}
                  >
                    <span className="f12-b">{playerB?.[1]?.nat}</span>
                    <span
                      className={`f10-b ${
                        dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[1]?.sid}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[1]?.sid}_card`
                              ] > 0
                              ? "color-green"
                              : dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[1]?.sid}_card`
                                ] < 0
                              ? "color-red"
                              : ""
                            : ""
                          : ""
                      }`}
                    >
                      {dragonTigerDetail?.profitLoss
                        ? dragonTigerDetail?.profitLoss[
                            `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[1]?.sid}_card`
                          ]
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[1]?.sid}_card`
                            ]
                          : 0
                        : 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "100%", marginTop: "10px" }}>
              <CardResultBox data={dragonTigerDetail} name={["A", "T", "B"]} />
            </div>
          </div>
        </Col>
        <Col md={4} className="ps-0">
          <Container className="p-0" fluid ref={placeBetRef}>
            <Row
              className={` ${isSticky ? "position-fixed top-0" : ""}`}
              style={{
                width: isSticky
                  ? placeBetRef.current?.offsetWidth + "px"
                  : "100%",
              }}
            >
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
    </div>
  );
};

export default TeentPatti2020Component;
