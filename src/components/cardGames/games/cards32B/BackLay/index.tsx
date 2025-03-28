import "../../cards32B/style.scss";

const BackLay = ({ matchOddsData, data }: any) => {
  const handleLock = (status: any, value: any) => {
    if (status != "ACTIVE" || value === "0.00") {
      return true;
    } else {
      return false;
    }
  };
  const renderItem = (item: any, index: number, type: any) =>
    type === "back" ? (
      <div
        key={index}
        className={`dtlsubTitle ${type}-BackGround ${
          handleLock(item?.gstatus, item?.b1) ? "suspended" : ""
        }`}
      >
        {item?.b1}
      </div>
    ) : (
      <div
        key={index}
        className={`dtlsubTitle ${type}-BackGround ${
          handleLock(item?.gstatus, item?.l1) ? "suspended" : ""
        }`}
      >
        {item?.l1}
      </div>
    );
  return (
    <div className="w-100">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          border: "0.3px solid #c7c8ca",
          marginLeft: "5px",
        }}
      >
        <div
          className={"w-100 d-sm-flex flex-row"}
          style={{ height: "25px", backgroundColor: "#dddddd" }}
        >
          <div
            className="dtlTitle"
            style={{ backgroundColor: "#dddddd", border: "0.5px solid #fff" }}
          ></div>
          <div className="card32bsubTitle">Back</div>
          <div className="card32bsubTitle">Lay</div>
        </div>
        <div className={"w-100 d-sm-flex"}>
          <span className="dtlTitle lh-1">
            <div className="profitLoss-Text">
              <span>Player 8</span>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      ? JSON.parse(
                          data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                        )["player8"] > 0
                        ? "color-green"
                        : JSON.parse(
                            data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                          )["player8"] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    ? JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )["player8"]
                    : 0
                  : 0}
              </span>
            </div>
          </span>

          {renderItem(matchOddsData?.[0], 0, "back")}
          {renderItem(matchOddsData?.[0], 1, "lay")}
        </div>
        <div className={"w-100 d-sm-flex flex-row"}>
          <span className="dtlTitle lh-1">
            <div className="profitLoss-Text">
              <span>Player 9</span>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      ? JSON.parse(
                          data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                        )["player9"] > 0
                        ? "color-green"
                        : JSON.parse(
                            data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                          )["player9"] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    ? JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )["player9"]
                    : 0
                  : 0}
              </span>
            </div>
          </span>
          {renderItem(matchOddsData?.[1], 2, "back")}
          {renderItem(matchOddsData?.[1], 3, "lay")}
        </div>
        <div className={"w-100 d-sm-flex flex-row"}>
          <span className="dtlTitle lh-1">
            <div className="profitLoss-Text">
              <span>Player 10</span>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      ? JSON.parse(
                          data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                        )["player10"] > 0
                        ? "color-green"
                        : JSON.parse(
                            data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                          )["player10"] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    ? JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )["player10"]
                    : 0
                  : 0}
              </span>
            </div>
          </span>
          {renderItem(matchOddsData?.[2], 2, "back")}
          {renderItem(matchOddsData?.[2], 3, "lay")}
        </div>
        <div className={"w-100 d-sm-flex flex-row"}>
          <span className="dtlTitle lh-1">
            <div className="profitLoss-Text">
              <span>Player 11</span>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      ? JSON.parse(
                          data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                        )["player11"] > 0
                        ? "color-green"
                        : JSON.parse(
                            data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                          )["player11"] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    ? JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )["player11"]
                    : 0
                  : 0}
              </span>
            </div>
          </span>
          {renderItem(matchOddsData?.[3], 2, "back")}
          {renderItem(matchOddsData?.[3], 3, "lay")}
        </div>
      </div>
    </div>
  );
};

export default BackLay;
