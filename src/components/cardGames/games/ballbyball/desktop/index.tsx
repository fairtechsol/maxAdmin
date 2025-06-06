import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cardGamesId, cardUrl } from "../../../../../utils/Constants";
import CardResultBox from "../../../../commonComponent/cardResultBox";
import UserBets from "../../../../game/userBet";
import RulesModal from "../../../../commonComponent/rulesModal";
import VideoFrame from "../../../../commonComponent/videoFrame/VideoFrame";
import "./style.scss";
import { AppDispatch, RootState } from "../../../../../store/store";
import { resultDragonTiger } from "../../../../../store/actions/card/cardDetail";
const TeenPattiDesktop = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const [isSticky, setIsSticky] = useState(false);
  const [show, setShow] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );
  const [mid, setMid] = useState(false);
  const [curR, setCurR] = useState(null);
  const [isClick, setIsClick] = useState(false);
  const { resultData } = useSelector((state: RootState) => state.card);

  useEffect(() => {
    if (curR && isClick) {
      setTimeout(() => {
        setCurR(null);
        setIsClick(false);
        setMid(dragonTigerDetail?.videoInfo?.mid);
      }, 3000);
    }
  }, [curR]);

  useEffect(() => {
    if (mid && mid != dragonTigerDetail?.videoInfo?.mid) {
      dispatch(resultDragonTiger(mid));
      setIsClick(true);
    }
    if (!mid) {
      setMid(dragonTigerDetail?.videoInfo?.mid);
    }
  }, [dragonTigerDetail?.videoInfo?.mid]);

  useEffect(() => {
    if (Object.keys(resultData || {})?.length > 0 && mid) {
      setCurR(resultData);
    } else if (resultData) {
      setTimeout(() => {
        dispatch(resultDragonTiger(mid));
      }, 1000);
    }
  }, [resultData]);

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
    const resetTimer = () => {
      setLastActivityTime(Date.now());
    };

    const checkInactivity = () => {
      if (Date.now() - lastActivityTime > 5 * 60 * 1000) {
        setShowInactivityModal(true);
        setVideoFrameId("");
      }
    };

    const activityEvents = ["mousemove", "keydown", "scroll", "click"];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    const intervalId = setInterval(checkInactivity, 1000);

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearInterval(intervalId);
    };
  }, [lastActivityTime, showInactivityModal]);

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.ballbyball}`);
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
                    BallbyBall
                  </span>
                </div>
                <span>
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${dragonTigerDetail?.videoInfo?.mid}`
                    : ""}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "90%",
                  backgroundColor: "#000",
                  position: "relative",
                }}
              >
                {curR && (
                  <img
                    className="elem"
                    src={`https://versionobj.ecoassetsservice.com/v13/static/front/img/balls/cricket20/ball${resultData?.result?.desc.split(" ")[0]}.png`}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -100%)",
                      zIndex: 2,
                    }}
                    alt="Centered Image"
                  />
              )}

                <VideoFrame
                  time={JSON.stringify(dragonTigerDetail?.videoInfo?.lt)}
                  id={videoFrameId}
                  data={dragonTigerDetail}
                />
              </div>
            </div>
      
              <div style={{paddingTop:"5px"}}>
                <div
                  style={{
                    background: "rgb(255 199 66 / 85%)",
                    color: "#fff",
                    fontWeight: "bold",
                    
                  }}
                >
                  <span style={{ marginLeft: "10px",fontSize:"14px" }}> Runs</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    justifyContent: "space-between",
                    borderBottom: "0.01em solid #c7c8ca",
                    lineHeight: 2,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "32%",

                      borderBottom: "0.01em solid #c7c8ca",
                      background: "#f2f2f2",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        //border: "0.1px solid #fff",
                        fontSize: "14px",
                        marginLeft: "3px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "30%",
                        backgroundColor: "#72bbef",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      Back
                    </div>
                    <div
                      style={{
                        width: "30%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "#097c93",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "32%",

                      borderBottom: "0.01em solid #c7c8ca",
                      background: "#f2f2f2",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "14px",
                        marginLeft: "3px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "30%",
                        backgroundColor: "#72bbef",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      Back
                    </div>
                    <div
                      style={{
                        width: "30%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "#097c93",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "32%",

                      borderBottom: "0.01em solid #c7c8ca",
                      background: "#f2f2f2",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "14px",
                        marginLeft: "3px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "30%",
                        backgroundColor: "#72bbef",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      Back
                    </div>
                    <div
                      style={{
                        width: "30%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "#097c93",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  style={{
                    lineHeight: 1.8,
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {dragonTigerDetail?.runs?.map((item: any) => (
                    <div
                      style={{
                        display: "flex",
                        width: "32%",

                        borderBottom: "0.01em solid #c7c8ca",
                        background: "#f2f2f2",
                      }}
                      key={item.sid}
                    >
                      <div
                        style={{
                          width: "40%",

                          marginLeft: "3px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          {item.nat}
                        </div>
                        <span
                          className={`title-12 f600 ${
                            dragonTigerDetail?.profitLoss
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${item?.sid}_card`
                                ]
                                ? dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${item?.sid}_card`
                                  ] > 0
                                  ? "color-green"
                                  : dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${item?.sid}_card`
                                    ] < 0
                                  ? "color-red"
                                  : ""
                                : ""
                              : ""
                          }`}
                          style={{ zIndex: "100" }}
                        >
                          {dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${item?.sid}_card`
                              ]
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${item?.sid}_card`
                                ]
                              : "0"
                            : "0"}
                        </span>
                      </div>
                      <div
                        style={{
                          width: "30%",
                          backgroundColor: "#72bbef",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "12px",
                        }}
                        className={
                          dragonTigerDetail?.runs?.[0]?.gstatus === "SUSPENDED" &&
                          dragonTigerDetail?.runs?.[0]?.b === 0
                            ? "suspended"
                            : "teenPatti-table-item"
                        }
                      >
                        <span className="f12-b">{item.b}</span>
                        <span className="f10-b">{item.bs}</span>
                      </div>
                      <div
                        style={{
                          width: "30%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "end",
                          color: "#333",
                          fontSize: "12px",
                          fontWeight: "bold",
                         paddingRight: "5px"
                        }}
                      >
                        <span>Min:{item.min}</span>
                        <span>Max:{item.max}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <div
                    style={{
                      width: "10%",
                      background: "#ffffff",
                      lineHeight: 2,
                    }}
                  >
                    <img
                      src="https://versionobj.ecoassetsservice.com/v15/static/front/img/icons/remark.png"
                      style={{
                        marginLeft: "20px",
                        height: "20px",
                        boxShadow: "none",
                        background: "#ffffff",
                      }}
                    ></img>
                  </div> */}

                  <div
                    className="ticker-container"
                    style={{
                      width: "100%",

                      background: "#ffffff",
                      border: "#086f3f",
                      lineHeight: 2.7,
                    }}
                  >
                    <div
                      className="ticker-wrap"
                      style={{ border: "#086f3f", height: "100%" }}
                    >
                      <div
                        className="ticker-move"
                        style={{
                          color: "#17a2b8",
                          width: "100%",
                          fontSize: "12px",
                          border: "#086f3f",
                          height: "100%",
                        }}
                      >
                       {dragonTigerDetail?.videoInfo?.remark}
                        
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ width: "100%", marginTop: "10px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["R", "R", "R"]}
                    type={"ballbyball"}
                  />
                </div>
              </div>
     
          </div>
        </Col>
        <Col md={4} className="p-0">
          <Container className="p-0" fluid ref={placeBetRef}>
            <Row
              className={` ${isSticky ? "position-fixed top-0" : ""}`}
              style={{
                width: isSticky
                  ? placeBetRef.current?.offsetWidth + "px"
                  : "100%",
              }}
            >
              <Col className="p-1 pt-0" md={12}>
              <UserBets matchId={dragonTigerDetail?.id} />
              </Col>
              <RulesModal show={show} setShow={setShow} />
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default TeenPattiDesktop;
