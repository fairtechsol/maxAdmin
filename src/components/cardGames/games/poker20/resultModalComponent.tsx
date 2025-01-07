import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import ResultBetList from "../../../commonComponent/resultBetList";
import Winner from "../../../commonComponent/trophyWinner";
import "./style.scss";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Poker20ResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  const lastCards = resultCards?.slice(4, 9);

  return (
    <Container
      style={{
        display: "flex",
        // flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
      className="d-flex flex-column flex-lg-row gap-4 gap-lg-0"
    >
      <div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="title-18 f500">Player A</span>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              {data?.result?.win === "11" && (
                <div className="casino-winner-icon me-5">
                  <Winner />
                </div>
              )}
              <HandleCards card={resultCards?.[0]} />
              <HandleCards card={resultCards?.[1]} />
            </div>
          </div>
        </div>
        <div className="casino-result-content-diveder"></div>
        {data?.result?.win === "0" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span className="title-18 f500">Tie</span>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="title-18 f500">Player B</span>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              {data?.result?.win === "21" && (
                <div className="casino-winner-icon me-5">
                  <Winner />
                </div>
              )}
              <HandleCards card={resultCards?.[2]} />
              <HandleCards card={resultCards?.[3]} />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "0px",
          flexWrap: "wrap",
        }}
        className="d-flex flex-column flex-lg-row"
      >
        <div
          style={{
            width: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            marginBottom: "0px",
            flexDirection: "column",
          }}
        >
          <span className="title-18 f500">Board</span>
          <div style={{ display: "flex" }}>
            {lastCards?.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <HandleCards card={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="casino-result-desc w-lg-[15%] w-[70%]">
        <span style={{ opacity: "0.6" }}>Main:</span>
        <span>{data?.result?.desc?.split("##")[0]}</span>
      </div>

      {data?.bets?.count > 0 && (
        <div className="w-100 m-2">
          <ResultBetList bets={data?.bets?.rows} total={data?.bets?.count} />
        </div>
      )}
    </Container>
  );
};

export default Poker20ResultComponent;
