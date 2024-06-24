import "./style.scss";
const DynamicTable = ({ odds, data, playerNum }: any) => {
  let player1Key = `player${playerNum[0]}`;
  let player2Key = `player${playerNum[1]}`;

  return (
    <div className="card32-table-container">
      <div className="card32-table-row" style={{ lineHeight: 2 }}>
        <div style={{ width: "50%" }}></div>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="card32-table-item back-cell" style={{ width: "50%" }}>
            BACK
          </div>
          <div className="card32-table-item lay-cell" style={{ width: "50%" }}>
            LAY
          </div>
        </div>
      </div>
      <div className="card32-table-row" style={{ lineHeight: 1 }}>
        <div
          style={{
            width: "50%",
            padding: "8px",
            border: "0.1px solid #fff",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
            {odds?.[0]?.nat}
          </span>
          <span
            className={`${
              data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                  ? JSON.parse(
                      data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    )[player1Key] > 0
                    ? "color-green"
                    : JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )[player1Key] < 0
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
                  )[player1Key]
                : 0
              : 0}
          </span>
        </div>
        <div
          className={
            odds?.[0]?.gstatus === "SUSPENDED" ||
            odds?.[0]?.gstatus === "CLOSED"
              ? "suspended"
              : ""
          }
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
        >
          <div className="card32-table-item back-cell" style={{ width: "50%" }}>
            <span className="f12-b">{odds?.[0]?.b1}</span>
            <span className="f10-b">{odds?.[0]?.bs1}</span>
          </div>
          <div className="card32-table-item lay-cell" style={{ width: "50%" }}>
            <span className="f12-b">{odds?.[0]?.l1}</span>
            <span className="f10-b">{odds?.[0]?.ls1}</span>
          </div>
        </div>
      </div>
      <div className="card32-table-row" style={{ lineHeight: 1 }}>
        <div
          style={{
            width: "50%",
            padding: "10px",
            border: "0.1px solid #fff",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
            {odds?.[1]?.nat}
          </span>
          <span
            className={`${
              data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                  ? JSON.parse(
                      data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    )[player2Key] > 0
                    ? "color-green"
                    : JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )[player2Key] < 0
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
                  )[player2Key]
                : 0
              : 0}
          </span>
        </div>
        <div
          className={
            odds?.[1]?.gstatus === "SUSPENDED" ||
            odds?.[1]?.gstatus === "CLOSED"
              ? "suspended"
              : ""
          }
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
        >
          <div className="card32-table-item back-cell" style={{ width: "50%" }}>
            <span className="f12-b">{odds?.[1]?.b1}</span>
            <span className="f10-b">{odds?.[1]?.bs1}</span>
          </div>
          <div className="card32-table-item lay-cell" style={{ width: "50%" }}>
            <span className="f12-b">{odds?.[1]?.l1}</span>
            <span className="f10-b">{odds?.[1]?.ls1}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
