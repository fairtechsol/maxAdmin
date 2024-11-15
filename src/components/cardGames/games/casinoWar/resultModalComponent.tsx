import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import ResultBetList from "../../../commonComponent/resultBetList";
import Winner from "../../../commonComponent/trophyWinner";
import "./style.scss";

interface Props {
  data: {
    result: {
      mid: string;
      sid: string;
      win: string;
      desc: string;
      cards: string;
    };
    bets: any;
  };
}

const CasinoWarResultComponent: React.FC<Props> = ({ data }) => {
  const resultCards = data?.result?.cards?.split(",");
  const playerIds = data?.result?.sid?.split(",");

  // Create a mapping of player IDs to their respective cards
  const players = resultCards?.map((card, index) => ({
    card,
    id: playerIds[index], // Distribute player IDs cyclically
  }));

  const renderRow = () => (
    <div
      className="flex-row justify-content-around"
      style={{ display: "flex" }}
    >
      {players?.map((player, index) => {
        if (index !== 6) {
          return (
            <div
              key={index}
              className="teen20resultCardContainer"
              style={{ marginLeft: "5px" }}
            >
              <span className="fs-6">Player {index + 1}</span>
              <div className="d-sm-flex flex-column justify-content-center align-items-center me-5">
                <div
                  style={{
                    width: "100%",
                    borderRadius: "1px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <HandleCards card={player.card} />
                  {data?.result?.sid.includes(`${index + 1}`) && (
                    <div className="casino-winner-icon">
                      <Winner />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        } else {
          return <></>;
        }
      })}
      {data?.result?.win === "0" && (
        <div className="d-sm-flex flex-row justify-content-center align-items-center"></div>
      )}
    </div>
  );

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
          border: "1px solid #fdef34",
          borderRadius: "1px",
          marginLeft: "5px",
          position: "relative",
        }}
      ></div>

      {players && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span className="fs-6">Dealer</span>
          <HandleCards card={players[6]?.card} />
        </div>
      )}

      {renderRow()}

      {data?.bets?.count > 0 && (
        <div className="w-100 m-2">
          <ResultBetList bets={data?.bets?.rows} total={data?.bets?.count} />
        </div>
      )}
    </Container>
  );
};

export default CasinoWarResultComponent;
