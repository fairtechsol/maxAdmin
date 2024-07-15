import React from "react";
import { Container } from "react-bootstrap";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const SuperOverResultComponent: React.FC<Props> = ({ data }: any) => {
  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="mb-2"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>
          {data?.result?.desc} | Winner :
          {data?.result?.win === "1"
            ? " ENG"
            : data?.result?.win === "0"
            ? " TIE"
            : " RSA"}
        </span>
      </div>
    </Container>
  );
};

export default SuperOverResultComponent;
