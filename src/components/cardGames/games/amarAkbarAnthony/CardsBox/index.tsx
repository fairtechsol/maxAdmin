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
        <div style={{ textAlign: "end" }}>
          <span style={{ fontWeight: "bolder" }}>Min:</span>
          <span>{min}</span>
          <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
          <span>{max}</span>
        </div>
      </div>
    </>
  );
};

export default CardBox;
