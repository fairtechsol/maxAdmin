
import CommonCardImg from "../CommonCardImg";
import { formatNumber } from "../../../../../helpers";

const CardBox = ({ cardData, data }: any) => {
  const min = cardData?.[0]?.min;
  const max = cardData?.[0]?.max;
  return (
    <>
      <div className="cardContainerMob">
        <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <div style={{ width: "55%", textAlign: "end" }}>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bolder",
                alignSelf: "center",
              }}
            >
              {parseFloat(
                isNaN(cardData?.[0]?.b1) ? 0 : cardData?.[0]?.b1
              ).toFixed(2)}
            </span>
          </div>
          
        </div>
        <div>
          <CommonCardImg cardData={cardData} data={data} />
        </div>
        <div className="title-12" style={{ textAlign: "end" }}>
          <span>R:</span>
          <span>{min}</span>-
          <span>{formatNumber(max)}</span>
        </div>
      </div>
    </>
  );
};

export default CardBox;
