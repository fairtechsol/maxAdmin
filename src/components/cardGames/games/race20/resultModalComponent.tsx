import React from "react";
import { Container } from "react-bootstrap";
import { BiSolidHeart } from "react-icons/bi";
import { GiSpades } from "react-icons/gi";
import { ImClubs, ImDiamonds } from "react-icons/im";
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

const Race20ResultComponent: React.FC<Props> = ({ data }: any) => {
  const elements = data?.result?.cards?.split(",");
  const winner = data?.result?.win;
  const description = data?.result?.desc?.split("|");
  const points = description?.[1]?.split(":");
  const card = description?.[2]?.split(":");

  const ss: any = [];
  const hh: any = [];
  const cc: any = [];
  const dd: any = [];

  elements?.forEach((item: any) => {
    if (item.endsWith("SS")) {
      ss.push(item);
    } else if (item.endsWith("HH")) {
      hh.push(item);
    } else if (item.endsWith("CC")) {
      cc.push(item);
    } else if (item.endsWith("DD")) {
      dd.push(item);
    }
  });

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <GiSpades color="#000000" size={35} />
          <BiSolidHeart color="#ff0000" size={35} />
          <ImClubs color="#000000" size={35} />
          <ImDiamonds color="#ff0000" size={35} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div className="result-card-container">
            {hh?.map((item: any) => {
              return <HandleCards card={item} />;
            })}{" "}
            {hh?.length < 5 ? <HandleCards card={"KHH"} /> : ""}{" "}
          </div>
          <div className="result-card-container">
            {dd?.map((item: any) => {
              return <HandleCards card={item} />;
            })}{" "}
            {dd?.length < 5 ? <HandleCards card={"KDD"} /> : ""}{" "}
          </div>
          <div className="result-card-container">
            {cc?.map((item: any) => {
              return <HandleCards card={item} />;
            })}{" "}
            {cc?.length < 5 ? <HandleCards card={"KCC"} /> : ""}{" "}
          </div>
          <div className="result-card-container">
            {ss?.map((item: any) => {
              return <HandleCards card={item} />;
            })}{" "}
            {ss?.length < 5 ? <HandleCards card={"KSS"} /> : ""}{" "}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            writingMode: "vertical-lr",
            textOrientation: "upright",
            border: "0.5px solid #097c93",
          }}
        >
          <div className="video-winner-text">WINNER</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginLeft: "5px",
          }}
        >
          <div className="result-card-container" style={{ height: "40px" }}>
            {" "}
            {winner === "1" ? (
              <div
                style={{ display: "flex", flexDirection: "row", gap: "5px" }}
              >
                <HandleCards card={"KHH"} />{" "}
                <div className="casino-winner-icon">
                  <Winner />
                </div>
              </div>
            ) : (
              ""
            )}{" "}
          </div>
          <div className="result-card-container" style={{ height: "40px" }}>
            {winner === "2" ? (
              <div
                style={{ display: "flex", flexDirection: "row", gap: "5px" }}
              >
                <HandleCards card={"KDD"} />
                <div className="casino-winner-icon">
                  <Winner />
                </div>{" "}
              </div>
            ) : (
              ""
            )}{" "}
          </div>
          <div className="result-card-container" style={{ height: "40px" }}>
            {winner === "3" ? (
              <div
                style={{ display: "flex", flexDirection: "row", gap: "5px" }}
              >
                <HandleCards card={"KCC"} />
                <div className="casino-winner-icon">
                  <Winner />
                </div>{" "}
              </div>
            ) : (
              ""
            )}{" "}
          </div>
          <div className="result-card-container" style={{ height: "40px" }}>
            {winner === "4" ? (
              <div
                style={{ display: "flex", flexDirection: "row", gap: "5px" }}
              >
                <HandleCards card={"KSS"} />
                <div className="casino-winner-icon">
                  <Winner />
                </div>{" "}
              </div>
            ) : (
              ""
            )}{" "}
          </div>
        </div>
      </div>

      <div className="w-100 d-sm-flex justify-content-center align-items-center mt-2">
        <div
          className="w-50 d-sm-flex flex-sm-column justify-content-center align-items-center p-4 mb-2"
          style={{ boxShadow: "0 0 4px -1px" }}
        >
          <div className="d-sm-flex flex-sm-row">
            <span className="dt20CommonText">Winner</span>
            <span className="dt20CommonText-2">K {description?.[0]}</span>
          </div>
          <div className="d-sm-flex flex-sm-row">
            <span className="dt20CommonText">Points</span>
            <span className="dt20CommonText-2">{points?.[1]}</span>
          </div>

          <div className="d-sm-flex flex-sm-row">
            <span className="dt20CommonText">Card</span>
            <span className="dt20CommonText-2">{card?.[1]}</span>
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

export default Race20ResultComponent;
