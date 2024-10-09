import { HandleCards } from "../../../../commonComponent/cardsComponent";
import "./style.scss";
const DynamicTable = ({ odds, data }: any) => {
  // let player1Key = `playera`;
  // let player2Key = `playerb`;
  return (
    <div className="d-flex justify-content-sm-between casino-detail-poker20">
      {/* Player A */}
      <div className="playerabox">
        <div className="casino-box-row playerafabcy">
          <div className="casino-nation-name">
            <div className="float-start ms-2">
              <i
                data-toggle="collapse"
                data-target="#demo1"
                className="fas fa-info-circle"
              ></i>
              <div id="demo1" className="collapse icon-range">
                R:<span>100</span>-<span>3L</span>
              </div>
            </div>
            <b>{odds?.[0]?.nation}</b>
          </div>

          {/* Odds Section */}
          <div className="casino-bl-box">
            <div
              className={
                odds?.[0]?.gstatus === "SUSPENDED" ||
                odds?.[0]?.gstatus === "CLOSED"
                  ? "suspended back-BackGround casino-bl-box-item"
                  : "back-BackGround casino-bl-box-item"
              }
            >
              <span className="casino-box-odd">{odds?.[0]?.b1}</span>
            </div>
            <div
              className={
                odds?.[0]?.gstatus === "SUSPENDED" ||
                odds?.[0]?.gstatus === "CLOSED"
                  ? "suspended lay-BackGround casino-bl-box-item"
                  : "lay-BackGround casino-bl-box-item"
              }
            >
              <span className="casino-box-odd">{odds?.[0]?.l1}</span>
            </div>
          </div>
        </div>

        {/* Game Status and Book Info */}
        <div className="casino-nation-name text-center w-100">
        {/* <span style={{position: "absolute", bottom: "-20px", right: "60px"}}>0</span> */}
        </div>

        {/* Bonus Section for Player A */}
        <div className="casino-box poker1dayother mt-2">
          <div className="casino-bl-box">
            <div
              className={
                odds?.[0]?.gstatus === "SUSPENDED" ||
                odds?.[0]?.gstatus === "CLOSED"
                  ? "suspended back-BackGround casino-bl-box-item"
                  : "back-BackGround casino-bl-box-item"
              }
            >
              <span className="casino-box-odd">
                {data?.playersBonusPair?.[0]?.nation
                  ?.replace("Player A", "")
                  .trim()}
              </span>
            </div>
            <div
              className={
                odds?.[1]?.gstatus === "SUSPENDED" ||
                odds?.[1]?.gstatus === "CLOSED"
                  ? "suspended back-BackGround casino-bl-box-item"
                  : "back-BackGround casino-bl-box-item"
              }
            >
              <span className="casino-box-odd">
                {data?.playersBonusPair?.[1]?.nation
                  ?.replace("Player A", "")
                  .trim()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="playerabcardbox">
        <div className="poker-icon">
          <img src="https://versionobj.ecoassetsservice.com/v21/static/admin/img/poker.png" />
        </div>{" "}
       { data?.videoInfo?.mid != "0" && ( <div className="row row5 w-100">
          <div className="col-12 col-md-6">
            <div className="dealer-name playera">Player A</div>{" "}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <HandleCards card={data?.videoInfo?.C1} />
              <HandleCards card={data?.videoInfo?.C2} />
            </div>
          </div>{" "}
          <div className="col-12 col-md-6 text-end">
            <div className="dealer-name playerb">Player B</div>{" "}
            <div style={{ display: "flex",  flexDirection: "column", alignItems: "end" }}>
              <HandleCards card={data?.videoInfo?.C3} />
              <HandleCards card={data?.videoInfo?.C4} />
            </div>
          </div>
        </div> )}
      </div>
      {/* Player B */}
      <div className="playerbbox">
        <div className="casino-box-row playerbfabcy">
          <div className="casino-nation-name">
            <div className="float-start ms-2">
              <i
                data-toggle="collapse"
                data-target="#demo2"
                className="fas fa-info-circle"
              ></i>
              <div id="demo2" className="collapse icon-range">
                R:<span>100</span>-<span>3L</span>
              </div>
            </div>
            <b>{odds?.[1]?.nation}</b>
          </div>

          {/* Odds Section */}
          <div className="casino-bl-box">
            <div
              className={
                odds?.[1]?.gstatus === "SUSPENDED" ||
                odds?.[1]?.gstatus === "CLOSED"
                  ? "suspended back-BackGround casino-bl-box-item"
                  : "back-BackGround casino-bl-box-item"
              }
            >
              <span className="casino-box-odd">{odds?.[1]?.b1}</span>
            </div>
            <div
              className={
                odds?.[1]?.gstatus === "SUSPENDED" ||
                odds?.[1]?.gstatus === "CLOSED"
                  ? "suspended lay-BackGround casino-bl-box-item"
                  : "lay-BackGround casino-bl-box-item"
              }
            >
              <span className="casino-box-odd">{odds?.[1]?.l1}</span>
            </div>
          </div>
        </div>

        {/* Game Status and Book Info */}
        <div className="casino-nation-name text-center w-100">
        {/* <span style={{position: "absolute", bottom: "-20px", right: "60px"}}>0</span> */}
        </div>

        {/* Bonus Section for Player B */}
        <div className="casino-box poker1dayother mt-2">
          <div className="casino-bl-box">
            <div
              className={
                odds?.[1]?.gstatus === "SUSPENDED" ||
                odds?.[1]?.gstatus === "CLOSED"
                  ? "suspended back-BackGround casino-bl-box-item"
                  : "back-BackGround casino-bl-box-item"
              }
            >
              <span className="casino-box-odd">
                {data?.playersBonusPair?.[2]?.nation
                  ?.replace("Player B", "")
                  .trim()}
              </span>
              {/* <span style={{position: "absolute", bottom: "-20px", right: "60px"}}>0</span> */}
            </div>
            
            <div
              className={
                odds?.[1]?.gstatus === "SUSPENDED" ||
                odds?.[1]?.gstatus === "CLOSED"
                  ? "suspended back-BackGround casino-bl-box-item"
                  : "back-BackGround casino-bl-box-item"
              }
            >
              <span className="casino-box-odd">
                {data?.playersBonusPair?.[3]?.nation
                  ?.replace("Player B", "")
                  .trim()}
              </span>
              {/* <span style={{position: "absolute", bottom: "-20px", right: "60px"}}>0</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
