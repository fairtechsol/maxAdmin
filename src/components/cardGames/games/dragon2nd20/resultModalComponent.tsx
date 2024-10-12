import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import "./style.scss";
import Winner from "../../../commonComponent/trophyWinner";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Dragon202ResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="dt20resultModal">
        <div className="dt20resultCardContainer mb-3">
          <span className="fs-5">Dragon</span>
          <div
            className={
              "d-sm-flex flex-row justify-content-center align-items-center"
            }
          >
            {data?.result?.win === "1" && (
             <div className="casino-winner-icon mb-5 me-5">
             <Winner />
           </div>
            )}
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={resultCards?.[0]} />
            </div>
          </div>
        </div>
        <div className="dt20resultCardContainer mb-3">
          <span className="fs-5">Tiger</span>
          <div
            className={
              "d-sm-flex flex-row justify-content-center align-items-center"
            }
          >
           
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={resultCards?.[1]} />
            </div>
            {data?.result?.win === "2" && (
              <div className="casino-winner-icon mb-5 me-5">
              <Winner />
            </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dragon202ResultComponent;
