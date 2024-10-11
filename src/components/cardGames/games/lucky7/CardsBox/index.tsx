
import CommonCardImg from "../CommonCardImg";
import { formatNumber } from "../../../../../helpers";

const CardBox = ({ cardData, data }: any) => {
  const min = cardData?.[0]?.min;
  const max = cardData?.[0]?.max;
  return (
    <>
      <div className="cardContainerLucky7">
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "16px", fontWeight: "bolder" }}>
            {parseFloat(
              isNaN(cardData?.[0]?.rate) ? 0 : cardData?.[0]?.rate
            )}
          </span>
        </div>
        <div>
          <CommonCardImg cardData={cardData} data={data} />
        </div>
        <div style={{ textAlign: "end" }}>
          <span className="title-13">R:{parseFloat(min)}-{formatNumber(max)}</span>          
        </div>
      </div>
    </>
  );
};

export default CardBox;
