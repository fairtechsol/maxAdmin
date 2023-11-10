import "./style.scss";

interface props {
  bgColor?: string;
  title: string;
  customClass?: string;
  onClick?: any;
}
function BackLayTitle({ customClass, bgColor, title, onClick }: props) {
  return (
    <div
      className={`backLayTitleBox  text-center d-flex  ${
        customClass ? customClass : ""
      } bg-${bgColor}`}
    >
      <h5 className="backLay-rate f600 title-16 m-0">{title}</h5>
    </div>
  );
}

export default BackLayTitle;
