import "./style.scss";

const OddsRateBox = ({ status, rate, profitLoss }: any) => {
  return (
    <div className="casino-bl-box">
      <div
        className={`border-back casino-bl-box-item ${
          status === "0" ? "locked" : ""
        }`}
      >
        <span className="casino-box-odd">{rate}</span>
        <span className="casino-book book-red">{profitLoss ?? 0}</span>
      </div>
    </div>
  );
};

export default OddsRateBox;
