import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import InactivityModal from "../../../commonComponent/cards/userInactivityModal";
import UserBets from "../../../game/userBet";
import { dtrules } from "../../../../assets";
import RulesModal from "../../../commonComponent/rulesModal";
import CardResultBox from "../../../commonComponent/cardResultBox";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import Dragon20Result from "./dragonCard";
import { handleRoundId } from "../../../../helpers";
import { RootState } from "../../../../store/store";
import { cardGamesId, cardUrl } from "../../../../utils/Constants";
import TiePairBox from "./TiePairBox";
import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";

const DragonSecond20Component = () => {
  const [show, setShow] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId.dragonTiger202}`
  );
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  const handleClose = () => {
    setShowInactivityModal(false);
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

  return (
    <div>
      <Row>
        <Col md={8}>
          <div style={{ width: "100%", height: "400px", margin: "5px" }}>
            <div className="horseRacingTabHeader">
              <div>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  {dragonTigerDetail?.name}
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
                    )}`
                  : ""}
              </span>
            </div>
            <div
              style={{ width: "100%", height: "92%", backgroundColor: "#000" }}
            >
              <VideoFrame
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Dragon20Result data={dragonTigerDetail?.videoInfo} />}
                id={videoFrameId}
              />
            </div>
          </div>
          <div style={{ height: "760px" }}>
            <div style={{ width: "100%", margin: "4% 5px" }}>
              <TiePairBox
                tiePair={dragonTigerDetail?.tiePair}
                data={dragonTigerDetail}
              />
            </div>
            <div
              style={{
                width: "100%",
                margin: "5px",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              <OddEven
                name={"DRAGON"}
                odds={dragonTigerDetail?.dragonOdds}
                data={dragonTigerDetail}
              />
              <OddEven
                name={"TIGER"}
                odds={dragonTigerDetail?.tigerOdds}
                data={dragonTigerDetail}
              />
            </div>
            <div
              style={{
                width: "100%",
                margin: "5px",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              <CardBox
                name={"DRAGON"}
                cardData={dragonTigerDetail?.dragonCards}
                data={dragonTigerDetail}
              />
              <CardBox
                name={"TIGER"}
                cardData={dragonTigerDetail?.tigerCards}
                data={dragonTigerDetail}
              />
            </div>
            <div style={{ width: "100%", margin: "5px" }}>
              <CardResultBox data={dragonTigerDetail} name={["D", "T"]} />
            </div>
          </div>

          <RulesModal show={show} setShow={setShow} rule={dtrules} />
        </Col>
        <Col md={4}>
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
            </Row>
          </Container>
        </Col>
      </Row>
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </div>
  );
};

export default DragonSecond20Component;
