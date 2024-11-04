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

const WorliResultComponent: React.FC<Props> = ({ data }: any) => {
  const result = data?.result?.cards?.split("*");
  const elementsAndar = result?.[0]?.split(",");
  let a: any[] = [];

  a = elementsAndar?.map((item: any) => {
    if (item?.substring(0, item.length - 2) === "J") return 11;
    if (item?.substring(0, item.length - 2) === "Q") return 12;
    if (item?.substring(0, item.length - 2) === "K") return 13;
    if (item?.substring(0, item.length - 2) === "A") return 1;
    return Number(item?.substring(0, item.length - 2) || "");
  });

  let sortString = 0,
    sum = 0;

  a?.sort()?.map((item) => {
    if (item < 10) {
      sortString = sortString * 10 + item;
    } else {
      sortString = sortString * 10 + (item % 10);
    }
    sum = (sum + item) % 10;
  });

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="abjresultModal mb-2">
        <div className="w-100 abjresultCardContainer2 justify-content-end">
          <div
            style={{
              width: "80%",
              margin: "8px 9px 10px 11px",
            }}
          >
            <div className="d-flex  gap-4 align-items-center justify-content-between">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderBottom:"1px solid rgba(0, 0, 0, .1)",
                  paddingBottom:"1rem"
                }}
              >
                {elementsAndar?.map((item: any, index: any) => {
                  return <HandleCards key={index} card={item} />;
                })}
              </div>

              <div style={{ width: "30%" }}>
                <div className="casino-result-desc">
                  <div style={{display:"flex"}}>
                    <span style={{ opacity: "0.6", display: "flex" }}>
                      Pana:
                    </span>
                    {sortString}
                  </div>
                  <div style={{display:"flex"}}>
                    <span style={{ opacity: "0.6", display: "flex" }}>
                      Ocada:
                    </span>
                    {sum}
                  </div>
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

export default WorliResultComponent;
