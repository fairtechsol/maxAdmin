import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import ResultBetList from "../../../commonComponent/resultBetList";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const BollywoodTableResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.desc?.split("|");
  const pair = resultCards?.[0];

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="lucky7resultModal">
        <div className="lucky7resultCardContainer">
          <div className="d-sm-flex flex-row justify-content-center align-items-center">
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={data?.result?.cards} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 d-sm-flex justify-content-center align-items-center mt-2">
        <div
          className={
            "w-80 d-sm-flex flex-sm-column justify-content-center align-items-center p-4 mb-2"
          }
        >
          <div className="d-sm-flex d-flex flex-row flex-sm-row justify-content-center align-items-center">
            <div className="lucky7CommonText- d-sm-flex flex-sm-row ">
              Result:
            </div>
            <div className="d-sm-flex flex-sm-row p-1">
              <span className="lucky7CommonText-">{pair}</span>
            </div>
          </div>

          <div className="d-sm-flex d-flex flex-row flex-sm-row justify-content-center align-items-center">
            <div
              className="d-sm-flex flex-sm-row border-star border- border-primary mr-2 "
              style={{ marginRight: "7px" }}
            >
              <span className="lucky7CommonText-2 mr-2">
                {resultCards?.[2]}
              </span>
            </div>

            <div
              className="d-sm-flex flex-sm-row border-start border-2 border-primary "
              style={{ marginRight: "7px" }}
            >
              <span className="lucky7CommonText-2">{resultCards?.[1]}</span>
            </div>
            <div
              className="d-sm-flex flex-sm-row border-start border-2 border-primary "
              style={{ marginRight: "7px" }}
            >
              <span className="lucky7CommonText-2">{resultCards?.[3]}</span>
            </div>
            <div
              className="d-sm-flex flex-sm-row border-start border-2 border-primary "
              style={{ marginRight: "5px" }}
            >
              <span className="lucky7CommonText-2">{resultCards?.[4]}</span>
            </div>
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

export default BollywoodTableResultComponent;
