import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import { cardGamesId, cardUrl } from "../../../../utils/Constants";
import { RootState } from "../../../../store/store";
import { formatNumber, handleRoundId } from "../../../../helpers";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import CardResultBox from "../../../commonComponent/cardResultBox";
import UserBets from "../../../game/userBet";
import RulesModal from "../../../commonComponent/rulesModal";
import { tprules } from "../../../../assets";
import TeenTestResult from "./teenCard";
import OddsRateBox from "./oddsRateBox";
// import TableItemList from "./tableItemList";

const TeenPattiComponent = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [show, setShow] = useState(false);
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  const [openDivIds, setOpenDivIds] = useState<string[]>([]);

  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };

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

  const rules = [
    { label: "Pair (Double)", value: "1 To 1" },
    { label: "Flush (Color)", value: "1 To 4" },
    { label: "Straight (Rown)", value: "1 To 6" },
    { label: "Trio (Teen)", value: "1 To 35" },
    { label: "Straight Flush (Pakki Rown)", value: "1 To 45" },
  ];

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.teenTest}`);
  }, []);

  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div style={{ marginBottom: ".30px" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    TEST TEENPATTI
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
                  data={dragonTigerDetail}
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={
                    <TeenTestResult data={dragonTigerDetail?.videoInfo} />
                  }
                  id={videoFrameId}
                />
              </div>
            </div>
            <div className="casino-detail">
              <div className="teen1daycasino-container">
                <div className="teentestother">
                  <div className="casino-box-row">
                    <div className="casino-nation-name"></div>
                    {dragonTigerDetail?.sections &&
                      dragonTigerDetail?.sections.map(
                        (section: any, index: any) => (
                          <div key={index} className="casino-bl-box">
                            <div className="casino-bl-box-item">
                              <b>{section?.nation}</b>
                              <div className="float-end">
                                <i
                                  className="fas fa-info-circle float-end"
                                  onClick={() => toggleDiv(index)}
                                ></i>
                                <div
                                  id="demo0"
                                  className={`icon-range collapse ${
                                    openDivIds.includes(index) ? "show" : ""
                                  }`}
                                >
                                  R:
                                  <span>
                                    {dragonTigerDetail?.videoInfo?.min}
                                  </span>
                                  -
                                  <span>
                                    {formatNumber(
                                      dragonTigerDetail?.videoInfo?.max
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                  <div className="casino-box-row mb-4">
                    <div className="casino-nation-name casino-nation-name-bg">
                      <b>Tiger</b>
                    </div>
                    {dragonTigerDetail?.sections &&
                      dragonTigerDetail?.sections.map(
                        (section: any, index: any) => (
                          <OddsRateBox
                            key={index}
                            status={section?.tstatus}
                            rate={section?.trate}
                            profitLoss={
                              dragonTigerDetail?.profitLoss?.[
                                `${section?.mid}_${section?.tsection}_card`
                              ]
                            }
                          />
                        )
                      )}
                  </div>
                  <div className="casino-box-row mb-4">
                    <div className="casino-nation-name casino-nation-name-bg">
                      <b>Lion</b>
                    </div>
                    {dragonTigerDetail?.sections &&
                      dragonTigerDetail?.sections.map(
                        (section: any, index: any) => (
                          <OddsRateBox
                            key={index}
                            status={section?.lstatus}
                            rate={section?.lrate}
                            profitLoss={
                              dragonTigerDetail?.profitLoss?.[
                                `${section?.mid}_${section?.lsection}_card`
                              ]
                            }
                          />
                        )
                      )}
                  </div>
                  <div className="casino-box-row mb-4">
                    <div className="casino-nation-name casino-nation-name-bg">
                      <b>Dragon</b>
                    </div>
                    {dragonTigerDetail?.sections &&
                      dragonTigerDetail?.sections.map(
                        (section: any, index: any) => (
                          <OddsRateBox
                            key={index}
                            status={section?.dstatus}
                            rate={section?.drate}
                            profitLoss={
                              dragonTigerDetail?.profitLoss?.[
                                `${section?.mid}_${section?.dsectionid}_card`
                              ]
                            }
                          />
                        )
                      )}
                  </div>
                  
                </div>
              </div>
              <div style={{ width: "100%", marginTop: "10px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["D", "T", "L"]}
                  type={"teen9"}
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
                <div
                  className="casino-title mt-2"
                  style={{ position: "relative" }}
                >
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

export default TeenPattiComponent;
