import { formatNumber } from "../../../../../helpers";
import CommonCardImg from "../CommonCardImg";

const CardBox = ({ cards, data }: any) => {
  return (
    <>
      <div className="cardContainerAbj-ab2">
        <div style={{ textAlign: "center" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "not-allowed",
            }}
          >
            {parseFloat(isNaN(cards?.[0]?.b1) ? 0 : cards?.[0]?.b1)}
          </span>
        </div>
      </div>
      <div>
        <CommonCardImg cardData={cards} data={data} />
      </div>
      <div
        style={{
          fontSize: "12px",
          textAlign: "right",
        }}
      >
        R:<span>{formatNumber(data?.videoInfo?.min)}</span>-
        <span>{formatNumber(data?.videoInfo?.max)}</span>
      </div>
    </>
  );
};

export default CardBox;
