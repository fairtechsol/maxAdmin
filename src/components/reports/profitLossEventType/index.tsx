import "./style.scss";

const ProfitLossEventType = () => {
  return (
    <div className="profitLossEventType">
      <h5 className="f400">Profit & Loss for Event type</h5>
      <div className="d-flex" style={{ gap: "12px" }}>
        <div className="profitLossEventType-box d-flex bg-green px-1">
          <label className="text-white title-12">Cricket</label>
          <span className="text-white title-12">0.00</span>
        </div>
        <div className="profitLossEventType-box d-flex bg-green px-1">
          <label className="text-white title-12">Cricket</label>
          <span className="text-white title-12">0.00</span>
        </div>
        <div className="profitLossEventType-box d-flex bg-green px-1">
          <label className="text-white title-12">Teen</label>
          <span className="text-white title-12">0.00</span>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossEventType;
