import CommonCardImg from "../CommonCardImg";

const CardBox = ({ title, odds, data, cards, bgColor }: any) => {
  const arCards = cards?.ar?.split(",");
  const brCards = cards?.br?.split(",");
  return (
    <>
      <div
        className="abjcardContainer"
        style={{ backgroundColor: bgColor, border: "0.5px solid #000" }}
      >
        <div
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #000",
          }}
        >
          <span style={{ fontSize: "16px" }}>{title}</span>
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
