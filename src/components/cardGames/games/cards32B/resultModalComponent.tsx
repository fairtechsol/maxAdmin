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

const Card32BResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  let result: string[][] = [[], [], [], []];
  if (resultCards) {
    resultCards?.forEach((item: any, index: any) => {
      const targetArray = index % 4;
      result[targetArray].push(item);
    });
  }
  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="card32resultModal mb-5">
        <div className="card32resultCardContainer mb-3">
          <span style={{ fontSize: "20px" }}>Player 8</span>
          <div className="d-sm-flex flex-row justify-content-center align-items-center">
            {data?.result?.win === "1" && (
              <div className="casino-winner-icon ">
                <Winner />
              </div>
            )}
            {result?.[0]?.map((item: any) => {
              return (
                item != "1" && (
                  <div
                    style={{
                      border: "1px solid #fdef34",
                      borderRadius: "1px",
                      marginLeft: "5px",
                    }}
                  >
                    <HandleCards card={item} />
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="card32resultCardContainer mb-3">
          <span style={{ fontSize: "20px" }}>Player 9</span>
          <div className="d-sm-flex flex-row justify-content-center align-items-center">
            {data?.result?.win === "2" && (
              <div className="casino-winner-icon ">
                <Winner />
              </div>
            )}
            {result?.[1]?.map((item: any) => {
              return (
                item != "1" && (
                  <div
                    style={{
                      border: "1px solid #fdef34",
                      borderRadius: "1px",
                      marginLeft: "5px",
                    }}
                  >
                    <HandleCards card={item} />
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="card32resultCardContainer mb-3">
          <span style={{ fontSize: "20px" }}>Player 10</span>
          <div className="d-sm-flex flex-row justify-content-center align-items-center">
            {data?.result?.win === "3" && (
              <div className="casino-winner-icon ">
                <Winner />
              </div>
            )}
            {result?.[2]?.map((item: any) => {
              return (
                item != "1" && (
                  <div
                    style={{
                      border: "1px solid #fdef34",
                      borderRadius: "1px",
                      marginLeft: "5px",
                    }}
                  >
                    <HandleCards card={item} />
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="card32resultCardContainer mb-3">
          <span style={{ fontSize: "20px" }}>Player 11</span>
          <div className="d-sm-flex flex-row justify-content-center align-items-center">
            {data?.result?.win === "4" && (
              <div className="casino-winner-icon ">
                <Winner />
              </div>
            )}
            {result?.[3]?.map((item: any) => {
              return (
                item != "1" && (
                  <div
                    style={{
                      border: "1px solid #fdef34",
                      borderRadius: "1px",
                      marginLeft: "5px",
                    }}
                  >
                    <HandleCards card={item} />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
      {data?.bets?.count > 0 && (
        <div className="w-100 m-2">
          <ResultBetList bets={data?.bets?.rows} total={data?.bets?.count} />
        </div>
      )}
    </Container>
  );
};

export default Card32BResultComponent;
