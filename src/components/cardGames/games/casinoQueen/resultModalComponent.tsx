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

const QueenResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  let result: string[][] = [[], [], [], []];
  if (resultCards) {
    resultCards?.forEach((item: any, index: any) => {
      const targetArray = index % 4;
      result[targetArray].push(item);
    });
  }
  const handleCount = (cards: any, count: any) => {
    const getCardValue = (card: any) => {
      const value = card.slice(0, -2);
      switch (value) {
        case "J":
          return 11;
        case "Q":
          return 12;
        case "K":
          return 13;
        case "A":
          return 1;
        default:
          return parseInt(value, 10);
      }
    };

    const sum = cards.reduce((accumulator: any, card: any) => {
      if (card === "1") return accumulator;
      return accumulator + getCardValue(card);
    }, count);
    return sum;
  };

  const total0 = handleCount(result?.[0], 0);
  const total1 = handleCount(result?.[1], 1);
  const total2 = handleCount(result?.[2], 2);
  const total3 = handleCount(result?.[3], 3);

  // const maxSum = Math.max(total0, total1, total2, total3);
  return (
    <Container
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className={"queenresultModal"}>
        <div className="queenresultCardContainer mb-3">
          <span style={{ fontSize: "20px" }}>
            Total 0 - <span className="bg-success badge">{total0} </span>
          </span>
          <div
            className={
              "d-sm-flex flex-row justify-content-center align-items-center"
            }
          >
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
            {data?.result?.win === "1" && (
              <div className="casino-winner-icon">
                <Winner />
              </div>
            )}
          </div>
        </div>
        <div className="queenresultCardContainer mb-3">
          <span style={{ fontSize: "20px" }}>
            Total 1 - <span className="bg-success badge">{total1} </span>
          </span>
          <div
            className={
              "d-sm-flex flex-row justify-content-center align-items-center"
            }
          >
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
            {data?.result?.win === "2" && (
              <div className="casino-winner-icon">
                <Winner />
              </div>
            )}
          </div>
        </div>
        <div className="queenresultCardContainer mb-3">
          <span style={{ fontSize: "20px" }}>
            Total 2 - <span className="bg-success badge">{total2} </span>
          </span>
          <div
            className={
              "d-sm-flex flex-row justify-content-center align-items-center"
            }
          >
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
            {data?.result?.win === "3" && (
              <div className="casino-winner-icon">
                <Winner />
              </div>
            )}
          </div>
        </div>
        <div className="queenresultCardContainer mb-3">
          <span style={{ fontSize: "20px" }}>
            Total 3 - <span className="bg-success badge">{total3} </span>
          </span>
          <div
            className={
              "d-sm-flex flex-row justify-content-center align-items-center"
            }
          >
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
            {data?.result?.win === "4" && (
              <div className="casino-winner-icon">
                <Winner />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          width: "50%",
          textAlign: "center",
          boxShadow: "0 0 4px -1px",
          marginBottom: "10px",
        }}
      >
        <span style={{ opacity: "0.6" }}>Winner</span> Total{" "}
        {(data?.result?.win || 0) - 1}
      </div>
      {data?.bets?.count > 0 && (
        <div className="w-100">
          <ResultBetList bets={data?.bets?.rows} total={data?.bets?.count} />
        </div>
      )}
    </Container>
  );
};

export default QueenResultComponent;
