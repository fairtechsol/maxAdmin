const PairBox = ({ odds, data }: any) => {
  return (
    <>
      <div className="poker-table-row">
        <div style={{ width: "50%", border: "0.1px solid #fff" }}></div>

        <div
          style={{
            width: "50%",
            backgroundColor: "#a7d8fd",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="poker-table-item f12-b" style={{ width: "50%" }}>
            BACK
          </div>
          <div className="poker-table-item f12-b" style={{ width: "50%" }}>
            BACK
          </div>
        </div>
      </div>
      <div className="poker-table-row" style={{ lineHeight: 1 }}>
        <div
          style={{
            width: "50%",
            padding: "16px",
            border: "0.1px solid #fff",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
            Player A
          </span>
        </div>
        <div
          className={
            odds?.[0]?.gstatus === "SUSPENDED" ||
            odds?.[0]?.gstatus === "CLOSED" ||
            odds?.[0]?.b1 === "0.00"
              ? "suspended"
              : ""
          }
          style={{
            width: "50%",
            backgroundColor: "#a7d8fd",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="poker-table-item" style={{ width: "50%" }}>
            <span className="f12-b">{odds?.[0]?.nation}</span>
            <span
              className={`f10-b f400 ${
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                      ] > 0
                      ? "color-green"
                      : data?.profitLoss[
                          `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                        ] < 0
                      ? "color-red"
                      : ""
                    : ""
                  : ""
              }`}
            >
              {data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                    ]
                  : 0
                : 0}
            </span>
          </div>
          <div className={`poker-table-item`} style={{ width: "50%" }}>
            <span className="f12-b">{odds?.[1]?.nation}</span>
            <span
              className={`f10-b f400 ${
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                      ] > 0
                      ? "color-green"
                      : data?.profitLoss[
                          `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                        ] < 0
                      ? "color-red"
                      : ""
                    : ""
                  : ""
              }`}
            >
              {data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                    ]
                  : 0
                : 0}
            </span>
          </div>
        </div>
      </div>
      <div className="poker-table-row" style={{ lineHeight: 1 }}>
        <div
          style={{
            width: "50%",
            padding: "18px",
            border: "0.1px solid #fff",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
            Player B
          </span>
        </div>
        <div
          className={
            odds?.[2]?.gstatus === "SUSPENDED" ||
            odds?.[2]?.gstatus === "CLOSED" ||
            odds?.[2]?.b1 === "0.00"
              ? "suspended"
              : ""
          }
          style={{
            width: "50%",
            backgroundColor: "#a7d8fd",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="poker-table-item" style={{ width: "50%" }}>
            <span className="f12-b">{odds?.[2]?.nation}</span>
            <span
              className={`f10-b f400 ${
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                      ] > 0
                      ? "color-green"
                      : data?.profitLoss[
                          `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                        ] < 0
                      ? "color-red"
                      : ""
                    : ""
                  : ""
              }`}
            >
              {data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                    ]
                  : 0
                : 0}
            </span>
          </div>
          <div className={`poker-table-item `} style={{ width: "50%" }}>
            <span className="f12-b">{odds?.[3]?.nation}</span>
            <span
              className={`f10-b f400 ${
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                      ] > 0
                      ? "color-green"
                      : data?.profitLoss[
                          `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                        ] < 0
                      ? "color-red"
                      : ""
                    : ""
                  : ""
              }`}
            >
              {data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                    ]
                  : 0
                : 0}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PairBox;
