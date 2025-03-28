import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { club, diamond, heart, spade } from "../../../../assets";
import { formatNumber, handleRoundId } from "../../../../helpers";
import { RootState } from "../../../../store/store";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import CardResultBox from "../../../commonComponent/cardResultBox";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import UserBets from "../../../game/userBet";
import CasinoWarCard from "./casinoWarCard";
import "./style.scss";

const CasinoWarComponent = () => {
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  const [openDivIds, setOpenDivIds] = useState<string[]>([]);

  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };
  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    CASINO WAR
                  </span>
                </div>
                <span>
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${handleRoundId(
                        dragonTigerDetail?.videoInfo?.mid
                      )}|Min: ${
                        dragonTigerDetail?.players?.[0]?.[0]?.min ?? 0
                      }|Max: ${dragonTigerDetail?.players?.[0]?.[0]?.max ?? 0}`
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
                  result={<CasinoWarCard data={dragonTigerDetail?.videoInfo} />}
                  id={`${cardUrl}${cardGamesId.casinoWar}`}
                />
              </div>
            </div>
            <div style={{}}>
              <div className="teenPatti-table-container">
                <div
                  className="teenPatti-table-row"
                  style={{ lineHeight: 2, background: "fff" }}
                >
                  <div style={{ width: "40%" }}></div>
                  <div
                    style={{
                      width: "60%",

                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      className="teenPatti-table-item f12-b"
                      style={{ width: "16.7%", padding: "2px" }}
                    >
                      <HandleCards card={dragonTigerDetail?.videoInfo?.C1} />
                    </div>
                    <div
                      className="teenPatti-table-item"
                      style={{ width: "16.7%", padding: "2px" }}
                    >
                      <HandleCards card={dragonTigerDetail?.videoInfo?.C2} />
                    </div>
                    <div
                      className="teenPatti-table-item"
                      style={{ width: "16.7%", padding: "2px" }}
                    >
                      <HandleCards card={dragonTigerDetail?.videoInfo?.C3} />
                    </div>
                    <div
                      className="teenPatti-table-item"
                      style={{ width: "16.7%", padding: "2px" }}
                    >
                      <HandleCards card={dragonTigerDetail?.videoInfo?.C4} />
                    </div>
                    <div
                      className="teenPatti-table-item"
                      style={{ width: "16.7%" }}
                    >
                      <HandleCards card={dragonTigerDetail?.videoInfo?.C5} />
                    </div>
                    <div
                      className="teenPatti-table-item"
                      style={{ width: "16.7%", padding: "2px" }}
                    >
                      <HandleCards card={dragonTigerDetail?.videoInfo?.C6} />
                    </div>
                  </div>
                </div>

                <div className="teenPatti-table-row" style={{ lineHeight: 2 }}>
                  <div
                    style={{ width: "40%", border: "0.1px solid #fff" }}
                  ></div>
                  <div
                    style={{
                      width: "60%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      className="teenPatti-table-item f12-b"
                      style={{ width: "16.7%" }}
                    >
                      1
                    </div>
                    <div
                      className="teenPatti-table-item f12-b"
                      style={{ width: "16.7%" }}
                    >
                      2
                    </div>
                    <div
                      className="teenPatti-table-item f12-b"
                      style={{ width: "16.7%" }}
                    >
                      3
                    </div>
                    <div
                      className="teenPatti-table-item f12-b"
                      style={{ width: "16.7%" }}
                    >
                      4
                    </div>
                    <div
                      className="teenPatti-table-item f12-b"
                      style={{ width: "16.7%" }}
                    >
                      5
                    </div>
                    <div
                      className="teenPatti-table-item f12-b"
                      style={{ width: "16.7%" }}
                    >
                      6
                    </div>
                  </div>
                </div>

                {dragonTigerDetail?.players?.map((playerA: any, index: any) => {
                  return (
                    <div
                      key={playerA[0]?.nat.split(" ")[0]}
                      className="teenPatti-table-row"
                      style={{ lineHeight: 1 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "40%",
                          padding: "10px",
                          border: "0.1px solid #fff",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{ fontSize: "14px", fontWeight: "bolder" }}
                        >
                          {index !== 1 &&
                            index !== 2 &&
                            index !== 5 &&
                            index !== 6 &&
                            index !== 7 &&
                            index !== 8 && (
                              <span
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bolder",
                                }}
                              >
                                {playerA[0]?.nat.split(" ")[0]}
                              </span>
                            )}
                          {index === 1 && (
                            <>
                              <img
                                src={spade}
                                alt="Player 1 Image"
                                style={{
                                  width: "15px",
                                  height: "15px",
                                  marginRight: "5px",
                                }}
                              />
                              <img
                                src={club}
                                alt="Player 6 Image"
                                style={{
                                  width: "15px",
                                  height: "15px",
                                  marginLeft: "5px",
                                }}
                              />
                            </>
                          )}
                          {index === 2 && (
                            <>
                              <img
                                src={heart}
                                alt="Player 2 Image"
                                style={{
                                  width: "15px",
                                  height: "15px",
                                  marginRight: "5px",
                                }}
                              />
                              <img
                                src={diamond}
                                alt="Player 8 Image"
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  marginLeft: "5px",
                                }}
                              />
                            </>
                          )}
                          {index === 5 && (
                            <img
                              src={spade}
                              alt="Player 5 Image"
                              style={{ width: "15px", height: "15px" }}
                            />
                          )}
                          {index === 6 && (
                            <img
                              src={club}
                              alt="Player 6 Image"
                              style={{ width: "15px", height: "15px" }}
                            />
                          )}
                          {index === 7 && (
                            <img
                              src={heart}
                              alt="Player 7 Image"
                              style={{ width: "15px", height: "15px" }}
                            />
                          )}
                          {index === 8 && (
                            <img
                              src={diamond}
                              alt="Player 8 Image"
                              style={{ width: "18px", height: "18px" }}
                            />
                          )}
                        </span>

                        <span
                          onClick={() => toggleDiv(`demo${index}`)}
                          className="range-icon d-inline-block right-0"
                        >
                          <i className="fas fa-info-circle"></i>{" "}
                          <div
                            id={`demo${index}`}
                            className={`icon-range-dt1day collapse ${
                              openDivIds.includes(`demo${index}`) ? "show" : ""
                            }`}
                          >
                            R:<span>{parseFloat(playerA?.[0]?.min)}</span>-
                            <span>{formatNumber(playerA?.[0]?.max)}</span>
                          </div>
                        </span>
                      </div>

                      <div
                        style={{
                          width: "60%",
                          backgroundColor: "#72bbef",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {playerA?.map((player: any, idx: any) => (
                          <div
                            key={player.sid}
                            className={`teenPatti-table-item ${
                              player.gstatus === "0" ? "locked" : ""
                            }`}
                            style={{ width: "16.7%" }}
                          >
                            <span className="f12-b">{player.b1}</span>
                            <span
                              className={`f600 title-14 color-red ${
                                dragonTigerDetail?.profitLoss
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                                    ]
                                    ? dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                                      ] > 0
                                      ? "color-green"
                                      : dragonTigerDetail?.profitLoss[
                                          `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                                        ] < 0
                                      ? "color-red"
                                      : ""
                                    : ""
                                  : ""
                              }`}
                              style={{
                                marginTop: player.gstatus === "0" ? "15px" : "",
                                zIndex: "100",
                              }}
                            >
                              {dragonTigerDetail?.profitLoss
                                ? dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                                  ]
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                                    ]
                                  : 0
                                : 0}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ width: "100%", marginTop: "10px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["R", "R", "R"]}
                  type={cardGamesType.casinoWar}
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
              <Col></Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default CasinoWarComponent;
