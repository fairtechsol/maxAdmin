import React from "react";
import { Container } from "react-bootstrap";
import "./style.scss";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import ResultBetList from "../../../commonComponent/resultBetList";
//import Winner from "../../../commonComponent/trophyWinner";

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

const CasinoMeterResultComponent: React.FC<Props> = ({ data }) => {
  //const resultCards = data?.result?.cards?.split(",");
  //const playerIds = data?.result?.sid?.split(",");

  // const players = resultCards?.map((card, index) => ({
  //   card,
  //   id: playerIds[index],
  // }));

  const cards = data?.result?.cards?.split(",");

  const lowCards: string[] = [];
  const highCards: string[] = [];

  let lowCardSum = 0;
  let highCardSum = 0;
  let spadeCard = "";

  cards?.forEach((card) => {
    if (card?.length < 3) return;
    const firstChar = card[0];

    if (card == "9HH" || card == "10HH") {
      spadeCard = spadeCard + card + ",";
      return;
    }

    if (
      firstChar === "1" ||
      firstChar === "J" ||
      firstChar === "Q" ||
      firstChar === "K"
    ) {
      highCards.push(card);
      highCardSum =
        highCardSum +
        (firstChar == "1"
          ? 10
          : firstChar == "J"
          ? 11
          : firstChar == "Q"
          ? 12
          : firstChar == "K"
          ? 13
          : 0);
    } else {
      lowCards.push(card);
      lowCardSum = lowCardSum + (firstChar == "A" ? 1 : Number(firstChar));
    }
  });

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <>
        <div className="d-flex align-items-center ">
          <span className="fs-5"></span>
          <div
            className={
              "d-sm-flex flex-column justify-content-center align-items-between mb-2 gap-2"
            }
          >
            <div className="d-flex align-items-center ">
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                Low Cards
              </span>
              {lowCards?.map((cd: any) => {
                return (
                  <div style={{ marginLeft: "5px" }}>
                    <HandleCards card={cd} />
                  </div>
                );
              })}
            </div>

            <div className="d-flex align-items-center ">
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                High Cards
              </span>
              {highCards?.map((cd: any) => {
                return (
                  <div style={{ marginLeft: "5px" }}>
                    <HandleCards card={cd} />
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", gap: "5px", marginLeft: "30px" }}>
            {spadeCard?.split(",")?.map((crd) => {
              return <HandleCards card={crd} />;
            })}
          </div>
        </div>
      </>

      <div style={{ width: "30%" }}>
        <div className="casino-result-desc">
          <span style={{ opacity: "0.6", display: "flex" }}>Winner</span>

          <span style={{ marginLeft: "5px", display: "flex" }}>
            {lowCardSum > highCardSum ? "Low" : "High"}
          </span>
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

export default CasinoMeterResultComponent;
