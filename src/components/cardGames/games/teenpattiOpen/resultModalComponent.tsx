import React from "react";
import { Container } from "react-bootstrap";
//import { FaTrophy } from "react-icons/fa";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import ResultBetList from "../../../commonComponent/resultBetList";
import "./style.scss";

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

const TeenOpenResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards: any = data?.result?.cards?.split(",");

  const players: any = Array.from({ length: 9 }, () => []);

  resultCards?.forEach((card: any, index: any) => {
    players[index % 9].push(card);
  });

  // const layout = [
  //   { index: 0, label: "Player 1" },
  //   { index: 8, label: "Dealer" },
  //   { index: 7, label: "Player 8" },
  //   { index: 1, label: "Player 2" },
  //   { index: -1, label: "gap" },
  //   { index: 6, label: "Player 7" },
  //   { index: 2, label: "Player 3" },
  //   { index: 3, label: "Player 4" },
  //   { index: 4, label: "Player 5" },
  //   { index: 5, label: "Player 6" },
  // ];

  const renderRow = () => (
    <div className="d-flex justify-content-between mb-3">
      <>
        <div>
          <span className="fs-5"></span>
          <div
            className={
              "d-sm-flex flex-row justify-content-center align-items-between mb-2"
            }
          >
            {players.map((row: any, rowIndex: any) => (
              <div
                key={rowIndex}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    color: rowIndex == 8 ? "#f1b44c" : "",
                    marginTop: "3px",
                    marginLeft: "10px",
                    textAlign: "center",
                  }}
                >
                  {rowIndex == 8 ? "D" : rowIndex + 1}
                </span>
                {row.map((card: any, cardIndex: any) => (
                  <div style={{ marginTop: "3px", marginLeft: "10px" }}>
                    <HandleCards card={card} />
                  </div>
                ))}
                {data?.result?.sid.split("|")[0].includes(rowIndex + 1) ? (
                  <div
                    className="casino-winner-ico"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "5px",
                    }}
                  >
                    <img
                      src="https://versionobj.ecoassetsservice.com/v21/static/admin/img/winner.png"
                      style={{ height: "55px", width: "50px" }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </>

      <div style={{ width: "30%" }}>
        <div className="casino-result-desc">
          <span style={{ opacity: "0.6", display: "flex" }}>Winner</span>
          {data?.result?.sid
            .split("|")[0]
            .split(",")
            .map((v: any) => (
              <span style={{ marginLeft: "5px", display: "flex" }}>{v}</span>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <>{renderRow()}</>
      {data?.bets?.count > 0 && (
        <div className="w-100 m-2">
          <ResultBetList bets={data?.bets?.rows} total={data?.bets?.count} />
        </div>
      )}
    </Container>
  );
};

export default TeenOpenResultComponent;
