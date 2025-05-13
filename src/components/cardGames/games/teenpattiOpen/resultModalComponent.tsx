import React from "react";
import { Container } from "react-bootstrap";
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
                  <div
                    style={{ marginTop: "3px", marginLeft: "10px" }}
                    key={cardIndex}
                  >
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
            .map((v: any, index: number) => (
              <span style={{ marginLeft: "5px", display: "flex" }} key={index}>
                {v}
              </span>
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
