import "./style.scss";

const ProfitLossEventType = (props: any) => {
  const { totalProLoss } = props;

  let dataArray = [];

  for (let key in totalProLoss) {
    let obj: any = {};
    obj.name = key;
    obj.amount = totalProLoss[key];
    dataArray.push(obj);
  }

  return (
    <div className={`profitLossEventType ${props.customClass}`}>
      <h5 className="f400">Profit & Loss for Event type</h5>
      <div className="d-flex" style={{ gap: "12px", flexWrap: "wrap" }}>
        {dataArray?.map((item: any, index: number) => (
          <div
            key={index}
            className={`profitLossEventType-box d-flex ${
              +item?.amount
                ? +item?.amount >= 0
                  ? "bg-green"
                  : "bg-pdf"
                : "bg-green"
            } px-1`}
          >
            <label className="text-white title-12">{item?.name}:</label>
            <span className="text-white title-12"> {item?.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfitLossEventType;
