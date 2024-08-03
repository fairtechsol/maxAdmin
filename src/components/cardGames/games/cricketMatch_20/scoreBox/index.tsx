import { crick20ScoreBg } from "../../../../../assets";
import "./style.scss";

const ScoreBox = ({
  teamA,
  teamAScore,
  teamAOver,
  teamB,
  teamBScore,
  teamBOver,
  ballIconUrl,
  backOdds,
  layOdds,
  item,
  runs,
}: any) => {
  return (
    <div
      className="score-box cricket20"
      style={{
        backgroundImage: `url(${crick20ScoreBg})`,
        backgroundSize: "fit",
        backgroundPosition: "center",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="team-score">
        <div>
          <div className="text-center">
            <b>{teamA}</b>
          </div>
          <div className="text-center">
            <span className="ml-1" style={{ fontSize: "12px" }}>
              {teamAScore}{" "}
            </span>
            <span className="ml-2" style={{ fontSize: "12px" }}>
              {teamAOver} Over
            </span>
          </div>
        </div>
        <div>
          <div className="text-center">
            <b>{teamB}</b>
          </div>
          <div className="text-center">
            <span className="ml-1" style={{ fontSize: "12px" }}>
              {Number(Number(teamBScore.split("/")[0]) + Number(runs))}/
              {teamBScore.split("/")[1]}{" "}
            </span>
            <span className="ml-1" style={{ fontSize: "12px" }}>
              {teamBOver} Overs
            </span>
          </div>
        </div>
      </div>
      <div className="ball-icon">
        <img src={ballIconUrl} alt="Ball Icon" style={{ height: "60px" }} />
      </div>
      <div className="blbox">
        <div
          className={
            item?.gstatus === "SUSPENDED" || backOdds === "0.00"
              ? "suspended casino-odds-box back"
              : "casino-odds-box back "
          }
        >
          <span className="casino-odds">{backOdds}</span>
        </div>
        <div
          className={
            item?.gstatus === "SUSPENDED" || layOdds === "0.00"
              ? "suspended casino-odds-box lay"
              : "casino-odds-box lay "
          }
        >
          <span className="casino-odds">{layOdds}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBox;
