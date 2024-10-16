import { memo, useEffect, useState } from "react";
import FlipClock from "./FlipClock";
import isMobile from "../../../utils/screenDimension";
import { Col, Row, Container } from "react-bootstrap";
import { handleRoundId } from "../../../helpers";
import { gameRulesComponents } from "../../../utils/Constants";

const VideoFrame = ({ result, time, id, profitLoss, data }: any) => {

  useEffect(() => {
    const element = document.getElementById("middleView-playerDiv");
    if (element) {
      element.style.display = "none !important";
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [currentGameRules, setCurrentGameRules] = useState<any>(null);

  const openModal = (game: string | null) => {
    if (game) {
      setCurrentGameRules(game);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentGameRules(null);
  };

  return (
    <>
      <div
        key="odds"
        style={{
          position: "relative",
          display: "flex",
          backgroundColor: "white",
          flexDirection: "column",
          marginTop: "0",
          alignSelf: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              backgroundColor: "black",
              position: "relative",
            }}
          >
            {" "}
            .
            {data?.type === "race20" || data?.type === "queen" ? (
              <div
                style={{ position: "absolute", zIndex: "99" }}
                className="casino-video-title"
              >
                <span className="casino-name">{data?.name}</span>
                <div className="casino-video-rid">
                  Round ID: {handleRoundId(data?.videoInfo?.mid)}
                </div>
              </div>
            ) : null}
            {result && (
              <div
                className={
                  data?.type === "race20" || data?.type === "queen"
                    ? "mt-5"
                    : ""
                }
                style={{
                  position: "absolute",
                  zIndex: "999",
                  right:
                    data?.type == "teen" || data?.type == "poker20"
                      ? "0px"
                      : "",
                  top:
                    data?.type == "teen" || data?.type == "poker20"
                      ? "55px"
                      : "",
                }}
              >
                {result}
              </div>
            )}
            <div
              style={{ zIndex: "99" }}
              className="casino-video-right-icons"
            >
              <div
                title="Rules"
                className="casino-video-rules-icon"
                onClick={() => openModal(data?.type)}
              >
                <i className="fas fa-info-circle title-24"></i>
              </div>
              </div>
              {showModal && (
                <div className="modal-new" >
                  <div className="rules-header-new"><div>Rules</div><span className="close-new" onClick={closeModal}>
                      &times;
                    </span></div>
                    
                    {currentGameRules && gameRulesComponents[currentGameRules]}
                  </div>
              )}
          
            <div>
              <Container className="p-0">
                <Row className="justify-content-md-center p-0">
                  <Col>
                    <div style={{ width: "100%", height: "480px" }}>
                      <iframe
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                        src={id}
                        referrerPolicy={"strict-origin-when-cross-origin"}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </Col>
                </Row>
              </Container>
              <ol
                style={{
                  background: "black",
                  opacity: "60%",
                  position: "absolute",
                  top: isMobile ? "10px" : "20px",
                  right: isMobile ? "30px" : "45px",
                  padding: profitLoss ? "10px" : "0px",
                }}
              >
                {profitLoss &&
                  Object.entries(profitLoss)?.map(([key, value]: any) => (
                    <li
                      key={key}
                      style={{
                        color: "#fff",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: isMobile ? "10px" : "16px",
                      }}
                    >
                      {key}
                      {"->"}{" "}
                      <span
                        style={{
                          color:
                            value.pl >= 0
                              ? "green"
                              : value.pl < 0
                              ? "red"
                              : "white",
                          textAlign: "end",
                          fontSize: isMobile ? "10px" : "16px",
                        }}
                      >
                        {value.pl}
                      </span>
                    </li>
                  ))}
              </ol>
            </div>
            {time && (
              <div
                style={{
                  position: "absolute",
                  right: isMobile ? "-82px" : "10px",
                  bottom: isMobile ? "8px" : "10px",
                  fontSize: isMobile ? "1.5rem" : "2.5em",
                  height: isMobile ? "2rem" : "",
                  width: isMobile ? "150px" : "",
                }}
              >
                <FlipClock value={time?.length === 1 ? "0" + time : time} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(VideoFrame);
