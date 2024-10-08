import CommonCardImg from "../CommonCardImg";

const CardBox = ({ cards, data }: any) => {
  return (
    <>
      <div className="cardContainerAbj-ab2">
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "14px", fontWeight: "bold", cursor: "not-allowed" }}>
            {parseFloat(isNaN(cards?.[0]?.b1) ? 0 : cards?.[0]?.b1)}
          </span>
        </div>
      </div>
      <div>
        <CommonCardImg cardData={cards} data={data} />
      </div>
    </>
  );
};

export default CardBox;
