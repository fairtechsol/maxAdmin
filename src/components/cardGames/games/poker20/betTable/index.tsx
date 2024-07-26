import "./style.scss";
const DynamicTable = ({ odds, data, playerNum }: any) => {
  const array = odds?.slice(playerNum[0], playerNum[1]);

  const groupedData = (array || [])?.reduce((acc: any, item: any) => {
    const { nat, sid, rate, gstatus } = item;
    if (!acc[nat]) {
      acc[nat] = { nat, entries: [] };
    }
    const suffix = String.fromCharCode(65 + acc[nat].entries.length);
    acc[nat].entries?.push({ nat: `${nat} ${suffix}`, sid, rate, gstatus });
    return acc;
  }, {});

  const result = Object.values(groupedData);

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
          <div className="card32-table-item back" style={{ width: "50%" }}>
            PLAYER A
          </div>
          <div className="card32-table-item back" style={{ width: "50%" }}>
            PLAYER B
          </div>
        </div>
      </div>
      {result &&
        result?.map((item: any, index: number) => {
          return (
            <div
              className="card32-table-row"
              style={{ lineHeight: 1 }}
              key={index + playerNum[0]}
            >
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
                  {item?.nat}
                </span>
              </div>
              <div
                className={
                  item?.entries?.[0]?.gstatus === "0" ? "suspended" : ""
                }
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                  cursor: "pointer",
                  height: "40px",
                }}
              >
                <div
                  className="card32-table-item back"
                  style={{ width: "50%" }}
                >
                  <span className="f12-b">{item?.entries?.[0]?.rate}</span>
                  <span
                    className={`f400 title-14 ${
                      data?.profitLoss
                        ? data?.profitLoss[
                            `${data?.videoInfo?.mid}_${item?.entries?.[0]?.sid}_card`
                          ]
                          ? data?.profitLoss[
                              `${data?.videoInfo?.mid}_${item?.entries?.[0]?.sid}_card`
                            ] > 0
                            ? "color-green"
                            : data?.profitLoss[
                                `${data?.videoInfo?.mid}_${item?.entries?.[0]?.sid}_card`
                              ] < 0
                            ? "color-red"
                            : ""
                          : ""
                        : ""
                    }`}
                  >
                    {data?.profitLoss
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${item?.entries?.[0]?.sid}_card`
                        ]
                        ? data?.profitLoss[
                            `${data?.videoInfo?.mid}_${item?.entries?.[0]?.sid}_card`
                          ]
                        : 0
                      : 0}
                  </span>
                </div>
                <div
                  className="card32-table-item back"
                  style={{ width: "50%" }}
                >
                  <span className="f12-b">{item?.entries?.[1]?.rate}</span>
                  <span
                    className={`f400 title-14 ${
                      data?.profitLoss
                        ? data?.profitLoss[
                            `${data?.videoInfo?.mid}_${item?.entries?.[1]?.sid}_card`
                          ]
                          ? data?.profitLoss[
                              `${data?.videoInfo?.mid}_${item?.entries?.[1]?.sid}_card`
                            ] > 0
                            ? "color-green"
                            : data?.profitLoss[
                                `${data?.videoInfo?.mid}_${item?.entries?.[1]?.sid}_card`
                              ] < 0
                            ? "color-red"
                            : ""
                          : ""
                        : ""
                    }`}
                  >
                    {data?.profitLoss
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${item?.entries?.[1]?.sid}_card`
                        ]
                        ? data?.profitLoss[
                            `${data?.videoInfo?.mid}_${item?.entries?.[1]?.sid}_card`
                          ]
                        : 0
                      : 0}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DynamicTable;
