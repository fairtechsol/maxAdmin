import CommonButtonBox from "../CommonButtonBox";


const SBetBox = ({ type, odds, data }: any) => {
  return (
    <div className="sBoxContainer">
      <div className="sBoxMainlucky">
        <div style={{ width: "5%", paddingBottom: "20px", textAlign: "end" }}>
          <span
            style={{
              textAlign: "center",
              fontSize: "16px",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            {type}
          </span>
        </div>
        <div
          className="column-flex justify-space-a align-center"
          style={{ width: "20%" }}
        >
          <CommonButtonBox
            name={odds?.[0]?.nat}
            value1={odds?.[0]?.b1}
            background={"transparent"}
            width={"20%"}
            text={"#000"}
            lock={odds?.[0]?.gstatus === "0" ? true : false}
            data={odds?.[0]}
          />
          <span
            style={{ fontSize: "14px" }}
            className={`${
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
        <div
          className="column-flex justify-space-a align-center"
          style={{ width: "25%" }}
        >
          <CommonButtonBox
            name={odds?.[1]?.nat}
            value1={odds?.[1]?.b1}
            background={"#086cb8"}
            width={"25%"}
            text={"#fff"}
            lock={odds?.[1]?.gstatus === "0" ? true : false}
            data={odds?.[1]}
          />
          <span
            style={{ fontSize: "14px" }}
            className={`${
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
            }}`}
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

        <div
          className="column-flex justify-space-a align-center"
          style={{ width: "25%" }}
        >
          <CommonButtonBox
            name={odds?.[2]?.nat}
            value1={odds?.[2]?.b1}
            background={"#086cb8"}
            width={"25%"}
            text={"#fff"}
            lock={odds?.[2]?.gstatus === "0" ? true : false}
            data={odds?.[2]}
          />
          <span
            style={{ fontSize: "14px" }}
            className={`${
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
            }}`}
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
        <div style={{ width: "5%", paddingBottom: "20px" }}>
          <span
            style={{
              textAlign: "center",
              fontSize: "16px",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            {type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SBetBox;
