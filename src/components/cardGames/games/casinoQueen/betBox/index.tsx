import "../style.scss";

const BetBox = ({ cards, data }: any) => {
  return (
    <div className="casino-table-q">
      <div className="casino-table-box-q-desktop">
        {cards?.map((item: any, index: any) => (
          <div className="casino-odd-box-container-q" key={index}>
            <div className="casino-nation-name-q">{item?.nation}</div>
            <div
              className={`casino-odds-wrapper ms-2 ${
                item?.gstatus === "SUSPENDED" ? "suspended" : ""
              }`}
            >
              <div className="casino-odds-box-q back-BackGround">
                <span className="casino-odds-q">{item?.b1}</span>
              </div>
              <div className="casino-odds-box-q lay-BackGround">
                <span className="casino-odds-q">{item?.l1}</span>
              </div>
            </div>
            <span
              className={`color-red ps-4 ms-5 text-end ${
                data?.profitLoss
                  ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    ? JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )[`total${index}`] > 0
                      ? "color-green"
                      : JSON.parse(
                          data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                        )[`total${index}`] < 0
                      ? "color-red"
                      : ""
                    : ""
                  : ""
              }`}
              style={{ zIndex: "100" }}
            >
              {data?.profitLoss?.[`${data?.videoInfo?.mid}_1_card`]
                ? JSON.parse(
                    data?.profitLoss?.[`${data?.videoInfo?.mid}_1_card`]
                  )[`total${index}`]
                : "0"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetBox;
