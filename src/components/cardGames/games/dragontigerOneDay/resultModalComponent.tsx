import { Container } from "react-bootstrap";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import "./style.scss";
import Winner from "../../../commonComponent/trophyWinner";
import ResultBetList from "../../../commonComponent/resultBetList";

const DragonTigerOneDayResultComponent: any = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  const desc = data?.result?.desc?.split("*");
  const resultData = desc?.[0]?.split("|");
  const dragonData = desc?.[1]?.split("|");
  const tigerData = desc?.[2]?.split("|");
  const dragonCard = dragonData?.[2];
  const tigerCard = tigerData?.[2];

  return (
    <Container style={{ display: "flex",flexDirection:"column", paddingBottom: "20px" }}>
      <div style={{display:"flex"}}>
      <div className="dt20resultModal">
        <div className="dt20resultCardContainer">
          <span className="fs-5">Dragon</span>
          <div
            className={
              "d-sm-flex flex-row justify-content-center align-items-center"
            }
          >
            {data?.result?.win === "1" && (
              <div className="casino-winner-icon">
                <Winner />
              </div>
            )}
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={resultCards?.[0]} />
            </div>
          </div>
        </div>
        <div
          className="dt20resultCardContainer"
          style={{ borderLeft: "2px solid #dddddd" }}
        >
          <span className="fs-5">Tiger</span>
          <div
            className={
              "d-sm-flex flex-row justify-content-center align-items-center"
            }
          >
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={resultCards?.[1]} />
            </div>
            {data?.result?.win === "2" && (
              <div className="casino-winner-icon mb-5 ms-2">
                <Winner />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-100 d-sm-flex justify-content-center align-items-center mt-2">
        <div
          className={
            "w-90 d-sm-flex flex-sm-column justify-content-center align-items-center p-2 mb-2"
          }
          style={{ boxShadow: "0 0 4px -1px" }}
        >
          <div className="d-sm-flex flex-sm-row">
            <span className="dt20CommonTextd">Winner</span>
            <span className="dt20CommonText-2d">{resultData?.[0]}</span>
          </div>
          <div className="d-sm-flex flex-sm-row">
            <span className="dt20CommonTextd">Pair</span>
            <span className="dt20CommonText-2d">{resultData?.[1]}</span>
          </div>
          <div className="d-sm-flex flex-sm-row">
            <span className="dt20CommonTextd">Odd/Even</span>
            <span className="dt20CommonText-2d">
              D : {dragonData?.[1]} | T : {tigerData?.[1]}
            </span>
          </div>
          <div className="d-sm-flex flex-sm-row">
            <span className="dt20CommonTextd">Color</span>
            <span className="dt20CommonText-2d">
              D : {dragonData?.[0]} | T : {tigerData?.[0]}
            </span>
          </div>
          <div className="d-sm-flex flex-sm-row">
            <span className="dt20CommonTextd">Card</span>
            <span className="dt20CommonText-2d">
              D : {dragonCard} | T : {tigerCard}
            </span>
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

export default DragonTigerOneDayResultComponent;
