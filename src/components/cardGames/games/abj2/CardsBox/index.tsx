import CommonCardImg from "../CommonCardImg";

const CardBox = ({ cards, data }: any) => {
  return (
    <>
      <div className="cardContainerAbj">
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "16px" }}>
            {parseFloat(isNaN(cards?.[0]?.b1) ? 0 : cards?.[0]?.b1)}
          </span>
        </div>
        <div>
          <CommonCardImg cardData={cards} data={data} />
        </div>
      </div>
    </>
  );
};

export default CardBox;
