import React from "react";
import { Container } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import ResultBetList from "../../../commonComponent/resultBetList";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const CardJResultComponent: React.FC<Props> = ({ data }: any) => {
  const result = data?.result?.cards?.split("*");
  const elementsAndar = result?.[0]?.split(",");

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="abjresultModal mb-2">
        <div className="w-100 abjresultCardContainer2">
          <div
            style={{
              width: "90%",
              margin: "8px 9px 10px 11px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "start",
                  width: "83%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(0, 0, 0, .1)",
                    paddingBottom:"15px"
                  }}
                >
                  {elementsAndar?.map((item: any, index: any) => (
                    <HandleCards key={index} card={item} />
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "start",
                    
                    padding: "6px",
                    boxShadow: "0 0 4px -1px rgba(0, 0, 0, 0.5)",
                    marginTop: "0px",
                    color: "#9e9e9e",
                    paddingRight: "30px",
                    paddingLeft: "30px",
                  }}
                >
                  {" "}
                  Result
                  {elementsAndar?.map((item: any, index: any) => (
                    <div style={{ color: "#000" }}>{item}</div>
                  ))}
                </div>
              </div>
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

export default CardJResultComponent;
