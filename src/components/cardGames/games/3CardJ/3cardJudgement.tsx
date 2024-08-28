import React from "react";
import { Row, Col } from "react-bootstrap";
import "./style.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HandleCards } from "../../../commonComponent/cardsComponent";

const CardJudgementResult: any = ({ data }: any) => {
  const elementsAndar = data?.aall?.split(",");
  const elementsBahar = data?.ball?.split(",");

  const sliderSettings = (length: any, arrow: any) => ({
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: arrow,
    initialSlide: length - 1,
    rtl: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  });

  return (
    data?.mid != "0" && (
      <div
        style={{
          width: "max-content",
          marginLeft: "10px",
          position: "absolute",
          top: "0",
          left: "0",
          background: "rgba(0, 0, 0, 0.4)",
          height: "auto",
          padding: "5px",
        }}
      >
        <Row>
          <Col xs={2} style={{ margin: "0px 0px 0px 10px" }}>
            <div
              style={{
                width: "110px",
              }}
            >
              {elementsAndar?.length > 0 && (
                <span
                  style={{
                    color: "#fff",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "start",
                    marginLeft: "-12px",
                    fontWeight: "600",
                  }}
                >
                  ANDAR
                </span>
              )}

              <div>
                {elementsAndar?.length > 3 ? (
                  <Slider
                    {...sliderSettings(
                      elementsAndar?.length,
                      elementsAndar?.length > 3
                    )}
                  >
                    {elementsAndar &&
                      elementsAndar?.map((item: any, index: any) => (
                        <div key={index}>
                          <HandleCards card={item !== "1" ? item : ""} />
                        </div>
                      ))}
                  </Slider>
                ) : (
                  <Row
                    style={{
                      gap: "10px",
                      marginTop: "0px",
                    }}
                  >
                    {elementsAndar &&
                      elementsAndar?.map((item: any, index: any) => {
                        return (
                          <React.Fragment key={index}>
                            <HandleCards card={item !== "1" ? item : ""} />
                          </React.Fragment>
                        );
                      })}
                  </Row>
                )}
              </div>
              {elementsBahar?.length > 0 && (
                <span
                  style={{
                    color: "#fff",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "start",
                    marginLeft: "-12px",
                    fontWeight: "600",
                  }}
                >
                  BAHAR
                </span>
              )}
              <div className="mt-2">
                {elementsBahar?.length > 3 ? (
                  <Slider
                    {...sliderSettings(
                      elementsBahar?.length,
                      elementsBahar?.length > 3
                    )}
                  >
                    {elementsBahar &&
                      elementsBahar?.map((item: any, index: any) => (
                        <div key={index}>
                          <HandleCards card={item !== "1" ? item : ""} />
                        </div>
                      ))}
                  </Slider>
                ) : (
                  <Row
                    style={{
                      gap: "10px",
                      marginTop: "5px",
                    }}
                  >
                    {elementsBahar &&
                      elementsBahar?.map((item: any, index: any) => {
                        return (
                          <React.Fragment key={index}>
                            <HandleCards card={item !== "1" ? item : ""} />
                          </React.Fragment>
                        );
                      })}
                  </Row>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
};

export default CardJudgementResult;
