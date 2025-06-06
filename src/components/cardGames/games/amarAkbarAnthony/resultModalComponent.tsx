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

const AmarAkbarAnthonyResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.desc?.split("|");
  const pair = resultCards?.[0]?.split(" ");

  return (
    <Container
      className="d-flex align-items-start flex-md-column flex-lg-row"
      style={{ display: "flex", alignItems: "start" }}
    >
      <div className="lucky7resultModal mt-5 ">
        <div className="lucky7resultCardContainer">
          <div className="d-sm-flex flex-row justify-content-center align-items-center pb-2 border-bottom border-bottom-1">
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
      <div className="w-100 d-sm-flex justify-content-center  mb-4">
        <div
          className={
            "casino-result-desc-aaa w-80 d-sm-flex flex-sm-column justify-content-center align-items-center pe-4 mb-2"
          }
        >
          <div className="d-sm-flex flex-sm-row p- title-14 w-100">
            <div
              className="lucky7CommonText-2 d-sm-flex flex-sm-row title-14 w-50 justify-content-right"
              style={{
                opacity: "0.6",
                display: "flex",
                justifyContent: "right",
              }}
            >
              Winner
            </div>
            <span className="lucky7CommonText-2 title-14 w-50 align-items-left">
              {pair?.[0]}
            </span>
          </div>

          <div
            className="d-sm-flex flex-sm-row w-100  "
            style={{ marginRight: "5px" }}
          >
            <div
              className="lucky7CommonText-2 d-sm-flex flex-sm-row title-14 w-50 justify-content-right"
              style={{
                opacity: "0.6",
                display: "flex",
                justifyContent: "right",
              }}
            >
              Odd/Even
            </div>
            <span className="lucky7CommonText-2 mr-2 title-14 w-50 align-items-left">
              {resultCards?.[2]}
            </span>
          </div>

          <div
            className="d-sm-flex flex-sm-row w-100 "
            style={{ marginRight: "5px" }}
          >
            <div
              className="lucky7CommonText-2 d-sm-flex flex-sm-row title-14 w-50"
              style={{
                opacity: "0.6",
                display: "flex",
                justifyContent: "right",
              }}
            >
              Color
            </div>
            <span className="lucky7CommonText-2 title-14 w-50">
              {resultCards?.[1]}
            </span>
          </div>
          <div
            className="d-sm-flex flex-sm-row w-100 "
            style={{ marginRight: "5px" }}
          >
            <div
              className="lucky7CommonText-2 d-sm-flex flex-sm-row title-14 w-50"
              style={{
                opacity: "0.6",
                display: "flex",
                justifyContent: "right",
              }}
            >
              Under/Over
            </div>
            <span className="lucky7CommonText-2 title-14 w-50">
              {resultCards?.[3]}
            </span>
          </div>
          <div
            className="d-sm-flex flex-sm-row w-100 "
            style={{ marginRight: "5px" }}
          >
            <div
              className="lucky7CommonText-2 d-sm-flex flex-sm-row title-14 w-50"
              style={{
                opacity: "0.6",
                display: "flex",
                justifyContent: "right",
              }}
            >
              Card
            </div>
            <span className="lucky7CommonText-2 title-14 w-50">
              {resultCards?.[4]}
            </span>
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

export default AmarAkbarAnthonyResultComponent;
