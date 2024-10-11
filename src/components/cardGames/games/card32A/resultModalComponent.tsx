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

const Card32ResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  let result: string[][] = [[], [], [], []];
  if (resultCards) {
    resultCards?.forEach((item: any, index: any) => {
      const targetArray = index % 4;
      result[targetArray].push(item);
    });
  }
// console.log('sssss',result)
  // const allKeys = Object.keys(data ? data : 0);
  // const cArray = allKeys?.filter((key) => /^C\d+$/.test(key));
  // const numbers = cArray.map((key) => Number(data[key]));
  // const max = Math.max(...numbers);
  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="card32resultModal ">
        <div className="card32resultCardContainer mb-5">
          <span className="fs-5">Player 8</span>
          <div className="d-sm-flex flex-row justify-content-center align-items-center">
            {data?.result?.win === "1" && (
              <div className="casino-winner-icon me-1 mt-5">
              <Winner />
            </div>
            )}
            {result?.[0]?.map((item: any) => {
              return item != "1" && (
                <div
                  style={{
                    border: "1px solid #fdef34",
                    borderRadius: "1px",
                    marginLeft: "5px",
                  }}
                >
                  <HandleCards card={item} />
                </div>
              );
            })}
           
          </div>
        </div>
        <div className="card32resultCardContainer mb-5">
          <span className="fs-5">Player 9</span>
          <div className="d-sm-flex flex-row justify-content-center align-items-center">
            {data?.result?.win === "2" && (
              <div className="casino-winner-icon me-1 mt-5">
              <Winner />
            </div>
            )}
           {result?.[1]?.map((item: any) => {
              return item != "1" && (
                <div
                  style={{
                    border: "1px solid #fdef34",
                    borderRadius: "1px",
                    marginLeft: "5px",
                  }}
                >
                  <HandleCards card={item} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="card32resultCardContainer mb-5">
          <span className="fs-5">Player 10</span>
          <div className="d-sm-flex flex-row justify-content-center align-items-center">
            {data?.result?.win === "3" && (
              <div className="casino-winner-icon me-1 mt-5">
              <Winner />
            </div>
            )}
            {result?.[2]?.map((item: any) => {
              return item != "1" && (
                <div
                  style={{
                    border: "1px solid #fdef34",
                    borderRadius: "1px",
                    marginLeft: "5px",
                  }}
                >
                  <HandleCards card={item} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="card32resultCardContainer mb-3">
          <span className="fs-5">Player 11</span>
          <div className="d-sm-flex flex-row justify-content-center align-items-center pb-5">
            {data?.result?.win === "4" && (
              <div className="casino-winner-icon me-1 mt-5">
              <Winner />
            </div>
            )}
            {result?.[3]?.map((item: any) => {
              return item != "1" && (
                <div
                  style={{
                    border: "1px solid #fdef34",
                    borderRadius: "1px",
                    marginLeft: "5px",
                  }}
                >
                  <HandleCards card={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Card32ResultComponent;
