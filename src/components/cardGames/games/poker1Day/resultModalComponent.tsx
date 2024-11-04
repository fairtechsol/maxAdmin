import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import Winner from "../../../commonComponent/trophyWinner";
import ResultBetList from "../../../commonComponent/resultBetList";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Poker1DayResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  const lastCards = resultCards?.slice(4, 9);
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "30%",
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
              <HandleCards card={resultCards?.[0]} />
              <HandleCards card={resultCards?.[1]} />
              {data?.result?.win === "11" && (
            <div className="casino-winner-icon mb-3">
            <Winner />
          </div>
          )}
            </div>
           
          </div>
        </div>
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
        <div className="casino-result-content-diveder"></div>
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
              <HandleCards card={resultCards?.[2]} />
              <HandleCards card={resultCards?.[3]} />
              {data?.result?.win === "21" && (
            <div className="casino-winner-icon mb-3">
            <Winner />
          </div>
          )}
            </div>
          </div>
         
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "end",
          right: "0px",
          position: "absolute",
          padding: "20px"
        }}
      >
        <div style={{ display: "flex"}}>
          <span className="title-18 f500 mb-4 ">Board</span>
          {lastCards?.map((item: any, index: number) => {
            return (
              <div
                style={{ display: "flex", flexDirection: "row", gap: "5px" }}
                key={index}
              >
                <HandleCards card={item} />
              </div>
            );
          })}
        </div>
      </div>
      {data?.bets?.count > 0 && (
        <div className="w-100 m-2">
          <ResultBetList
            bets={data?.bets?.rows ?? 12}
            total={data?.bets?.count}
          />
        </div>
      )}
    </Container>
  );
};

export default Poker1DayResultComponent;
