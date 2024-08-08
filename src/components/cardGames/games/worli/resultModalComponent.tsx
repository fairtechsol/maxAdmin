import React from "react";
import { Container } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import { HandleCards } from "../../../commonComponent/cardsComponent";
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
        <div className="w-100 abjresultCardContainer2">
          <div
            style={{
              width: "90%",
              margin: "8px 9px 10px 11px",
            }}
          >
            <div className="d-flex flex-column gap-4 align-items-center justify-content-center">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                {elementsAndar?.map((item: any, index: any) => {
                  return <HandleCards key={index} card={item} />;
                })}
              </div>
              <span
                style={{
                  background: "#28a745",
                  color: "#fff",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                {sortString} -{sum}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WorliResultComponent;
