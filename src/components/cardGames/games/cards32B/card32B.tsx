import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";

const Card32BResult: any = ({ data }: any) => {
  const elements = data?.desc?.split(",");

  let result: string[][] = [[], [], [], []];
  if (elements) {
    elements?.forEach((item: any, index: any) => {
      const targetArray = index % 4;
      result[targetArray].push(item);
    });
  }

  const allKeys = Object.keys(data ? data : 0);
  const cArray = allKeys?.filter((key) => /^C\d+$/.test(key));
  const numbers = cArray.map((key) => Number(data[key]));
  const max = Math.max(...numbers);
  return (
    data?.mid != "0" && (
      <Container>
        {result?.[0]?.[0] !== "1" && (
          <Row>
            <Col>
              <span
                style={{
                  color:
                    max === parseInt(data?.C1) && max != 0 ? "#04d373" : "#fff",
                  fontWeight: "600",
                  backgroundColor: "#696767e6",
                }}
              >
                {parseInt(data?.C1) > 0 ? (
                  <>
                    Player 8:{" "}
                    <span style={{ color: "#FFC107" }}>{data?.C1}</span>
                  </>
                ) : (
                  ""
                )}
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {result?.[0]?.map((item: any) => {
                  return <HandleCards card={item != "1" ? item : ""} />;
                })}
              </div>
            </Col>
          </Row>
        )}
        {result?.[1]?.[0] !== "1" && (
          <Row>
            <Col>
              <span
                style={{
                  color:
                    max === parseInt(data?.C2) && max != 0 ? "#04d373" : "#fff",
                  fontWeight: "600",
                  backgroundColor: "#696767e6",
                }}
              >
                {parseInt(data?.C1) > 0 ? (
                  <>
                    Player 9:{" "}
                    <span style={{ color: "#FFC107" }}>{data?.C2}</span>
                  </>
                ) : (
                  ""
                )}
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {result?.[1]?.map((item: any) => {
                  return <HandleCards card={item != "1" ? item : ""} />;
                })}
              </div>
            </Col>
          </Row>
        )}
        {result?.[2]?.[0] !== "1" && (
          <Row>
            <Col>
              <span
                style={{
                  color:
                    max === parseInt(data?.C3) && max != 0 ? "#04d373" : "#fff",
                  fontWeight: "600",
                  backgroundColor: "#696767e6",
                }}
              >
                {parseInt(data?.C1) > 0 ? (
                  <>
                    Player 10:
                    <span style={{ color: "#FFC107" }}>{data?.C3}</span>
                  </>
                ) : (
                  ""
                )}
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {result?.[2]?.map((item: any) => {
                  return <HandleCards card={item != "1" ? item : ""} />;
                })}
              </div>
            </Col>
          </Row>
        )}
        {result?.[3]?.[0] !== "1" && (
          <Row>
            <Col>
              <span
                style={{
                  color:
                    max === parseInt(data?.C4) && max != 0 ? "#04d373" : "#fff",
                  fontWeight: "600",
                  backgroundColor: "#696767e6",
                }}
              >
                {parseInt(data?.C1) > 0 ? (
                  <>
                    Player 11:
                    <span style={{ color: "#FFC107" }}>{data?.C4}</span>
                  </>
                ) : (
                  ""
                )}
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {result?.[3]?.map((item: any) => {
                  return <HandleCards card={item != "1" ? item : ""} />;
                })}
              </div>
            </Col>
          </Row>
        )}
      </Container>
    )
  );
};

export default Card32BResult;
