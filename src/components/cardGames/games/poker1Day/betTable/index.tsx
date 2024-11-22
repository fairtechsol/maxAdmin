import { useState } from "react";
import { HandleCards } from "../../../../commonComponent/cardsComponent";
import "./style.scss";
import { formatNumber } from "../../../../../helpers";
const DynamicTable = ({ odds, data }: any) => {
  // let player1Key = `playera`;
  // let player2Key = `playerb`;
  const [openDivIds, setOpenDivIds] = useState<string[]>([]);

  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };
  console.log(data, "data");
  return (
    <div className="d-flex justify-content-sm-between casino-detail-poker20">
      {/* Player A */}
      <div className="playerabox">
        <div className="casino-box-row playerafabcy">
          <div className="casino-nation-name">
            <span
              onClick={() => toggleDiv(`demo4`)}
              className="range-icon d-inline-block ms-1"
            >
              <i className="fas fa-info-circle float-right"></i>
              <div
                id={`demo4`}
                className={`icon-range-dt1day collapse ${
                  openDivIds.includes(`demo4`) ? "show" : ""
                }`}
              >
                R:<span>{parseFloat(data?.videoInfo?.min)}</span>-
                <span>{formatNumber(data?.videoInfo?.max)}</span>
              </div>
            </span>
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
        <span
          className={`${
            data?.profitLoss?.[`${odds?.[0]?.mid}_${odds?.[0]?.sid}_card`]
              ? JSON.parse(
                  data?.profitLoss?.[`${odds?.[0]?.mid}_${odds?.[0]?.sid}_card`]
                )?.["playera"] < 0
                ? "color-red"
                : "color-green"
              : "color-red"
          } f700 title-16`}
        >
          {data?.profitLoss?.[`${odds?.[0]?.mid}_${odds?.[0]?.sid}_card`]
            ? JSON.parse(
                data?.profitLoss?.[`${odds?.[0]?.mid}_${odds?.[0]?.sid}_card`]
              )?.["playera"]
            : 0}
        </span>
        {/* Game Status and Book Info */}
        <div className="casino-nation-name text-center w-100">
          <span
            onClick={() => toggleDiv(`demo5`)}
            className="range-icon d-inline-block ms-1"
          >
            <i className="fas fa-info-circle float-right"></i>{" "}
            <div
              id={`demo5`}
              className={`icon-range-dt1day collapse ${
                openDivIds.includes(`demo5`) ? "show" : ""
              }`}
            >
              R:<span>{parseFloat(data?.videoInfo?.min)}</span>-
              <span>{formatNumber(data?.videoInfo?.max)}</span>
            </div>
          </span>
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
              <span
                className={`${
                  data?.profitLoss?.[
                    `${data?.playersBonusPair?.[0]?.mid}_${data?.playersBonusPair?.[0]?.sid}_card`
                  ]
                    ? data?.profitLoss?.[
                        `${data?.playersBonusPair?.[0]?.mid}_${data?.playersBonusPair?.[0]?.sid}_card`
                      ] < 0
                      ? "color-red"
                      : "color-green"
                    : "color-red"
                } f700 title-16`}
                style={{
                  position:
                    odds?.[0]?.gstatus === "SUSPENDED" ||
                    odds?.[0]?.gstatus === "CLOSED"
                      ? "absolute"
                      : "relative",
                  bottom: "-20px",
                  right: "60px",
                }}
              >
                {data?.profitLoss?.[
                  `${data?.playersBonusPair?.[0]?.mid}_${data?.playersBonusPair?.[0]?.sid}_card`
                ]
                  ? data?.profitLoss?.[
                      `${data?.playersBonusPair?.[0]?.mid}_${data?.playersBonusPair?.[0]?.sid}_card`
                    ]
                  : 0}
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
              <span
                className={`${
                  data?.profitLoss?.[
                    `${data?.playersBonusPair?.[1]?.mid}_${data?.playersBonusPair?.[1]?.sid}_card`
                  ]
                    ? data?.profitLoss?.[
                        `${data?.playersBonusPair?.[1]?.mid}_${data?.playersBonusPair?.[1]?.sid}_card`
                      ] < 0
                      ? "color-red"
                      : "color-green"
                    : "coor-red"
                } f700 title-16`}
                style={{  position:
                  odds?.[1]?.gstatus === "SUSPENDED" ||
                  odds?.[1]?.gstatus === "CLOSED"
                    ? "absolute"
                    : "relative", bottom: "-20px", right: "60px" }}
              >
                {data?.profitLoss?.[
                  `${data?.playersBonusPair?.[1]?.mid}_${data?.playersBonusPair?.[1]?.sid}_card`
                ]
                  ? data?.profitLoss?.[
                      `${data?.playersBonusPair?.[1]?.mid}_${data?.playersBonusPair?.[1]?.sid}_card`
                    ]
                  : 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="playerabcardbox">
        <div className="poker-icon">
          <img src="https://versionobj.ecoassetsservice.com/v21/static/admin/img/poker.png" />
        </div>{" "}
        {data?.videoInfo?.mid != "0" && (
          <div className="row row5 w-100">
            <div className="col-12 col-md-6">
              <div className="dealer-name playera">Player A</div>{" "}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <HandleCards card={data?.videoInfo?.C1} />
                <HandleCards card={data?.videoInfo?.C2} />
              </div>
            </div>{" "}
            <div className="col-12 col-md-6 text-end">
              <div className="dealer-name playerb">Player B</div>{" "}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                }}
              >
                <HandleCards card={data?.videoInfo?.C3} />
                <HandleCards card={data?.videoInfo?.C4} />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Player B */}
      <div className="playerbbox">
        <div className="casino-box-row playerbfabcy">
          <div className="casino-nation-name">
            <span
              onClick={() => toggleDiv(`demo6`)}
              className="range-icon d-inline-block ms-1"
            >
              <i className="fas fa-info-circle float-right"></i>
              <div
                id={`demo6`}
                className={`icon-range-dt1day collapse ${
                  openDivIds.includes(`demo6`) ? "show" : ""
                }`}
              >
                R:<span>{parseFloat(data?.videoInfo?.min)}</span>-
                <span>{formatNumber(data?.videoInfo?.max)}</span>
              </div>
            </span>
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
        <span
          className={`${
            data?.profitLoss?.[`${odds?.[0]?.mid}_${odds?.[0]?.sid}_card`]
              ? JSON.parse(
                  data?.profitLoss?.[`${odds?.[0]?.mid}_${odds?.[0]?.sid}_card`]
                )?.["playerb"] < 0
                ? "color-red"
                : "color-green"
              : "color-red"
          } f700 title-16`}
        >
          {data?.profitLoss?.[`${odds?.[0]?.mid}_${odds?.[0]?.sid}_card`]
            ? JSON.parse(
                data?.profitLoss?.[`${odds?.[0]?.mid}_${odds?.[0]?.sid}_card`]
              )?.["playerb"]
            : 0}
        </span>
        {/* Game Status and Book Info */}
        <div className="casino-nation-name text-center w-100">
          <span
            onClick={() => toggleDiv(`demo7`)}
            className="range-icon d-inline-block ms-1"
          >
            <i className="fas fa-info-circle float-right"></i>{" "}
            <div
              id={`demo7`}
              className={`icon-range-dt1day collapse ${
                openDivIds.includes(`demo7`) ? "show" : ""
              }`}
            >
              R:<span>{parseFloat(data?.videoInfo?.min)}</span>-
              <span>{formatNumber(data?.videoInfo?.max)}</span>
            </div>
          </span>
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
              <span
                className={`${
                  data?.profitLoss?.[
                    `${data?.playersBonusPair?.[2]?.mid}_${data?.playersBonusPair?.[2]?.sid}_card`
                  ]
                    ? data?.profitLoss?.[
                        `${data?.playersBonusPair?.[2]?.mid}_${data?.playersBonusPair?.[2]?.sid}_card`
                      ] < 0
                      ? "color-red"
                      : "color-green"
                    : "color-red"
                } f700 title-16`}
                style={{  position:
                  odds?.[1]?.gstatus === "SUSPENDED" ||
                  odds?.[1]?.gstatus === "CLOSED"
                    ? "absolute"
                    : "relative", bottom: "-20px", right: "60px" }}
              >
                {data?.profitLoss?.[
                  `${data?.playersBonusPair?.[2]?.mid}_${data?.playersBonusPair?.[2]?.sid}_card`
                ]
                  ? data?.profitLoss?.[
                      `${data?.playersBonusPair?.[2]?.mid}_${data?.playersBonusPair?.[2]?.sid}_card`
                    ]
                  : 0}
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
                {data?.playersBonusPair?.[3]?.nation
                  ?.replace("Player B", "")
                  .trim()}
              </span>
              <span
                className={`${
                  data?.profitLoss?.[
                    `${data?.playersBonusPair?.[2]?.mid}_${data?.playersBonusPair?.[2]?.sid}_card`
                  ]
                    ? data?.profitLoss?.[
                        `${data?.playersBonusPair?.[2]?.mid}_${data?.playersBonusPair?.[2]?.sid}_card`
                      ] < 0
                      ? "color-red"
                      : "color-green"
                    : "color-red"
                } f700 title-16`}
                style={{  position:
                  odds?.[1]?.gstatus === "SUSPENDED" ||
                  odds?.[1]?.gstatus === "CLOSED"
                    ? "absolute"
                    : "relative", bottom: "-20px", right: "60px" }}
              >
                {data?.profitLoss?.[
                  `${data?.playersBonusPair?.[3]?.mid}_${data?.playersBonusPair?.[3]?.sid}_card`
                ]
                  ? data?.profitLoss?.[
                      `${data?.playersBonusPair?.[3]?.mid}_${data?.playersBonusPair?.[3]?.sid}_card`
                    ]
                  : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
