import CommonCardImg from "../CommonCardImg";

const CardBox = ({ name, cardData, data }: any) => {
  return (
    <>
      <div className="cardContainer">
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "1.5rem" }}>
            {name}{" "}
            {parseFloat(
              isNaN(cardData?.[0]?.rate) ? 0 : cardData?.[0]?.rate
            ).toFixed(2)}
          </span>
        </div>
        <div>
          <CommonCardImg cardData={cardData} data={data} />
        </div>
      </div>
    </>
  );
};

export default CardBox;
