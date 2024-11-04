import React from "react";
import { Container } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import Winner from "../../../commonComponent/trophyWinner";
import ResultBetList from "../../../commonComponent/resultBetList";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Bacarrat1ResultComponent: React.FC<Props> = ({ data }: any) => {
  const elements = data?.result?.cards?.split(",");

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="bacarrate-result">
        <div className="bacarrate-player-result">
          <span className="title-18 f500 mb-2">Player</span>
          <div className="bacarrate-player-card" >
            {data?.result?.win === "1" && (
              <div className="casino-winner-icon position-relative text-start me-5 mb-5" style={{ transform: "rotate(-360deg)" }}>
              <Winner />
            </div>
            )}
            {elements?.[4] != "1" && (
              <div style={{ transform: "rotate(270deg)" }}>
                <HandleCards card={elements?.[4]} />
              </div>
            )}
            <HandleCards card={elements?.[2]} />
            <HandleCards card={elements?.[0]} />
          </div>
        </div>

        {data?.result?.win === "3" && (
          <div className="bacarrate-player-result">
            <span className="title-18 f500">Tie</span>
          </div>
        )}

        <div className="bacarrate-player-result">
          <span className="title-18 f500 mb-2">Banker</span>
          <div className="bacarrate-player-card">
            <HandleCards card={elements?.[1]} />
            <HandleCards card={elements?.[3]} />
            {elements?.[5] != "1" && (
              <div style={{ transform: "rotate(90deg)" }}>
                <HandleCards card={elements?.[5]} />
                {(data?.result?.win === "2" || data?.result?.win === "4") && (
              <div className="casino-winner-icon ms-5 mb-5 text-end position-relative" style={{ transform: "rotate(-90deg)" }} >
              <Winner />
            </div>
            )}
              </div>
            )}
              
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

export default Bacarrat1ResultComponent;
