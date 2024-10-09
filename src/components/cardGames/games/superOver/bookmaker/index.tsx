const Bookmaker = ({ matchOddsData, data, title, min, max }: any) => {
  const handleLock = (status: any, value: any) => {
    if (status != "ACTIVE" || value === "0.00") {
      return true;
    } else {
      return false;
    }
  };
  const team1 = matchOddsData?.[0];
  const team2 = matchOddsData?.[1];
  return (
    <div className="w-100" style={{ display: "flex", flexDirection: "column" }}>
      <div className="marketHeader">
        <span className="f600" style={{ color: "#fff" }}>
          {title}
        </span>
      </div>
      <div className="boxContainer">
        <span className="f600" style={{ fontSize: "12px", color: "#097c93" }}>
          Min: {min} Max: {max}
        </span>
        <div className="blboxes">
          <div
            className="w-50 back-cell-A flex-justify-center"
            style={{ height: "20px" }}
          >
            <span
              className="f600"
              style={{ fontSize: "14px", color: "#000", textAlign: "center" }}
            >
              Back
            </span>
          </div>
          <div
            className="w-50 lay-cell-A flex-justify-center"
            style={{ height: "20px" }}
          >
            <span
              className="f600"
              style={{ fontSize: "14px", color: "#000", textAlign: "center" }}
            >
              Lay
            </span>
          </div>
        </div>
      </div>

      <div className={`boxContainer`}>
        <span className="f400" style={{ fontSize: "14px", color: "#000" }}>
          {team1?.nat}
          <div>
            <span
              className={`color-red${
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${team1?.sid}_card`
                    ]
                    ? JSON.parse(
                        data?.profitLoss[
                          `${data?.videoInfo?.mid}_${team1?.sid}_card`
                        ]
                      )["eng"] > 0
                      ? "color-green"
                      : JSON.parse(
                          data?.profitLoss[
                            `${data?.videoInfo?.mid}_${team1?.sid}_card`
                          ]
                        )["eng"] < 0
                      ? "color-red"
                      : ""
                    : ""
                  : ""
              }`}
            >
              {data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_${team1?.sid}_card`]
                  ? JSON.parse(
                      data?.profitLoss[
                        `${data?.videoInfo?.mid}_${team1?.sid}_card`
                      ]
                    )["eng"]
                  : 0
                : 0}
            </span>
          </div>
        </span>
        <div
          className={`blboxes  ${
            handleLock(team1?.status, team1?.b1) ? "suspended-row" : ""
          }`}
          data-title={handleLock(team1?.status, team1?.b1) ? "SUSPENDED" : ""}
        >
          <div
            className={`w-50 back-cell-A flex-justify-center cursor-pointer`}
            style={{ height: "42px", flexDirection: "column" }}
          >
            <span className="f600 rateText lh-1">
              {team1?.b1 === "0.00" ? "-" : team1?.b1}
            </span>{" "}
            <span style={{ fontSize: "11px", fontWeight: "300" }}>
              {team1?.bs1}
            </span>
          </div>
          <div
            className={`w-50 lay-cell-A flex-justify-center cursor-pointer`}
            style={{ height: "42px", flexDirection: "column" }}
          >
            <span className="f600 rateText lh-1">
              {team1?.l1 === "0.00" ? "-" : team1?.l1}
            </span>{" "}
            <span style={{ fontSize: "11px", fontWeight: "300" }}>
              {team1?.ls1}
            </span>
          </div>
        </div>
      </div>

      <div className={`boxContainer `}>
        <span className="f400" style={{ fontSize: "14px", color: "#000" }}>
          {team2?.nat}
          <div>
            <span
              className={`color-red${
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${team1?.sid}_card`
                    ]
                    ? JSON.parse(
                        data?.profitLoss[
                          `${data?.videoInfo?.mid}_${team1?.sid}_card`
                        ]
                      )["rsa"] > 0
                      ? "color-green"
                      : JSON.parse(
                          data?.profitLoss[
                            `${data?.videoInfo?.mid}_${team1?.sid}_card`
                          ]
                        )["rsa"] < 0
                      ? "color-red"
                      : ""
                    : ""
                  : ""
              }`}
            >
              {data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_${team1?.sid}_card`]
                  ? JSON.parse(
                      data?.profitLoss[
                        `${data?.videoInfo?.mid}_${team1?.sid}_card`
                      ]
                    )["rsa"]
                  : 0
                : 0}
            </span>
          </div>
        </span>
        <div
          className={`blboxes ${
            handleLock(team2?.status, team2?.b1) ? "suspended-row" : ""
          }`}
          data-title={handleLock(team2?.status, team2?.b1) ? "SUSPENDED" : ""}
        >
          <div
            className={`w-50 back-cell-A flex-justify-center cursor-pointer`}
            style={{ height: "42px", flexDirection: "column" }}
          >
            <span className="f600 rateText">
              {team2?.b1 === "0.00" ? "-" : team2?.b1}
            </span>{" "}
            <span style={{ fontSize: "11px", fontWeight: "300" }}>
              {team2?.bs1}
            </span>
          </div>
          <div
            className={`w-50 lay-cell-A flex-justify-center cursor-pointer`}
            style={{ height: "42px", flexDirection: "column" }}
          >
            <span className="f600 rateText">
              {team2?.l1 === "0.00" ? "-" : team2?.l1}
            </span>{" "}
            <span style={{ fontSize: "11px", fontWeight: "300" }}>
              {team2?.ls1}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmaker;
