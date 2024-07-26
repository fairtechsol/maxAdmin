import CommonButtonBox from "../CommonButtonBox";

const TiePairBox = ({ handsData, data, width, title, cards }: any) => {
  const handleCard = (data: any, index: number, type: string) => {
    let card;
    if (type === "first") {
      card = `C${index + 1}`;
      return data[card];
    } else {
      card = `C${index + 7}`;
      return data[card];
    }
  };
  return (
    <div className="tiePairContainer">
      <div className="tiePairRateBoxMainP">
        {handsData?.map((hand: any, index: any) => (
          <CommonButtonBox
            key={index}
            value1={hand?.rate}
            value2={hand?.nat} // Assuming hand has a name property
            value3={
              data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_${hand?.sid}_card`]
                : 0
            }
            width={width}
            lock={hand?.gstatus === "0"}
            data={hand}
            title={title}
            card1={title === "hand" ? handleCard(cards, index, "first") : null}
            card2={title === "hand" ? handleCard(cards, index, "second") : null}
            min={hand?.min}
            max={hand?.max}
          />
        ))}
      </div>
    </div>
  );
};

export default TiePairBox;
