const TableItemList = ({ rate, profitLossKey, dragonTigerDetail }: any) => {
  return (
    <div
      className={`teenPatti-table-item`}
      style={{
        width: "33.3%",
        backgroundColor: "#72bbef",
      }}
    >
      <span className="f12-b">{rate}</span>
      <span
        className={
          dragonTigerDetail?.profitLoss
            ? dragonTigerDetail?.profitLoss[
                `${dragonTigerDetail?.videoInfo?.mid}_${profitLossKey}_card`
              ]
              ? dragonTigerDetail?.profitLoss[
                  `${dragonTigerDetail?.videoInfo?.mid}_${profitLossKey}_card`
                ] > 0
                ? "color-green"
                : dragonTigerDetail?.profitLoss[
                    `${dragonTigerDetail?.videoInfo?.mid}_${profitLossKey}_card`
                  ] < 0
                ? "color-red"
                : ""
              : ""
            : ""
        }
        style={{zIndex:"999",fontSize:"12px"}}
      >
        {dragonTigerDetail?.profitLoss
          ? dragonTigerDetail?.profitLoss[
              `${dragonTigerDetail?.videoInfo?.mid}_${profitLossKey}_card`
            ]
            ? dragonTigerDetail?.profitLoss[
                `${dragonTigerDetail?.videoInfo?.mid}_${profitLossKey}_card`
              ]
            : ''
          : ''}
      </span>
    </div>
  );
};

export default TableItemList;
