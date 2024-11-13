import React from "react";
import { Container } from "react-bootstrap";
import ResultBetList from "../../../commonComponent/resultBetList";
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

      {data?.bets?.count > 0 && (
        <div className="w-100 m-2">
          <ResultBetList bets={data?.bets?.rows} total={data?.bets?.count} />
        </div>
      )}
    </Container>
  );
};

export default SuperOverResultComponent;
