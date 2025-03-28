import { formatNumber } from "../../../../../helpers";
import CommonCardImg from "../CommonCardImg";

const CardBox = ({ title, odds, data, cards, bgColor, border, color }: any) => {
  const arCards = cards?.ar?.split(",");
  const brCards = cards?.br?.split(",");
  return (
    <>
      <div
        className="abjcardContainer-abj"
        style={{ backgroundColor: bgColor, border: border }}
      >
        <div
          style={{
            width: "20%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "20px", color: color }} className="f600">
            {title}
          </span>
          <div className="text-end casino-minmax title-12">
            <span>R:</span>
            <span>{data?.videoInfo?.min}</span>-
            <span>{formatNumber(data?.videoInfo?.max)}</span>
          </div>
        </div>

        <div className="p-3">
          <CommonCardImg
            cardData={odds}
            cardInfo={title === "ANDAR" ? arCards : brCards}
            data={data}
          />
        </div>
      </div>
    </>
  );
};

export default CardBox;
