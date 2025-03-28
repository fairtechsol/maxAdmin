import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { crick20rules } from "../../../../assets";
import { handleRoundId } from "../../../../helpers";
import { RootState } from "../../../../store/store";
import { cardGamesId, cardUrl } from "../../../../utils/Constants";
import CardResultBox from "../../../commonComponent/cardResultBox";
import RulesModal from "../../../commonComponent/rulesModal";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import UserBets from "../../../game/userBet";
import ScoreBox from "./scoreBox";
import "./style.scss";
import Teen20Result from "./teenCard";

interface ProfitLoss {
  pl: number;
  run: number | string;
}

const CricketMatch20Component = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [show, setShow] = useState(false);
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const [profitLossData, setProfitLossData] = useState<
    Record<string, ProfitLoss>
  >({});

  useEffect(() => {
    const handleScroll = () => {
      if (placeBetRef?.current && placeBetRef?.current?.offsetTop) {
        const sticky = placeBetRef?.current.offsetTop;
        setIsSticky(window.scrollY > sticky);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.cmatch20}`);
  }, []);

  useEffect(() => {
    if (
      dragonTigerDetail?.profitLoss?.[
        `${dragonTigerDetail?.videoInfo?.mid}_1_card`
      ]
    ) {
      const parsedData = JSON.parse(
        dragonTigerDetail.profitLoss[
          `${dragonTigerDetail.videoInfo.mid}_1_card`
        ]
      );
      setProfitLossData(parsedData);
    } else setProfitLossData({});
  }, [dragonTigerDetail]);

  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    CRICKET MATCH 20-20
                  </span>
                </div>
                <span>
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${handleRoundId(
                        dragonTigerDetail?.videoInfo?.mid
                      )}
                     
                      `
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
                  result={<Teen20Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                  profitLoss={profitLossData}
                />
              </div>
            </div>

            <div>
              <div className="teenPatti-table-container">
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#f7f7f7",
                  }}
                >
                  <div
                    style={{
                      width: "49%",
                      background: "#F2F2F2",
                      padding: "5px",
                      boxShadow: "0 0 3px #aaa",
                    }}
                  >
                    {dragonTigerDetail?.leftBoard?.map(
                      (item: any, index: any) => (
                        <div>
                          <ScoreBox
                            teamA="Team A"
                            teamAScore={`${dragonTigerDetail?.videoInfo?.C2}/${dragonTigerDetail?.videoInfo?.C3}`}
                            teamAOver={dragonTigerDetail?.videoInfo?.C4}
                            teamB="Team B"
                            teamBScore={`${dragonTigerDetail?.videoInfo?.C5}/${dragonTigerDetail?.videoInfo?.C6}`}
                            teamBOver={dragonTigerDetail?.videoInfo?.C7}
                            ballIconUrl={`https://versionobj.ecoassetsservice.com/v13/static/front/img/balls/cricket20/ball${
                              2 + index
                            }.png`}
                            backOdds={item.b1}
                            layOdds={item.l1}
                            item={item}
                            runs={
                              Object.keys(profitLossData).length > 0
                                ? profitLossData[String(2 + index)]?.run ?? 0
                                : 0
                            }
                          />
                        </div>
                      )
                    )}
                  </div>
                  <div
                    style={{
                      width: "49%",
                      background: "#F2F2F2",
                      padding: "5px",
                      boxShadow: "0 0 3px #aaa",
                    }}
                  >
                    {dragonTigerDetail?.rightBoard?.map(
                      (item: any, index: any) => (
                        <div>
                          <ScoreBox
                            teamA="Team A"
                            teamAScore={`${dragonTigerDetail?.videoInfo?.C2}/${dragonTigerDetail?.videoInfo?.C3}`}
                            teamAOver={dragonTigerDetail?.videoInfo?.C4}
                            teamB="Team B"
                            teamBScore={`${dragonTigerDetail?.videoInfo?.C5}/${dragonTigerDetail?.videoInfo?.C6}`}
                            teamBOver={dragonTigerDetail?.videoInfo?.C7}
                            ballIconUrl={`https://versionobj.ecoassetsservice.com/v13/static/front/img/balls/cricket20/ball${
                              7 + index
                            }.png`}
                            backOdds={item.b1}
                            layOdds={item.l1}
                            item={item}
                            runs={
                              Object.keys(profitLossData).length > 0
                                ? profitLossData[String(7 + index)]?.run ?? 0
                                : 0
                            }
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="ticker-container">
                  <div className="ticker-wrap">
                    <div
                      className="ticker-move"
                      style={{
                        color: "#097c93",
                        fontWeight: "700",
                        fontSize: "12px",
                      }}
                    >
                      {dragonTigerDetail?.videoInfo &&
                        dragonTigerDetail?.videoInfo.remark}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", marginTop: "10px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                  type={"cmatch20"}
                />
              </div>
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
                <UserBets />
              </Col>
              <Col>
                <RulesModal show={show} setShow={setShow} rule={crick20rules} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default CricketMatch20Component;
