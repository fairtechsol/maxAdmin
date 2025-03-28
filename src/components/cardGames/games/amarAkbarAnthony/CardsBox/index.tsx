import { formatNumber } from "../../../../../helpers";
import CommonCardImg from "../CommonCardImg";
import "../style.scss";

const CardBox = ({ cardData, data }: any) => {
  const min = cardData?.[0]?.min;
  const max = cardData?.[0]?.max;
  return (
    <>
      <div className="cardContainerAAA">
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "16px", fontWeight: "bolder" }}>
            {parseFloat(
              isNaN(cardData?.[0]?.b1) ? 0 : cardData?.[0]?.b1
            ).toFixed(2)}
          </span>
        </div>
        <div>
          <CommonCardImg cardData={cardData} data={data} />
        </div>
        <div className="title-12" style={{ textAlign: "end" }}>
          <span>R:</span>
          <span>{min}</span>-<span>{formatNumber(max)}</span>
        </div>
      </div>
    </>
  );
};

export default CardBox;
