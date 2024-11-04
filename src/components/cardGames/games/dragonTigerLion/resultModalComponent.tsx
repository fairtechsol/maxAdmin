import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import "./style.scss";
import Winner from "../../../commonComponent/trophyWinner";
import ResultBetList from "../../../commonComponent/resultBetList";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const DragonTigerLionResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="dt20resultModal mb-3">
        <div className="d-flex row">
          <span className="fs-5">Dragon</span>
          <div className={"d-sm-flex flex-row"}>
            <div
              style={{
                borderRadius: "1px",
                marginLeft: "5px",
                display: "flex",
                gap: 10
              }}
            >
              <HandleCards card={resultCards?.[0]} />
              {data?.result?.win === "1" && (
                <div className="casino-winner-icon">
                  <Winner />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex row ">
          <span className="fs-5">Tiger</span>
          <div className={"d-sm-flex flex-row position-relative"}>
           
            <div
              style={{
                display: "flex",
                gap: 10,
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={resultCards?.[1]} />
              {data?.result?.win === "21" && (
              <div className="casino-winner-icon">
                <Winner />
              </div>
            )}
            </div>
          </div>
        </div>
        <div className="d-flex row ">
          <span className="fs-5">Lion</span>
          <div className={"d-sm-flex flex-row position-relative"}>
           
            <div
              style={{
                display: "flex",
                gap: 10,
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={resultCards?.[2]} />
              {data?.result?.win === "41" && (
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

export default DragonTigerLionResultComponent;
