import { useEffect, useState } from "react";
import { dragonTigerCards } from "../../../../../utils/Constants";

const CommonCardImg = ({ cardData, data }: any) => {
  const [cardImg, setCardImg] = useState(dragonTigerCards);
  useEffect(() => {
    const mergedArray = cardData?.map((item: any, index: any) => {
      return {
        ...item,
        ...dragonTigerCards[index],
      };
    });
    setCardImg(mergedArray);
  }, [cardData]);

  return (
    <div className="commonCardImgContainer">
      {cardImg?.map((item: any) => (
        <div
          style={{
            marginRight: "5px",
            marginLeft: "5px",
            width: "auto",
            marginBottom: "10px",
            minWidth: "80px",
          }}
          key={item?.code}
        >
          <div
            className={item?.gstatus === "0" ? "suspended" : ""}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <img src={item?.imgSrc} width={"45px"} />
          </div>
          <span
            style={{
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
            }}
            className={`${
              data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${item?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                        `${data?.videoInfo?.mid}_${item?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : "color-red"
                  : "color-red"
                : "color-red"
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
                ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
                : 0
              : 0}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CommonCardImg;
