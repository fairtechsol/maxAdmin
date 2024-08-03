import { memo, useEffect } from "react";
import FlipClock from "./FlipClock";
import isMobile from "../../../utils/screenDimension";

const VideoFrame = ({ result, time, id, profitLoss }: any) => {
  useEffect(() => {
    const element = document.getElementById("middleView-playerDiv");
    if (element) {
      element.style.display = "none !important";
    }
  }, []);

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
            {result && (
              <div style={{ position: "absolute", zIndex: "999" }}>
                {result}
              </div>
            )}
            <div
              style={
                isMobile
                  ? { display: "flex", overflow: "hidden" }
                  : { position: "relative", width: "100%" }
              }
            >
              <iframe
                width="100%"
                height={isMobile ? "250px" : "380px"}
                src={id}
                referrerPolicy={"strict-origin-when-cross-origin"}
                allowFullScreen
              ></iframe>
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
