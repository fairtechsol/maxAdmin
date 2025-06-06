import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import ResultBetList from "../../../commonComponent/resultBetList";
import "./style.scss";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const CricketMatch20ResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  const playerA = resultCards?.filter(
    (_: any, index: number) => index % 2 === 0
  );

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="flex-row justify-content-around"
        style={{ display: "flex" }}
      >
        <div className="teen20resultCardContainer mb-3">
          <div
            className={
              "d-sm-flex flex-row justify-content-center align-items-center mb-2"
            }
          >
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={playerA?.[0]} />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "6px",
          boxShadow: "0 0 4px -1px",
          marginTop: "10px",
          width: "60%",
          marginBottom: "5px",
        }}
      >
        Run {data?.result?.win}
      </div>

      {data?.bets?.count > 0 && (
        <div className="w-100 m-2">
          <ResultBetList bets={data?.bets?.rows} total={data?.bets?.count} />
        </div>
      )}
    </Container>
  );
};

export default CricketMatch20ResultComponent;
