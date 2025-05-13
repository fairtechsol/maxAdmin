import { useEffect, useState } from "react";
import { back } from "../../../../../assets";
import { dragonTigerCards } from "../../../../../utils/Constants";
const CommonCardImg = ({ cardData, data, cardInfo }: any) => {
  const [cardImg, setCardImg] = useState(dragonTigerCards);

  const [clickedItems, setClickedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const mergedArray = cardData?.map((item: any, index: any) => {
      return {
        ...item,
        ...dragonTigerCards[index],
        show: cardInfo?.[index] !== "0",
      };
    });
    setCardImg(mergedArray);
  }, [cardData]);

  const handlock = (item: any) => {
    if (item?.gstatus === "0") {
      return "suspended";
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (data?.no?.gstatus === "0") {
      setClickedItems({});
    }
  }, [data?.no?.gstatus]);

  return (
    <div className="commonCardImgContainer">
      {cardImg?.map((item: any, index: number) => {
        return (
          <div key={index} style={{ marginLeft: "5px" }}>
            <div
              key={item?.code}
              className={handlock(item)}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                border: clickedItems[item.code] ? "solid #086f3f 2px" : "none",
              }}
            >
              {item?.show ? (
                <img src={item?.imgSrc} width={"50px"} />
              ) : (
                <img src={back} width={"30px"} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommonCardImg;
