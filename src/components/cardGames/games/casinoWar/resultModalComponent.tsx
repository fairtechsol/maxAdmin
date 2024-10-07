import React from "react";
import { Container } from "react-bootstrap";
import "./style.scss";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import Winner from "../../../commonComponent/trophyWinner";

interface Props {
  data: {
    result: {
      mid: string;
      sid: string;
      win: string;
      desc: string;
      cards: string;
    };
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
              className="teen20resultCardContainer mb-3"
              style={{ marginLeft: "5px" }}
            >
              <span className="fs-6">Player {index + 1}</span>
              <div className="d-sm-flex flex-row justify-content-center align-items-center mb-2">
                <div
                  style={{
                    border: "1px solid #fdef34",
                    borderRadius: "1px",
                    marginLeft: "5px",
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "5px",
                  }}
                >
                  <HandleCards card={player.card} />
                </div>
                {data?.result?.sid.includes(`${index + 1}`) && (
                  <div className="casino-winner-icon ms-1">
                  <Winner />
                </div>
                )}
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
    </Container>
  );
};

export default CasinoWarResultComponent;
