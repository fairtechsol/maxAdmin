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

const Poker6ResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  const lastCards = resultCards?.slice(12, 17);
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
          marginBottom: "10px",
        }}
      >
        <span className="title-18 f500">Board</span>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {lastCards?.map((item: any, index: number) => {
            return (
              <div key={index}>
                <HandleCards card={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <span className="title-18 f500"> 1</span>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <HandleCards card={resultCards?.[0]} />
              <HandleCards card={resultCards?.[6]} />
              {data?.result?.win === "11" && (
                <div className="casino-winner-icon">
                  <Winner />
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <span className="title-18 f500"> 6</span>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <HandleCards card={resultCards?.[5]} />
              <HandleCards card={resultCards?.[11]} />
              {data?.result?.win === "16" && (
                <div className="casino-winner-icon">
                  <Winner />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "80%",
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <span className="title-18 f500"> 2</span>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <HandleCards card={resultCards?.[1]} />
              <HandleCards card={resultCards?.[7]} />
              {data?.result?.win === "12" && (
                <div className="casino-winner-icon">
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <span className="title-18 f500"> 5</span>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <HandleCards card={resultCards?.[4]} />
              <HandleCards card={resultCards?.[10]} />
              {data?.result?.win === "15" && (
                <div className="casino-winner-icon">
                  <Winner />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "10px",
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <span className="title-18 f500"> 3</span>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <HandleCards card={resultCards?.[2]} />
              <HandleCards card={resultCards?.[8]} />
              {data?.result?.win === "13" && (
                <div className="casino-winner-icon">
                  <Winner />
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <span className="title-18 f500"> 4</span>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <HandleCards card={resultCards?.[3]} />
              <HandleCards card={resultCards?.[9]} />
              {data?.result?.win === "14" && (
                <div className="casino-winner-icon">
                  <Winner />
                </div>
              )}
            </div>
          </div>
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

export default Poker6ResultComponent;
