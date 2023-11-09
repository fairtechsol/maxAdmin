import "./style.scss";

interface props {
  bgColor?: string;
  rate: number;
  percent: number;
  customClass?: string;
}
function BackLayBox({ customClass, bgColor, rate, percent }: props) {
  return (
    <div
      className={`backLay p-2 text-center d-flex  ${customClass} bg-${bgColor}`}
    >
      <h5 className="backLay-rate f600 title-16 m-0">{rate}</h5>
      <span className="backLay-percent title-10">{percent}</span>
    </div>
  );
}

export default BackLayBox;
