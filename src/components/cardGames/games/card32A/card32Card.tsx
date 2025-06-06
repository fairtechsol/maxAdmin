import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";

const Card32Result: any = ({ data }: any) => {
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
    data?.mid !== "0" && (
      <Container>
        <Row>
          <Col>
            <span
              style={{
                color:
                  max === parseInt(data?.C1) && max !== 0 ? "green" : "white",
              }}
            >
              {parseInt(data?.C1) > 0 ? "Player 8:" + data?.C1 : ""}
            </span>
            <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
              {result?.[0]?.map((item: any) => {
                return <HandleCards card={item !== "1" ? item : ""} />;
              })}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <span
              style={{
                color:
                  max === parseInt(data?.C2) && max !== 0 ? "green" : "white",
              }}
            >
              {parseInt(data?.C1) > 0 ? "Player 9:" + data?.C2 : ""}
            </span>
            <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
              {result?.[1]?.map((item: any) => {
                return <HandleCards card={item !== "1" ? item : ""} />;
              })}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <span
              style={{
                color:
                  max === parseInt(data?.C3) && max !== 0 ? "green" : "white",
              }}
            >
              {parseInt(data?.C1) > 0 ? "Player 10:" + data?.C3 : ""}
            </span>
            <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
              {result?.[2]?.map((item: any) => {
                return <HandleCards card={item !== "1" ? item : ""} />;
              })}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <span
              style={{
                color:
                  max === parseInt(data?.C4) && max !== 0 ? "green" : "white",
              }}
            >
              {parseInt(data?.C1) > 0 ? "Player 11:" + data?.C4 : ""}
            </span>
            <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
              {result?.[3]?.map((item: any) => {
                return <HandleCards card={item !== "1" ? item : ""} />;
              })}
            </div>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Card32Result;
